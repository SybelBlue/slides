<!-- .slide: class="rs-center plsi-deck-marker" -->

### `pl-symbolic-input` parsing architecture

<p class="rs-lede rs-mx-auto">
  Performance, error locations, and architectural options
</p>

<p class="rs-citation">
  PrairieLearn development design review · source state on November 4, 2026
</p>

Note:
This review compares three architectural responses to the current symbolic-input problems. It does not assume that any option has won. The main question is which complexity PrairieLearn wants to own and what evidence the team needs before merging deeper changes.

Primary source: https://github.com/PrairieLearn/PrairieLearn/issues/15970

+++

### Why millis matter here

- `parse()` is called repeatedly
- Setup repeats even when inputs don't change.
- One candidate clears a process-wide SymPy cache and slows later unrelated work.

<p class="rs-takeaway">
  The useful target is avoidable repeated work, not a production-scale
  extrapolation.
</p>

Note:
Address the premature-optimization question directly. A single millisecond rarely matters by itself. Repeated parsing, avoidable setup, and cache effects make the work worth measuring. Keep three motivations separate: predictable per-parse latency, repeated work inside measured workloads, and cross-request effects in a shared worker. The sources do not measure aggregate production savings or concurrency.

Source: https://github.com/PrairieLearn/PrairieLearn/issues/15970

---

### Three problems define the comparison

<div class="rs-grid cols-3">
  <div>
    <h4>Performance</h4>
    <p>Known gains, measured regressions, repeated work, and cache effects</p>
  </div>
  <div>
    <h4>Error localization</h4>
    <p>Carets and messages must refer to the text the student typed</p>
  </div>
  <div>
    <h4>Maintainability</h4>
    <p>Normalization and error handling need a tractable ownership model</p>
  </div>
</div>

<p class="rs-takeaway">Every option must answer all three problems.</p>

Note:
Use these criteria throughout the talk. Performance includes both direct parser time and effects on other work. Error localization includes messages and raw-source carets, not merely accept or reject behavior. Maintainability asks where future compatibility rules live and how many parsing paths the team supports.

+++

### Most parse time sits outside regex

![Stage costs for a 50-character typed expression](decks/pl-symbolic-input/parse-stage-costs.png)
<!-- .element: class="r-stretch" -->

<p class="rs-takeaway">
  <code>parse()</code> measured about 1.06 ms. Regex used under 1%. JSON
  re-parse and validation used about 38%.
</p>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970"
    >Issue #15970, performance profile</a
  >
  ·
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15972"
    >PR #15972</a
  >
</p>

Note:
The image shows the stage breakdown for one 50-character typed expression, including element preparation around the two parser passes. The issue summary reports about 1.06 ms for parse(). Importing SymPy globals once and replacing deep copies with shallow copies improved the measured parse time from 1.06 to 0.77 ms. PR #15972 merged on October 8. The remaining JSON re-parse protects against a serializer result that the parser cannot read, so removing it trades safety for speed.

Do not describe JSON validation as a free optimization. The issue estimates about 0.4 ms for the round trip and proposes either retaining it or replacing it with a property test.

+++

### Rewrites disconnect errors from raw input

![Five text versions used by the legacy parse and error paths](decks/pl-symbolic-input/error-location-text-versions.png)
<!-- .element: class="r-stretch" -->

<div class="rs-grid cols-2 rs-small">
  <p>
    <code>2 + sin</code><br />Generated-Python offset extends past the raw text
  </p>
  <p>
    <code>x ++* 2</code><br />One-based Python offset places the caret on
    <code>2</code>
  </p>
  <p>
    <code>x + α</code><br />No caret, and the message reports <code>alpha</code>
  </p>
  <p>
    <code>||x|</code><br />The caret context shows generated
    <code>abs</code> text
  </p>
</div>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970"
    >Issue #15970, error locations</a
  >
</p>

Note:
T0 is the raw student submission. Carets currently render on T1. Only T2 maps back to T1, while errors can carry positions from T2 or the generated Python in T3. No end-to-end map returns those locations to T0. The issue confirms that every listed problem also occurs on master.

For the final example, the Markdown source writes two vertical bars on the left and one on the right. The legacy absolute-value rewrite can expose generated abs text in the error context.

Full location analysis: https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6047774571

+++

### Distributed normalization and error handling

- Eight procedural rewrite passes transform the submission.
- No position map survives the full transformation sequence.
- Location handling spans 5 functions, 4 helpers, and 9 rendering branches.
- Compatibility rules affect several distant paths.

<p class="rs-takeaway">
  The maintenance cost comes from scattered responsibility, not only the parser
  engine.
</p>

<p class="rs-citation">
  <a
    href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6047774571"
    >Issue #15970, proposal details and full error table</a
  >
</p>

Note:
The audience already knows much of the legacy code, so focus on the consequence. A developer changing one rewrite or one accepted construct must reason about ordering, transformed positions, exception types, and multiple rendering branches. Some dead or unreachable error logic also remains because different layers attempt to interpret the same failure.

---

<!-- .slide: class="rs-center" -->

### Three architectural responses

<p class="rs-lede rs-mx-auto">
  Incremental refactor<br />Hybrid MathJSON<br />Lark LALR interpreter
</p>

Note:
The next vertical stack covers the three responses. Navigate down for the options and their evidence. The alternatives do not form a perfectly exclusive set. MathJSON still needs the legacy path, and source-mapping ideas from the incremental work may remain useful under a grammar replacement.

+++

### Option 1: incremental changes

- Map every rewrite back to raw input with `SourceText` and `SourceToken`.
- Use one error locator and one renderer.
- Retain the merged parser-setup improvement.

<p class="rs-takeaway">
  Source mapping improves carets and ownership boundaries without replacing the
  parser.
</p>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15972"
    >#15972 merged</a
  >
  ·
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15973"
    >#15973 draft</a
  >
  ·
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15974"
    >#15974 draft</a
  >
</p>

Note:
PR #15972 contains the merged parser-setup improvement. Draft PR #15973 consolidates normalization with source mapping. Draft PR #15974 localizes errors to raw submissions. Together, the drafts preserve raw offsets through transformation and centralize error-location behavior.

Current status on November 4, 2026: #15973 and #15974 remain open drafts.

+++

### Option 1: retained decisions

- The legacy parser and SymPy machinery remain.
- Procedural recognition and compatibility rules remain.
- JSON validation stays an explicit safety-versus-speed decision.

<p class="rs-takeaway">
  The option reduces scattered logic but continues to own the legacy engine.
</p>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970"
    >Issue #15970, proposals and tradeoffs</a
  >
</p>

Note:
The incremental path does not remove the parser engine or generated-Python machinery. It also does not settle the JSON round-trip decision. The round trip guards against a serializer output that the parser cannot read, and the issue treats its removal as a safety-versus-speed choice.

+++

### Option 2: hybrid MathJSON path

1. The formula editor asks Compute Engine for structured MathJSON.
2. The server converts supported MathJSON nodes into SymPy values.
3. Plain text, older submissions, and fallback cases keep the legacy parser.

<p class="rs-takeaway">
  MathJSON can extend the incremental path. It does not replace the existing
  parser.
</p>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/14839"
    >PR #14839, open</a
  >
</p>

Note:
Present the hybrid as an architectural extension of option 1. The formula editor supplies structure, but the server still needs the legacy path for typed input, submissions saved before an upgrade, and fallback conditions.

+++

### MathJSON opportunity and ownership

- **Potential:** the server receives editor expression structure directly.
- **Path cost:** the team supports both MathJSON and legacy parsing.
- **Semantic cost:** conversion must preserve stored answers and error guidance.

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/14839"
    >PR #14839, open</a
  >
</p>

Note:
The motivating benefit is less server-side inference of complex editor structure from serialized text. The conversion layer still must preserve PrairieLearn's accepted language, simplification rules, stored answer shapes, messages, named domains, and restoration behavior. The November 4 evidence shows why acceptance alone cannot establish equivalence.

+++

![MathJSON candidate timing ratios for serializer and Compute Engine payloads](decks/pl-symbolic-input/mathjson-behavior-browser.png)
<!-- .element: class="r-stretch" -->

Note:
The serializer-payload mixed corpus measured 33.3% slower overall. The more realistic Compute Engine workload measured 45.1% slower overall. Unchanged plain submissions measured 31 to 38% slower when MathJSON cases ran in the same process, while the plain-only control stayed at baseline speed.

The candidate changes SymPy's global evaluate setting. SymPy clears the process-wide cache when that value changes. This confounds the per-slice timings because a MathJSON parse can slow whatever runs next in the worker. The issue author suggested constructing unevaluated nodes with local evaluate=False arguments but did not measure that change.

Do not treat this as proof that MathJSON itself must cost 45.1%. Do not compare this number directly with the LALR result. The experiments use different candidates and baselines.

+++

### MathJSON behavior regressions

- No accept or reject outcome changed in the tested comparisons
- There were differences in serialization in ~200/1600 inputs
- Compute Engine inputs received different messages in ~100/1600 inputs

<p class="rs-citation">
  <a
    href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635265560"
    >Issue #15970, November 4 behavior and browser results</a
  >
</p>

Note:
Acceptance alone does not establish compatibility. Many changed rejections lose specific guidance about floats, invalid symbols, invalid functions, sets, or trig restrictions. Named domains such as Reals have no editor key and arrive as individual letters. The harness also exposed restore problems for initial-value and pre-upgrade answers, although the author had not reproduced that behavior on a development server.

+++

### MathJSON browser regressions

- The new blur handler reached p95 115 ms at normal CPU.
- At 4× CPU throttling, blur p95 reached 471 ms.
- Large expressions reached p95 215 ms and 890 ms.
- Skipping a needless highlight clear remains proposed and unmeasured.

<p class="rs-citation">
  <a
    href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635265560"
    >Issue #15970, November 4 browser results</a
  >
</p>

Note:
The slow blur tail comes mainly from removeSourceErrorHighlights applying style across the entire expression on every blur, even when nothing received a highlight. The host used headless Chromium and CPU throttling, not production telemetry. The slowest nested expressions exceed typical typed depth, but the handler blocks the main thread whenever the case occurs.

Additional page-load measurements from the same comment: first-field initialization changed from 3.7 to 33 ms at normal CPU and from 15 to 130 ms at 4× throttling. The added compute-engine script measured 2.2 MB, or 616 KB with gzip -9.

+++

### Option 3: Lark LALR interpreter

- **Declarative grammar and direct SymPy evaluator**
- Native source spans through the intermediate representation and lowering
- No generated Python/`eval`
- Explicit control over permitted syntax and operations

<p class="rs-takeaway">
  The controlled boundary comes with full responsibility for the grammar and
  evaluator.
</p>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/issues/16067"
    >Issue #16067</a
  >
  ·
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/16068"
    >#16068 draft</a
  >
  ·
  <a href="https://github.com/PrairieLearn/PrairieLearn/pull/16069"
    >#16069 draft</a
  >
</p>

Note:
This option changes more than recognition. PrairieLearn owns the full path from the declarative grammar through source-spanned IR, lowering, and controlled SymPy construction. Ordinary parsing no longer generates Python and evaluates it with Python's eval or exec. The proposals retain historical helper artifacts for public compatibility only after successful grammar evaluation.

The architecture defines the student language explicitly. The grammar and evaluator can reject Python-only constructs such as attribute access, imports, comprehensions, and arbitrary function calls by design. The team also controls validation and execution boundaries and can add targeted restrictions or resource limits. This qualitative security advantage does not depend on the measured performance result.

Interpreter ownership does not guarantee safety. The team must maintain grammar rules, lowering, custom symbols and functions, permitted-function behavior, SymPy semantics, tests, dependency packaging, and the security boundary. Resource exhaustion and semantic validation still require dedicated testing.

Current status on November 4, 2026: #16068 and #16069 remain open drafts.

+++

![LALR candidate timing ratios against the direct non-parser baseline and master context](decks/pl-symbolic-input/lalr-timing-ratios.png)
<!-- .element: class="r-stretch" -->

<p class="rs-takeaway">
  Direct baseline: all 6,272 acceptance outcomes match. The raw and matched
  master views cover different workloads.
</p>

Note:
Emphasize the direct comparison. The LALR candidate measured 17.41% faster than the refactored legacy pipeline with JSON validation. The candidate-to-baseline ratio was 0.8259 with a 95% confidence interval of 0.8207 to 0.8350. Both implementations agreed on all 6,272 accept or reject outcomes and reported zero unexpected exceptions. Forty-eight rejection details differed in caret or snippet placement for disabled custom-function inputs.

Raw means all 6,272 LALR-versus-master cases, including acceptance disagreements. That view measured LALR 11.60% faster. Matched means the 4,840 cases where LALR and master agree on accepting or rejecting the submission. That view measured LALR 22.69% faster. These views time different workloads.

The 1,432 acceptance discrepancies come from the interface difference that predates LALR. Master supports legacy allow-sets, while the newer stack supports allowed-types. Master rejects 1,192 set expressions that the newer stack accepts. Master accepts 240 scalar expressions that the newer stack rejects under allowed-types="finite-set". Do not describe the raw-versus-matched difference as a regression caused by LALR.

Issue #16067 still defines final acceptance and performance gates. Do not present the candidate as production-proven.

---

<!-- .slide: class="rs-center" -->

### Decision and Evidence

<p class="rs-lede rs-mx-auto">
  Compare all three options against all three problems
</p>

Note:
The next vertical stack returns to the decision criteria, then states the evidence gates and discussion questions. Navigate down for the comparison.

+++

### Performance

| Incremental                      | MathJSON                                   | Lark LALR                                  |
| -------------------------------- | ------------------------------------------ | ------------------------------------------ |
| **1.06 to 0.77 ms** setup win    | **+33.3% to +45.1%** in current candidates | **17.41% faster** than its direct baseline |
| JSON-validation decision remains | Shared-cache effect confounds path cost    | All 6,272 acceptance outcomes match        |

<p class="rs-takeaway">
  These results come from distinct candidates, baselines, and workloads.
</p>

Note:
Keep the performance baselines separate. The incremental setup improvement compares 1.06 to 0.77 ms in its microprofile. The MathJSON figures compare #14839 against its stack or master baselines and include a shared-cache effect. The LALR figure compares the grammar candidate with the direct non-parser JSON-validation baseline on the fixed corpus.

+++

### Error Localization

| Incremental              | MathJSON                                       | Lark LALR                              |
| ------------------------ | ---------------------------------------------- | -------------------------------------- |
| Raw-source mapping       | Structured editor input                        | Native spans in the IR                 |
| One locator and renderer | 1,544 of 1,664 rejection messages differ today | 48 rejection-detail differences remain |

<p class="rs-takeaway">
  Acceptance equivalence does not prove equivalent student guidance.
</p>

Note:
The incremental path aims to map every error back to the raw student submission. MathJSON receives structured formula-editor input but currently changes many rejection messages and still needs the legacy path. LALR carries native spans through its intermediate representation, while the direct comparison still reports 48 caret or snippet differences for disabled custom functions.

+++

### Maintainability and Security

| Incremental                                    | MathJSON                                 | Lark LALR                                |
| ---------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Less scattered logic                           | Two parsing paths                        | Central grammar and controlled evaluator |
| Legacy engine and generated-Python path remain | Converter, browser, and restore behavior | Full interpreter ownership               |

<p class="rs-takeaway">
  A controllable language boundary adds responsibility rather than removing it.
</p>

Note:
MathJSON can layer onto the incremental work. LALR is a deeper replacement. Even after a grammar replacement, some source-normalization and compatibility concepts from the incremental work may remain useful.

The LALR path gives PrairieLearn explicit control over the permitted mathematical language and ordinary evaluation boundary, without generated Python evaluation. The team must still test permitted functions, semantic validation, resource exhaustion, dependency packaging, and rollback behavior.

Sources:
https://github.com/PrairieLearn/PrairieLearn/issues/15970
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6295825579
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635264864

+++

### Compatibility and source-span gates

- Match accept or reject outcomes.
- Preserve error guidance and stored `SympyJson` structures.
- Map repeated tokens, rewrites, and end-of-input errors to raw input.

<p class="rs-takeaway">
  Student-facing equivalence requires more than an acceptance count.
</p>

<p class="rs-citation">
  <a href="https://github.com/PrairieLearn/PrairieLearn/issues/16067"
    >Issue #16067, acceptance, performance, and rollout criteria</a
  >
</p>

Note:
For the incremental path, verify raw-source mapping and retain a deliberate JSON-validation decision. For MathJSON, test real Compute Engine payloads, messages, stored structures, named domains, restoration, and pre-upgrade answers. For LALR, enforce the full compatibility oracle across acceptance, exception category and message, SymPy type and structure, and serialized value.

+++

### Decision questions

- Which parsing complexity does PrairieLearn want to own?
- Does the formula-editor experience justify a second path after the measured regressions are fixed?
- What evidence would make the grammar replacement acceptable?

<p class="rs-takeaway">
  The next decision concerns evidence and ownership, not a predetermined
  rewrite.
</p>

Note:
Invite discussion rather than a vote on incomplete evidence. One possible outcome is to take the merged and low-risk incremental wins now while requiring the option-specific gates before choosing the hybrid or grammar paths. Another is to narrow the experiments further. The deck does not claim that the current data settles the architecture.

---

<!-- .slide: class="rs-center" -->

### Technical appendix

<p class="rs-lede rs-mx-auto">
  Additional benchmark context and current proposal status
</p>

Note:
Use these slides for baseline, status, or measurement questions.

+++

### Early full-stack benchmark through #15987

![Warm benchmark breakdown for the full refactor stack through PR 15987](decks/pl-symbolic-input/full-stack-warm-benchmark.png)
<!-- .element: class="r-stretch" -->

<p class="rs-citation">
  <a
    href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6084799467"
    >Issue #15970, October 9 initial results</a
  >
</p>

Note:
This early warm-start benchmark covered the full incremental stack through draft PR #15987. It reported accepted answers 27 to 42% faster, rejected answers 1 to 9% faster, and an all-case change of 26.1% faster against that benchmark's baseline. Treat it as evidence about that specific stack and configuration. It does not rank the later MathJSON and LALR candidates.

The main talk focuses on measurements with clearer named comparisons. This slide preserves the earlier issue evidence without implying a direct head-to-head result.

+++

### Measurement contexts are distinct

- **Setup: 1.06 to 0.77 ms** against the measured legacy parse
- **MathJSON: +33.3% and +45.1%** against its stack baseline, with a cache confound
- **LALR: 17.41% faster** than the refactored legacy baseline on all 6,272 cases

<p class="rs-takeaway">
  No source reports a single head-to-head experiment across all three options.
</p>

Note:
The setup measurement comes from the issue body and proposal comment. The MathJSON percentages come from the November 4 server benchmark. The LALR percentage comes from the October 20 post-rebase comparison. Preserve the candidate, baseline, corpus, and configuration whenever quoting a number.

Sources:
https://github.com/PrairieLearn/PrairieLearn/issues/15970
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635264864
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6295825579

+++

### MathJSON browser timing detail

| Event handler             | Normal CPU p50 / p95 | 4× throttling p50 / p95 |
| ------------------------- | -------------------: | ----------------------: |
| `input`, added by #14839  |       0.03 / 0.17 ms |          0.12 / 0.66 ms |
| `blur`, all cases         |        0.18 / 115 ms |           0.74 / 471 ms |
| `blur`, large expressions |          20 / 215 ms |             82 / 890 ms |

<p class="rs-takeaway">
  The input handler stays small. Full-expression highlight clearing creates the
  blur tail.
</p>

<p class="rs-citation">
  <a
    href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635265560"
    >Issue #15970, November 4 browser benchmark</a
  >
</p>

Note:
The benchmark used 3,080 formula-editor cases with 20 dispatches each in headless Chromium. CPU throttling stood in for slower devices. A CPU profile attributed about 97% of the 16 slowest cases to removeSourceErrorHighlights applying style across the full expression. Parsing and placeholder handling together stayed under 1 ms.

The same comment reports median first-field initialization of 3.7 versus 33 ms at normal CPU and 15 versus 130 ms at 4× throttling. Script evaluation changed from 8.9 to 13.3 ms at normal CPU and 35 to 53 ms at 4× throttling. JavaScript heap changed from 3.9 to 6.8 MB.

+++

### Incremental proposal status on November 4, 2026

| Work                                                              | Status     | Scope                             |
| ----------------------------------------------------------------- | ---------- | --------------------------------- |
| [#15972](https://github.com/PrairieLearn/PrairieLearn/pull/15972) | Merged     | SymPy parser setup                |
| [#15973](https://github.com/PrairieLearn/PrairieLearn/pull/15973) | Open draft | Source-mapped normalization       |
| [#15974](https://github.com/PrairieLearn/PrairieLearn/pull/15974) | Open draft | Raw-submission error localization |
| [#15987](https://github.com/PrairieLearn/PrairieLearn/pull/15987) | Open draft | Avoid submission re-parsing       |

Note:
PR state matters because the benchmarked branches include proposed work that PrairieLearn has not deployed. The merged setup optimization is the exception.

+++

### Alternative proposal status on November 4, 2026

| Work                                                                | Status     | Scope                        |
| ------------------------------------------------------------------- | ---------- | ---------------------------- |
| [#14839](https://github.com/PrairieLearn/PrairieLearn/pull/14839)   | Open       | Hybrid MathJSON pipeline     |
| [#16068](https://github.com/PrairieLearn/PrairieLearn/pull/16068)   | Open draft | Grammar evaluator            |
| [#16069](https://github.com/PrairieLearn/PrairieLearn/pull/16069)   | Open draft | Production parser switch     |
| [#16067](https://github.com/PrairieLearn/PrairieLearn/issues/16067) | Open issue | Acceptance and release gates |

Note:
Issue #16067 instructs both LALR PRs to remain drafts until their lower stack and blocker settle. PR #14839 remains open and has not deployed the MathJSON path.

Status sources are the linked GitHub pull-request pages as read on November 4, 2026.
