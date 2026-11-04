# Agent brief: PrairieLearn symbolic-input parsing architecture

## Your assignment

Create a **Reveal.js presentation** for the PrairieLearn development team about the problems with `pl-symbolic-input` parsing and three architectural responses. Work within the existing Reveal.js workspace. Inspect its existing presentation conventions, components, and utility CSS before implementing anything.

This is a **technical design review**, not a product pitch. The goal is to help experienced developers reason about the tradeoffs, **not** to argue that any one proposal has already won.

Use the source material as it stood on **November 4, 2026**. Do not imply that draft PRs are merged or that proposed fixes have already been benchmarked.

## Sources (link to these; no images are embedded in this brief)

**Primary source and sole source for preexisting presentation graphics:**
- [PrairieLearn issue #15970 — `pl-symbolic-input` parse pipeline: performance, error locations, and consolidation](https://github.com/PrairieLearn/PrairieLearn/issues/15970)

**Implementation details and related measurements:**
- [PR #15973 — Unify symbolic input normalization with source mapping](https://github.com/PrairieLearn/PrairieLearn/pull/15973)
- [PR #15974 — Localize symbolic input errors to raw submissions](https://github.com/PrairieLearn/PrairieLearn/pull/15974)
- [PR #15972 — Speed up SymPy parser setup (merged)](https://github.com/PrairieLearn/PrairieLearn/pull/15972)
- [PR #15987 — Avoid reparsing `pl-symbolic-input` submissions](https://github.com/PrairieLearn/PrairieLearn/pull/15987)
- [PR #14839 — Structured MathJSON-to-SymPy pipeline](https://github.com/PrairieLearn/PrairieLearn/pull/14839)
- [Issue #16067 — Grammar-evaluator replacement and release criteria](https://github.com/PrairieLearn/PrairieLearn/issues/16067)
- [PR #16068 — Add a grammar evaluator for symbolic expressions](https://github.com/PrairieLearn/PrairieLearn/pull/16068)
- [PR #16069 — Use the grammar evaluator for symbolic input](https://github.com/PrairieLearn/PrairieLearn/pull/16069)

When quoting a number, identify its comparison baseline and link to the appropriate source. If you can link to a specific GitHub comment, do so; otherwise link to the relevant issue or PR and identify the dated comment/section in the notes.

## Audience and speaking approach

- **Audience:** PrairieLearn developers, already familiar with the legacy `pl-symbolic-input` code and its piecemeal normalization/parsing behavior. Some helped with the recent fixes.
- **Assume familiarity:** Do not spend multiple slides explaining basic SymPy, MathLive, or the full legacy pipeline.
- **Motivate the performance work:** Spend approximately one or two early slides answering *“Why chase millisecond-scale savings instead of doing premature optimization?”*
- **Be rigorous:** Per-parse savings matter in repeated workloads, but avoid claims about actual aggregate production savings or concurrency that the measurements do not establish. Discuss predictable latency, repeated work, and cross-request cache effects as distinct motivations.
- **Tone:** Collaborative, candid, technical, and non-promotional. Show important regressions and unresolved questions alongside benefits.
- **Speaker notes:** Put explanations, methodological qualifications, PR status, and discussion prompts in Reveal.js speaker notes; keep the slide surface sparse.

## The organizing framework: two sets of three

Structure the talk around these **three problems**, followed by the **three possible solutions**. The final comparison should evaluate all solutions against all problems.

### Problems

1. **Performance — gains and losses.** Where time is spent, which optimizations already work, why some regressions affect unrelated requests, and whether results justify deeper changes.
2. **Error localization.** Rewrites shift positions away from what students actually typed, producing misleading carets and messages.
3. **Code maintainability.** Multiple procedural rewrites and distributed error-handling logic make changes costly and difficult to reason about.

### Solutions / architectural choices

1. **Incremental refactor of the existing parser.** Take inexpensive wins; consolidate normalization into source-aware transformations (`SourceText` / `SourceToken`), improve error localization, and keep the legacy parsing engine. This covers only part of the broader issue/PR stack.
2. **Hybrid MathJSON, layered on the existing parser.** MathLive/Compute Engine emits structured MathJSON for formula-editor submissions; the server converts it to SymPy. Plain text, older submissions, and fallback conditions retain legacy parsing. Present it as a possible extension of option 1, **not** as a complete replacement. Explain the newly measured performance and UX regressions, without assuming unmeasured fixes solve them.
3. **Replace the parsing engine with Lark LALR.** Use a declarative grammar, source-span-carrying intermediate representation, lowering, and direct SymPy evaluation. This unifies ordinary parsing and eliminates much procedural recognition code, but introduces responsibility for maintaining the grammar, semantic lowering, compatibility/security boundaries, and a new dependency.

Do not imply that the alternatives are perfectly mutually exclusive. In particular, option 2 needs the existing parser; option 3 is a deeper architectural change than either of the first two.

## Visual and layout requirements

- **Use only the preexisting graphics, charts, tables, and concrete examples from [issue #15970](https://github.com/PrairieLearn/PrairieLearn/issues/15970).** Refer to that issue to locate the original visuals; do not reproduce or embed them in this Markdown brief.
- **Explicit exclusion:** Do **not** use the **first highly detailed parse-pipeline diagram** near the top of the issue.
- Retain the other relevant visual evidence from the issue, including performance breakdowns/benchmarks, error-location examples, LALR comparisons, and November 4 MathJSON results. You may distribute dense material between the main slides and a technical appendix; do not silently omit a result that bears on the comparison.
- **No new illustrations, icons, stock art, decorative figures, synthetic charts, or complex pipeline diagrams.** Plain bullets and simple text headings are the default. Do not invent charts or redraw figures if the source is inaccessible; use a concise text citation instead.
- Use the workspace's **existing utility CSS classes** and Reveal.js theme conventions. **Do not create a new design system** or add bespoke styling merely for aesthetics.
- Keep most slides to **one point**, with about **3–5 short bullets** at most. Prefer splitting evidence across slides to shrinking type or adding paragraphs.
- Use code-like typography for expressions and names where appropriate; keep any code snippets very short.
- Include unobtrusive source links on evidence slides; place long source/methodology details in speaker notes.

## Recommended slide progression

The following is a content outline, **not** a request for rigid slide count. Aim for roughly 14–18 main slides, and add a modest technical appendix if needed to preserve relevant source evidence without making slides dense.

### Opening: why are we doing this?

1. **Title / decision context.** `pl-symbolic-input`: performance, error locations, and architectural options. Frame the talk as a comparison, not a predetermined rewrite.
2. **Why milliseconds matter.** Parsing happens repeatedly; some overhead is avoidable; cache invalidation can affect other work in the same worker. Explicitly acknowledge the premature-optimization question and avoid unsupported production-scale extrapolation.
3. **Three problems / decision criteria.** Performance, error localization, maintainability. Establish these as the recurring lens.

### Part I: the three problems

4. **Performance profile.** From issue #15970: initial `parse()` cost around **1.06 ms**; regex under **1%**; JSON re-parse/validation about **38%**. Show source evidence and mention benchmark context. The inexpensive setup optimization improved **1.06 → 0.77 ms** and has merged; the remaining JSON-validation tradeoff should not be treated as a free optimization.
5. **Error localization is wrong in recognizable cases.** Use issue examples such as `2 + sin`, `x ++* 2`, `x + α`, and `||x|`. Explain that generated/intermediate-text offsets do not reliably refer to the student's original input.
6. **Maintainability cost.** Eight rewrite passes, position mapping that is not preserved end to end, and error location/rendering distributed across several functions/helpers/branches. Developers know the details; spend time on the consequence rather than the full original pipeline.

### Part II: the three responses

7. **Option 1 — Incremental refactor.** Preserve parser semantics; fold transformations into an ordered source-tracking representation; centralize source-location and rendering logic. Reference PRs #15973 and #15974, and distinguish already-merged performance work from open draft refactors.
8. **Option 1 — What it buys / what it does not.** Better error carets and easier maintenance; some easy performance improvements. It still owns/uses the existing procedural parsing and SymPy machinery, and the JSON re-parse remains an explicit safety-versus-speed decision. Include issue measurements/figures as relevant.
9. **Option 2 — Hybrid MathJSON.** Formula editor → Compute Engine/MathJSON → SymPy; legacy path remains for other/fallback submissions. Motivating benefit: reduce the need to infer complex editor expression structure from serialized text; added cost: more pathways to support, conversion semantics, and frontend work.
10. **Option 2 — Server performance regression.** Show the **November 4** issue benchmarks and the cache-invalidation mechanism. Selected figures: **+33.3%** total time in the serializer-payload mixed corpus; **+45.1%** in a more realistic Compute Engine editor workload; even unrelated plain submissions were **31–38% slower** when mixed with MathJSON cases. Explain that toggling SymPy's process-wide `evaluate` setting clears the shared cache. These are measurements of the **current proposed implementation**, not proof MathJSON is inherently this slow. A local-node `evaluate=False` approach was suggested but **not measured**.
11. **Option 2 — Behavior and browser regressions.** Acceptance was unchanged in the tested comparisons, but **1,544 / 1,664** rejected Compute Engine inputs had different messages (many less informative). Mention equivalent-but-structurally-different stored forms, named-domain and answer-restoration concerns, and the expensive blur highlight-clearing handler. Blur-handler p95 was **115 ms** at normal CPU and **471 ms** at 4× throttling; note the severe nested-expression tails and that a proposed optimization remains unverified. Use issue examples/tables rather than inventing visuals.
12. **Option 3 — Lark LALR replacement.** Declarative `.lark` grammar → source-spanned IR → lowering → direct SymPy evaluation. Ordinary parsing no longer generates/evaluates Python. New parser ownership, grammar upkeep, security and compatibility burden remain.
13. **Option 3 — Evidence and caveats.** The October 20 matched comparison found **17.41% faster** execution against the **non-parser refactor baseline**, on a **6,272-case** corpus, with **zero accept/reject changes** and no unexpected exceptions. **48** rejection details differed in caret/snippet placement. Comparisons to `master` were not behaviorally apples-to-apples because `allowed-types` behavior differed. Final acceptance and benchmark gates are still specified in issue #16067; do not present the candidate as production-proven.

### Decision and discussion

14. **Comparison across three criteria.** One sparse comparison slide (plain bullet columns or a minimal table using existing workspace conventions). Consider:
    - Performance: incremental known wins; MathJSON current implementation regressions/confounded by cache; LALR improvement against its specific baseline.
    - Error localization: source mapping; structured frontend messages with current regressions; native spans in the grammar evaluator.
    - Maintainability: refactor existing code; maintain two parsing paths; own one explicit grammar and evaluator.
15. **What must be proven before a merge?** Compatible student-facing errors and stored answers; correct source spans; realistic warmed and cold measurements; no unexpected exceptions; packaging/security and rollback considerations. Make the criteria option-specific where necessary.
16. **Discussion / decision.** Ask which complexity PrairieLearn wants to own, whether the MathJSON user experience justifies the extra pipeline once regressions are fixed, and what evidence is required before choosing the grammar replacement.

## Technical accuracy: preserve these qualifications

- **Separate baselines.** Do **not** directly compare the **17.41% LALR improvement** to the **+45.1% MathJSON regression** as though they were measured in one head-to-head experiment. Identify corpus, baseline, and experimental configuration.
- **Performance is not just regex.** Issue #15970 reports regex under 1% of baseline time; JSON validation/re-parsing and setup costs are much larger contributors.
- **MathJSON cache confound.** The observed regression in the candidate arises in substantial part from invalidating a process-wide SymPy cache; the converter's isolated cost is not established by those mixed-workload comparisons. Do not assert the suggested fix has been measured.
- **Acceptance is not full equivalence.** Error guidance, original-source carets, stored-expression structure, compatibility with previously saved submissions, and browser responsiveness all matter.
- **LALR is not maintenance-free.** Declarative recognition removes scattered procedural parser logic, but the team must maintain grammar rules, lowering, custom-name behavior, SymPy semantics, tests, and security constraints.
- **PR status matters.** Early setup optimization (#15972) is merged. Source-map/error-location changes (#15973, #15974), MathJSON (#14839), and LALR replacement PRs (#16068, #16069) should be described according to their actual reviewed/merged state, not treated as deployed improvements.
- **Known limitations:** Browser benchmarks used headless Chromium/CPU throttling on a host, not production telemetry; answer restoration was observed in the test harness and not yet reproduced on a development server at the time of the November 4 comment.

## Deliverable and checks

Produce a working presentation in the **existing Reveal.js project**, following the repository's own file structure and conventions. Keep slides intentionally spare and add meaningful presenter notes. Do not include extra art, new diagrams, or an invented visual theme.

Before finishing, verify:

1. The talk clearly follows **three problems → three options → three-way comparison**.
2. The first detailed pipeline graphic from issue #15970 is absent; other relevant evidence in that issue is represented or explicitly linked.
3. Visuals are sourced from the original GitHub issue, and all benchmark claims have a traceable source and a named comparison baseline.
4. Present claims distinguish **measured**, **inferred**, and **proposed-but-unmeasured** effects.
5. Speaker notes capture technical context without turning slides into paragraphs.
6. The presentation builds/renders in the workspace, uses its utility CSS, and has no broken navigation or overflowing slide content.

**Do not** build a separate presentation system. **Do not** assume a recommendation in advance: conclude with the decision and evidence the team needs to discuss.
