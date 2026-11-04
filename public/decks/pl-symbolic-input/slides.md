<!-- .slide: class="rs-center" -->

# `pl-symbolic-input` parsing architecture

## Performance, error locations, and options

<p class="rs-citation">PrairieLearn development design review · source state on November 4, 2026</p>

Note:
This review compares three architectural responses to the current symbolic-input problems. It does not assume that any option has won. The main question is which complexity PrairieLearn wants to own and what evidence the team needs before merging deeper changes.

Primary source: https://github.com/PrairieLearn/PrairieLearn/issues/15970

---

## Why milliseconds matter here

- `parse()` runs repeatedly in benchmark and grading workloads.
- Some setup work repeats even when its inputs do not change.
- One candidate path clears a process-wide SymPy cache, so later unrelated work can slow down.
- These measurements support predictable latency work. They do not establish production throughput or concurrency savings.

<p class="rs-takeaway">The useful target is avoidable repeated work, not a production-scale extrapolation from a microbenchmark.</p>

Note:
Address the premature-optimization question directly. A single millisecond rarely matters by itself. Repeated parsing, avoidable setup, and cache effects make the work worth measuring. Keep three motivations separate: predictable per-parse latency, repeated work inside measured workloads, and cross-request effects in a shared worker. The sources do not measure aggregate production savings or concurrency.

Source: https://github.com/PrairieLearn/PrairieLearn/issues/15970

---

## Three problems define the comparison

<div class="rs-grid cols-3">
  <div>
    <h3>Performance</h3>
    <p>Known gains, measured regressions, repeated work, and cache effects</p>
  </div>
  <div>
    <h3>Error localization</h3>
    <p>Carets and messages must refer to the text the student typed</p>
  </div>
  <div>
    <h3>Maintainability</h3>
    <p>Normalization and error handling need a tractable ownership model</p>
  </div>
</div>

<p class="rs-takeaway">Every option must answer all three problems.</p>

Note:
Use these criteria throughout the talk. Performance includes both direct parser time and effects on other work. Error localization includes messages and raw-source carets, not merely accept or reject behavior. Maintainability asks where future compatibility rules live and how many parsing paths the team supports.

---

## Most parse time sits outside regex

![Stage costs for a 50-character typed expression](decks/pl-symbolic-input/parse-stage-costs.png)
<!-- .element: class="r-stretch" -->

<p class="rs-takeaway"><code>parse()</code> measured about 1.06 ms. Regex used under 1%. JSON re-parse and validation used about 38%.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970">Issue #15970, performance profile</a> · <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15972">PR #15972</a></p>

Note:
The image shows the stage breakdown for one 50-character typed expression, including element preparation around the two parser passes. The issue summary reports about 1.06 ms for parse(). Importing SymPy globals once and replacing deep copies with shallow copies improved the measured parse time from 1.06 to 0.77 ms. PR #15972 merged on October 8. The remaining JSON re-parse protects against a serializer result that the parser cannot read, so removing it trades safety for speed.

Do not describe JSON validation as a free optimization. The issue estimates about 0.4 ms for the round trip and proposes either retaining it or replacing it with a property test.

---

## Rewrites disconnect errors from raw input

![Five text versions used by the legacy parse and error paths](decks/pl-symbolic-input/error-location-text-versions.png)
<!-- .element: class="r-stretch" -->

<div class="rs-grid cols-2 rs-small">
  <p><code>2 + sin</code><br />Generated-Python offset extends past the raw text</p>
  <p><code>x ++* 2</code><br />One-based Python offset places the caret on <code>2</code></p>
  <p><code>x + α</code><br />No caret, and the message reports <code>alpha</code></p>
  <p><code>||x|</code><br />The caret context shows generated <code>abs</code> text</p>
</div>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970">Issue #15970, error locations</a></p>

Note:
T0 is the raw student submission. Carets currently render on T1. Only T2 maps back to T1, while errors can carry positions from T2 or the generated Python in T3. No end-to-end map returns those locations to T0. The issue confirms that every listed problem also occurs on master.

For the final example, the Markdown source writes two vertical bars on the left and one on the right. The legacy absolute-value rewrite can expose generated abs text in the error context.

Full location analysis: https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6047774571

---

## Distributed normalization and error handling

- Eight procedural rewrite passes transform the submission before SymPy evaluation.
- Position mapping does not survive the entire transformation sequence.
- Location handling spans 5 functions, 4 locator helpers, and 9 rendering branches.
- New compatibility rules can affect normalization, evaluation, and student-facing errors in different places.

<p class="rs-takeaway">The maintenance cost comes from scattered responsibility, not only the parser engine.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6047774571">Issue #15970, proposal details and full error table</a></p>

Note:
The audience already knows much of the legacy code, so focus on the consequence. A developer changing one rewrite or one accepted construct must reason about ordering, transformed positions, exception types, and multiple rendering branches. Some dead or unreachable error logic also remains because different layers attempt to interpret the same failure.

---

## Option 1: incremental refactor

<div class="rs-grid cols-2">
  <div>
    <h3>Changes</h3>
    <ul>
      <li>Carry raw offsets in <code>SourceText</code> and <code>SourceToken</code></li>
      <li>Consolidate ordered normalization</li>
      <li>Use one locator and one renderer</li>
      <li>Keep inexpensive setup improvements</li>
    </ul>
  </div>
  <div>
    <h3>Retains</h3>
    <ul>
      <li>The legacy parser and SymPy machinery</li>
      <li>Procedural recognition and compatibility rules</li>
      <li>An explicit safety decision for JSON validation</li>
    </ul>
  </div>
</div>

<p class="rs-takeaway">This option repairs source tracking and ownership boundaries without replacing the parsing engine.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/pull/15972">#15972 merged</a> · <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15973">#15973 draft</a> · <a href="https://github.com/PrairieLearn/PrairieLearn/pull/15974">#15974 draft</a></p>

Note:
PR #15972 contains the merged parser-setup improvement. Draft PR #15973 consolidates normalization with source mapping. Draft PR #15974 localizes errors to raw submissions. These drafts cover only part of the broader issue stack. They do not remove the legacy parsing engine or settle the JSON-validation tradeoff.

Current status on November 4, 2026: #15973 and #15974 remain open drafts.

---

## Option 2: hybrid MathJSON

1. The formula editor asks Compute Engine for structured MathJSON.
2. The server converts supported MathJSON nodes into SymPy values.
3. Plain text, older submissions, and fallback cases keep the legacy parser.

<div class="rs-grid cols-2">
  <div>
    <h3>Potential benefit</h3>
    <p>The server can consume expression structure instead of reconstructing every editor expression from serialized text.</p>
  </div>
  <div>
    <h3>Additional burden</h3>
    <p>The team maintains two paths, conversion semantics, browser integration, and restore compatibility.</p>
  </div>
</div>

<p class="rs-takeaway">MathJSON can extend the incremental path. It does not replace the existing parser.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/pull/14839">PR #14839, open</a></p>

Note:
Present the hybrid as an architectural extension of option 1. The formula editor supplies structure, but the server still needs the legacy path for typed input, submissions saved before an upgrade, and fallback conditions. The conversion layer must preserve PrairieLearn's accepted language, simplification rules, stored answer shapes, messages, and restoration behavior.

---

## The current MathJSON candidate slows mixed workloads

![MathJSON candidate timing ratios for serializer and Compute Engine payloads](decks/pl-symbolic-input/mathjson-behavior-browser.png)
<!-- .element: class="r-stretch" -->

<p class="rs-takeaway">Changing SymPy's process-wide <code>evaluate</code> setting clears its shared cache. A proposed local-node approach remains unmeasured.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635264864">Issue #15970, November 4 server benchmark</a></p>

Note:
The serializer-payload mixed corpus measured 33.3% slower overall. The more realistic Compute Engine workload measured 45.1% slower overall. Unchanged plain submissions measured 31 to 38% slower when MathJSON cases ran in the same process, while the plain-only control stayed at baseline speed.

The candidate changes SymPy's global evaluate setting. SymPy clears the process-wide cache when that value changes. This confounds the per-slice timings because a MathJSON parse can slow whatever runs next in the worker. The issue author suggested constructing unevaluated nodes with local evaluate=False arguments but did not measure that change.

Do not treat this as proof that MathJSON itself must cost 45.1%. Do not compare this number directly with the LALR result. The experiments use different candidates and baselines.

---

## MathJSON behavior and browser regressions

<div class="rs-grid cols-2">
  <div>
    <h3>Behavior</h3>
    <ul>
      <li>No accept or reject outcome changed in the tested comparisons.</li>
      <li>1,544 of 1,664 rejected Compute Engine inputs received different messages.</li>
      <li>Accepted stored forms differed in 182 of 1,483 serializer cases and 246 of 1,416 Compute Engine cases.</li>
    </ul>
  </div>
  <div>
    <h3>Browser</h3>
    <ul>
      <li>The new blur handler reached p95 115 ms at normal CPU and 471 ms at 4× throttling.</li>
      <li>Large expressions reached p95 215 ms and 890 ms.</li>
      <li>Skipping highlight clearing when no highlight exists remains a proposed, unmeasured fix.</li>
    </ul>
  </div>
</div>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635265560">Issue #15970, November 4 behavior and browser results</a></p>

Note:
Acceptance alone does not establish compatibility. Many changed rejections lose specific guidance about floats, invalid symbols, invalid functions, sets, or trig restrictions. Named domains such as Reals have no editor key and arrive as individual letters. The harness also exposed restore problems for initial-value and pre-upgrade answers, although the author had not reproduced that behavior on a development server.

The slow blur tail comes mainly from removeSourceErrorHighlights applying style across the entire expression on every blur, even when nothing received a highlight. The host used headless Chromium and CPU throttling, not production telemetry. The slowest nested expressions exceed typical typed depth, but the handler blocks the main thread whenever the case occurs.

Additional page-load measurements from the same comment: first-field initialization changed from 3.7 to 33 ms at normal CPU and from 15 to 130 ms at 4× throttling. The added compute-engine script measured 2.2 MB, or 616 KB with gzip -9.

---

## Option 3: Lark LALR replacement

1. A declarative `.lark` grammar recognizes the symbolic language.
2. A source-spanned intermediate representation records the recognized structure.
3. Lowering applies PrairieLearn compatibility rules and custom-name behavior.
4. A direct evaluator constructs SymPy values without generated Python.

<div class="rs-grid cols-2">
  <div>
    <h3>Consolidates</h3>
    <p>Recognition, source spans, and ordinary evaluation move behind one explicit grammar boundary.</p>
  </div>
  <div>
    <h3>Adds ownership</h3>
    <p>The team maintains the grammar, lowering rules, dependency packaging, security boundary, and compatibility oracle.</p>
  </div>
</div>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/16067">Issue #16067</a> · <a href="https://github.com/PrairieLearn/PrairieLearn/pull/16068">#16068 draft</a> · <a href="https://github.com/PrairieLearn/PrairieLearn/pull/16069">#16069 draft</a></p>

Note:
This option changes more than recognition. It changes the evaluation boundary, security assumptions, dependency packaging, and the place where compatibility behavior lives. Ordinary parsing no longer generates or evaluates Python, but the proposals retain historical helper artifacts for public compatibility after successful grammar evaluation.

LALR does not eliminate maintenance. The team must maintain grammar rules, lowering, custom symbols and functions, SymPy semantics, tests, and security constraints.

Current status on November 4, 2026: #16068 and #16069 remain open drafts.

---

## The LALR candidate improved its direct baseline by 17.41%

![LALR candidate timing ratios against the direct non-parser baseline and master context](decks/pl-symbolic-input/lalr-timing-ratios.png)
<!-- .element: class="r-stretch" -->

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6295825579">Issue #15970, October 20 matched comparison</a> · <a href="https://github.com/PrairieLearn/PrairieLearn/issues/16067">release criteria</a></p>

Note:
The direct candidate-to-baseline ratio measured 0.8259 with a 95% confidence interval of 0.8207 to 0.8350. That equals 17.41% faster on the fixed 6,272-case corpus. The comparison reported zero accept or reject changes and zero unexpected exceptions. Forty-eight rejection details differed in caret or snippet placement for disabled custom-function inputs.

The comparisons with master are not behaviorally apples-to-apples. Master uses legacy allow-sets behavior while the stack uses allowed-types. That difference accounts for 1,432 outcome differences already present before the LALR change. Use the direct non-parser JSON-validation baseline for the 17.41% claim.

Issue #16067 still defines final acceptance and performance gates. Do not present the candidate as production-proven.

---

## Three options across three problems

| Problem | Incremental refactor | Hybrid MathJSON | Lark LALR replacement |
| --- | --- | --- | --- |
| **Performance** | Merged setup win; JSON decision remains | Current candidate: +33.3% to +45.1%, with cache confound | 17.41% faster than its direct non-parser baseline |
| **Error localization** | Raw-source mapping and one renderer | Structured input, but current messages regress | Native IR spans; 48 rejection-detail differences remain |
| **Maintainability** | Less scattered logic; legacy engine remains | Legacy path plus conversion and browser path | One grammar and evaluator; new language ownership |

<p class="rs-takeaway">The alternatives can overlap, but their long-term ownership costs differ.</p>

Note:
Keep the performance baselines separate. The incremental setup improvement compares 1.06 to 0.77 ms in its microprofile. The MathJSON figures compare #14839 against its stack or master baselines and include a shared-cache effect. The LALR figure compares the grammar candidate with the direct non-parser JSON-validation baseline on the fixed corpus.

MathJSON can layer onto the incremental work. LALR is a deeper replacement. Even after a grammar replacement, some source-normalization and compatibility concepts from the incremental work may remain useful.

Sources:
https://github.com/PrairieLearn/PrairieLearn/issues/15970
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6295825579
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635264864

---

## Evidence required before a merge

- **Compatibility:** accept or reject outcome, error guidance, stored `SympyJson`, and older answers
- **Source spans:** raw-input carets across rewrites, repeated tokens, and end-of-input errors
- **Performance:** realistic mixed workloads with named warm, cold, and direct baselines
- **Reliability and security:** no unexpected exceptions, packaged resources, and enforced language boundaries
- **Release:** option-specific rollback and a clear boundary for inactive code

<p class="rs-takeaway">Each option needs gates that cover its own failure modes.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/16067">Issue #16067, acceptance, performance, and rollout criteria</a></p>

Note:
For the incremental path, verify raw-source mapping and retain a deliberate JSON-validation decision. For MathJSON, test real Compute Engine payloads, messages, stored structures, named domains, restoration, cache behavior, and browser responsiveness. For LALR, enforce the full compatibility oracle, built-package grammar import, the Python-construct security boundary, and the final paired benchmark gate.

The current evidence suggests several fixes, but suggested fixes do not count as measured results.

---

## Decision questions

- Which parsing complexity does PrairieLearn want to own?
- Does the formula-editor experience justify a second path after the measured regressions are fixed?
- What evidence would make the grammar replacement acceptable?
- Which incremental repairs provide value regardless of the longer-term engine choice?

<p class="rs-takeaway">The next decision concerns evidence and ownership, not a predetermined rewrite.</p>

Note:
Invite discussion rather than a vote on incomplete evidence. One possible outcome is to take the merged and low-risk incremental wins now while requiring the option-specific gates before choosing the hybrid or grammar paths. Another is to narrow the experiments further. The deck does not claim that the current data settles the architecture.

---

<!-- .slide: class="rs-center" -->

## Technical appendix

<p class="rs-lede rs-mx-auto">Additional benchmark context and current proposal status</p>

Note:
Use these slides for baseline, status, or measurement questions.

---

## Early full-stack benchmark through #15987

![Warm benchmark breakdown for the full refactor stack through PR 15987](decks/pl-symbolic-input/full-stack-warm-benchmark.png)
<!-- .element: class="r-stretch" -->

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6084799467">Issue #15970, October 9 initial results</a></p>

Note:
This early warm-start benchmark covered the full incremental stack through draft PR #15987. It reported accepted answers 27 to 42% faster, rejected answers 1 to 9% faster, and an all-case change of 26.1% faster against that benchmark's baseline. Treat it as evidence about that specific stack and configuration. It does not rank the later MathJSON and LALR candidates.

The main talk focuses on measurements with clearer named comparisons. This slide preserves the earlier issue evidence without implying a direct head-to-head result.

---

## Measurement contexts are distinct

| Result | Candidate and baseline | Context |
| --- | --- | --- |
| **1.06 to 0.77 ms** | Setup optimization versus the measured legacy parse | Import globals once; shallow-copy locals |
| **+33.3% and +45.1%** | MathJSON candidates versus their stack baseline | Serializer corpus and Compute Engine workload; shared-cache confound |
| **17.41% faster** | LALR versus non-parser JSON-validation stack | 6,272 cases; zero accept or reject changes |

<p class="rs-takeaway">No source reports a single head-to-head experiment across all three options.</p>

Note:
The setup measurement comes from the issue body and proposal comment. The MathJSON percentages come from the November 4 server benchmark. The LALR percentage comes from the October 20 post-rebase comparison. Preserve the candidate, baseline, corpus, and configuration whenever quoting a number.

Sources:
https://github.com/PrairieLearn/PrairieLearn/issues/15970
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635264864
https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6295825579

---

## MathJSON browser timing detail

| Event handler | Normal CPU p50 / p95 | 4× throttling p50 / p95 |
| --- | ---: | ---: |
| `input`, added by #14839 | 0.03 / 0.17 ms | 0.12 / 0.66 ms |
| `blur`, all cases | 0.18 / 115 ms | 0.74 / 471 ms |
| `blur`, large expressions | 20 / 215 ms | 82 / 890 ms |

<p class="rs-takeaway">The input handler stays small. Full-expression highlight clearing creates the blur tail.</p>

<p class="rs-citation"><a href="https://github.com/PrairieLearn/PrairieLearn/issues/15970#issuecomment-6635265560">Issue #15970, November 4 browser benchmark</a></p>

Note:
The benchmark used 3,080 formula-editor cases with 20 dispatches each in headless Chromium. CPU throttling stood in for slower devices. A CPU profile attributed about 97% of the 16 slowest cases to removeSourceErrorHighlights applying style across the full expression. Parsing and placeholder handling together stayed under 1 ms.

The same comment reports median first-field initialization of 3.7 versus 33 ms at normal CPU and 15 versus 130 ms at 4× throttling. Script evaluation changed from 8.9 to 13.3 ms at normal CPU and 35 to 53 ms at 4× throttling. JavaScript heap changed from 3.9 to 6.8 MB.

---

## Proposal status on November 4, 2026

| Work | Status | Scope |
| --- | --- | --- |
| [#15972](https://github.com/PrairieLearn/PrairieLearn/pull/15972) | Merged | SymPy parser setup |
| [#15973](https://github.com/PrairieLearn/PrairieLearn/pull/15973) | Open draft | Source-mapped normalization |
| [#15974](https://github.com/PrairieLearn/PrairieLearn/pull/15974) | Open draft | Raw-submission error localization |
| [#15987](https://github.com/PrairieLearn/PrairieLearn/pull/15987) | Open draft | Avoid submission re-parsing |
| [#14839](https://github.com/PrairieLearn/PrairieLearn/pull/14839) | Open | Hybrid MathJSON pipeline |
| [#16068](https://github.com/PrairieLearn/PrairieLearn/pull/16068), [#16069](https://github.com/PrairieLearn/PrairieLearn/pull/16069) | Open drafts | Grammar evaluator and production switch |

Note:
PR state matters because the benchmarked branches include proposed work that PrairieLearn has not deployed. The merged setup optimization is the exception. Issue #16067 instructs both LALR PRs to remain drafts until their lower stack and blocker settle.

Status sources are the linked GitHub pull-request pages as read on November 4, 2026.
