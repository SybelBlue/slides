<!-- .slide: class="rs-center pqp-title pqp-slide" -->

<h1 class="r-fit-text pqp-title-heading">
  Three passes to a<br />PrairieLearn question bank
</h1>

<p class="pqp-passline">
  <span>generate-fixed</span>
  <i aria-hidden="true">→</i>
  <span>randomize-fixed</span>
  <i aria-hidden="true">→</i>
  <span>tag-fixed</span>
</p>

<p class="rs-lede">
  Correctness first. Controlled variety second. Discoverability last.
</p>

<p class="rs-citation">LearnVia Calculus II content-development pipeline</p>

Note:
This is a pipeline for turning source problems into a usable PrairieLearn question bank. The point of three passes is not ceremony. Each pass isolates a different kind of uncertainty and ends with evidence that the next pass can trust.

--- <!-- .slide: class="pqp-slide" -->

## One giant pass mixes three kinds of risk

<div class="rs-grid cols-3 pqp-risk-grid">
  <div class="rs-card">
    <small>Translation risk</small>
    <strong>Did we preserve the problem?</strong>
    <p>
      Prompts, answer structure, notation, grading, and accessibility all have
      to survive the move into PrairieLearn.
    </p>
  </div>
  <div class="rs-card secondary">
    <small>Variant risk</small>
    <strong>Did randomness change the task?</strong>
    <p>
      A valid value can still erase a reasoning step, add a new case, or make
      one variant much harder.
    </p>
  </div>
  <div class="rs-card">
    <small>Metadata risk</small>
    <strong>Are we describing stable behavior?</strong>
    <p>
      Difficulty, answer class, and warnings become stale when assigned before
      the question stops changing.
    </p>
  </div>
</div>

<p class="rs-takeaway">
  Separate the risks so each review has one clear question to answer.
</p>

Note:
An agent can perform all three kinds of work, but it should not reason about all three at once. Translation asks whether the fixed question is faithful and gradeable. Randomization asks whether a whole family of questions remains faithful. Tagging asks how the finished behavior should be indexed and flagged.

--- <!-- .slide: class="pqp-slide" -->

## The pipeline is a sequence of contracts

<div class="rs-workflow pqp-flow">
  <div class="rs-card step">
    <small>Source + known answer</small>
    <strong>generate-fixed</strong>
    <span>Build one reviewable PrairieLearn question.</span>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card step secondary">
    <small>Approved fixed question</small>
    <strong>randomize-fixed</strong>
    <span>Construct and audit a controlled variant family.</span>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card step primary">
    <small>Stable behavior</small>
    <strong>tag-fixed</strong>
    <span>Classify, catalog, and flag without changing behavior.</span>
  </div>
</div>

<div class="pqp-gates" aria-label="Review gates">
  <span>human review</span>
  <span>variant audit</span>
  <span>metadata validation</span>
</div>

Note:
The output of one pass is the trusted input to the next. There is an explicit human review between generation and randomization. The randomization audit stabilizes behavior before tagging. The third pass is intentionally not a repair pass: it reports defects and review work instead of silently changing the question again.

--- <!-- .slide: class="pqp-slide pqp-contract-slide" -->

## “Fixed” is a design contract, not a shortcut

```python [2-4|6-9]
def generate(data):
    x0 = sp.Rational(1, 10)
    f = sp.exp(x)
    linear = sp.series(f, x, 0, 2).removeO().subs(x, x0)

    data["params"]["function"] = plutil.latex(f)
    data["correct_answers"]["linear"] = (
        pl.to_json(linear)
    )
```

<div class="pqp-contract-points">
  <div class="rs-card">
    <strong>One mathematical source</strong>
    <p>Build the expression once, then derive its display and answer.</p>
  </div>
  <div class="rs-card secondary">
    <strong>Server-backed values</strong>
    <p>
      Even fixed values belong in <code>server.py</code>, ready for a later
      parameter domain.
    </p>
  </div>
  <div class="rs-card">
    <strong>Review evidence</strong>
    <p>Keep the supplied answer beside its input in a reviewer-only comment.</p>
  </div>
</div>

<p class="rs-takeaway">
  The first pass creates a stable seam for the second pass.
</p>

Note:
Fixed does not mean hard-coded into HTML. The drafting skill establishes server.py as the source of truth from the beginning. That design choice is the bridge to randomization: the second pass changes how the underlying object is chosen, not where truth lives or how the question is structured.

--- <!-- .slide: class="pqp-slide" -->

## Pass 1: generate-fixed

<div class="rs-grid cols-2 pqp-pass-detail">
  <div class="rs-card pqp-files">
    <small>Question bundle</small>
    <ul class="rs-filetree">
      <li>
        questions/&lt;chapter&gt;/&lt;question&gt;/
        <ul>
          <li>question.html</li>
          <li>server.py</li>
          <li>info.json</li>
          <li class="directory">clientFilesQuestion/</li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="rs-card secondary pqp-checklist">
    <small>Exit gate</small>
    <ul>
      <li>Faithful stem and consolidated parts</li>
      <li>Known answers receive full credit</li>
      <li>Accessible labels and figure descriptions</li>
      <li>Course styling and element choices reviewed</li>
      <li>Ruff, Prettier, HTML/Mustache, and one lifecycle seed</li>
    </ul>
  </div>
</div>

<p class="rs-takeaway">
  Output: one complete question that a person can review before any randomness
  is introduced.
</p>

Note:
The current skill is named draft-fixed-prairielearn-questions. The deck uses generate-fixed as the pipeline-facing name. Its job is larger than file creation: it chooses structured answer elements, consolidates related lettered parts, carries forward the known answer, and records grading and double-jeopardy concerns for reviewers.

--- <!-- .slide: class="pqp-slide" -->

## Pass 2: randomize-fixed

<div class="pqp-invariant-grid">
  <div class="rs-card">
    <small>May vary</small>
    <ul>
      <li>Coefficients and evaluation points</li>
      <li>Compatible function parameters</li>
      <li>Choice configurations</li>
      <li>Generated figures</li>
    </ul>
  </div>
  <div class="pqp-invariant-mark" aria-hidden="true">≠</div>
  <div class="rs-card secondary">
    <small>Must not vary</small>
    <ul>
      <li>Learning objective</li>
      <li>Solution path and case structure</li>
      <li>Workload and answer complexity</li>
      <li>Legibility and accessibility</li>
    </ul>
  </div>
</div>

<div class="pqp-audit-strip">
  <span
    ><strong>Before code</strong> write
    <code>difficulty-analysis.md</code></span
  >
  <span
    ><strong>Whole domain</strong> exclude degenerate values by
    construction</span
  >
  <span
    ><strong>Evidence</strong> ≥15 distinct tasks + ≥10 lifecycle seeds</span
  >
</div>

Note:
Randomization begins with a written analysis of the fixed solution, proposed domains, dependencies, exclusions, and audit plan. A seed sweep alone is not proof. Small domains should be enumerated; larger domains should be constructed so excluded cases cannot occur, then tested across every branch and boundary.

--- <!-- .slide: class="pqp-slide" -->

## Question 4.09: vary values, preserve reasoning

<div class="pqp-example">
  <div class="rs-card">
    <small>Fixed baseline</small>
    <strong
      ><i>f</i>(<i>x</i>) = e<sup><i>x</i></sup> at <i>x</i> = 1/10</strong
    >
    <p>
      Compute linear and quadratic Maclaurin estimates, then decide which is
      more accurate.
    </p>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card secondary">
    <small>Controlled family</small>
    <strong
      ><i>f</i>(<i>x</i>) = e<sup><i>kx</i></sup> at <i>x</i> =
      <i>m</i>/(10<i>k</i>)</strong
    >
    <p><i>k</i> ∈ {2, 3, 4, 5}; <i>m</i> ∈ {1, 2, 3, 4}</p>
  </div>
</div>

<div class="rs-grid cols-3 pqp-proof-points">
  <div><strong>16</strong><span>pairs enumerated</span></div>
  <div><strong>1,000</strong><span>seed coverage sweep</span></div>
  <div><strong>10</strong><span>PrairieLearn lifecycle seeds</span></div>
</div>

<p class="rs-takeaway">
  <code>k = 1</code> is excluded because it erases the intended chain-rule
  factor; the normalized target keeps arithmetic comparable.
</p>

Note:
This is the central example. The variant domain is designed around the reasoning, not around variety for its own sake. Both Taylor terms remain nonzero, the chain-rule multiplier remains visible, and kx stays between 0.1 and 0.4. Trigonometric alternatives were rejected because unshifted sine or cosine would remove one of the requested polynomial terms.

--- <!-- .slide: class="pqp-slide pqp-visual-slide" -->

## Visual placeholder: Question 4.09 progression

<div class="pqp-placeholder-triptych r-stretch">
  <div class="pqp-placeholder">
    <strong>Fixed question</strong>
    <span>Rendered screenshot</span>
  </div>
  <div class="pqp-placeholder">
    <strong>Randomized variant A</strong>
    <span>Rendered screenshot</span>
  </div>
  <div class="pqp-placeholder">
    <strong>Randomized variant B</strong>
    <span>Rendered screenshot</span>
  </div>
</div>

<p class="rs-citation">
  Replace these panels with captures from the PrairieLearn renderer.
</p>

Note:
This slide is intentionally a placeholder. The final images should use the same viewport and question state so the audience can see that only the mathematical instance changes while the structure and requested reasoning remain stable.

--- <!-- .slide: class="pqp-slide" -->

## Chapter 4 shows the passes at scale

<div class="pqp-scale-flow">
  <div class="rs-card">
    <small>generate-fixed</small>
    <strong>81</strong>
    <span>fixed questions</span>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card secondary">
    <small>pilot</small>
    <strong>12</strong>
    <span>randomized first</span>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card secondary">
    <small>scale-up</small>
    <strong>69</strong>
    <span>remaining questions</span>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card primary">
    <small>evidence</small>
    <strong>81</strong>
    <span>difficulty analyses</span>
  </div>
</div>

<div class="pqp-transition">
  <span><strong>81 / 81</strong> tag arrays are still empty</span>
  <span><strong>17</strong> questions use manual grading</span>
</div>

<p class="rs-takeaway">
  The behavior is now rich enough to classify—and stable enough that the
  classification should last.
</p>

Note:
The branch history gives us an actual pipeline story. One commit touched the three core files for all 81 questions. A 12-question pilot exercised the randomization skill before the remaining 69 were processed. Every question now has a difficulty analysis, but metadata has deliberately not yet been layered on top.

--- <!-- .slide: class="pqp-slide" -->

## Pass 3: tag-fixed <span class="pqp-upcoming">upcoming</span>

<div class="rs-grid cols-2 pqp-tag-pass">
  <div class="rs-card">
    <small>Read stable behavior</small>
    <ul>
      <li>Assessment order and question files</li>
      <li>Actual answer elements and grading mode</li>
      <li>Generated parameter space</li>
      <li><code>difficulty-analysis.md</code></li>
    </ul>
  </div>
  <div class="rs-card secondary">
    <small>Write discoverable metadata</small>
    <div class="pqp-tags" aria-label="Example tag categories">
      <span>Easy · Medium · Hard</span>
      <span>Calc</span>
      <span>topic:*</span>
      <span>answer-class:*</span>
      <span>Manual Grading!</span>
      <span>Limited Randomness!</span>
    </div>
  </div>
</div>

<p class="rs-takeaway">
  Tag defects and review work; do not repair question behavior in the metadata
  pass.
</p>

Note:
The existing tagging skill is the design reference for this upcoming pass. It assigns exactly one difficulty, adds every applicable answer class, applies operational warnings based on behavior, normalizes titles, and maintains the tag catalogs. It also marks broken questions or future consolidation work without crossing back into implementation.

--- <!-- .slide: class="pqp-slide pqp-boundaries" -->

## Each pass has a hard boundary

| Pass              | Trusted input                   | Required output                            | Proof before handoff                                                       |
| ----------------- | ------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `generate-fixed`  | Source problem and known answer | Complete fixed PrairieLearn bundle         | Renders; known automatic answers earn full credit; person reviews fidelity |
| `randomize-fixed` | Approved fixed question         | Controlled family plus difficulty analysis | Same reasoning; ≥15 distinct tasks; domain and lifecycle checks pass       |
| `tag-fixed`       | Stable question behavior        | Tags, normalized titles, and catalogs      | JSON and catalogs validate; warnings match observed behavior               |

<p class="rs-takeaway">
  A later pass may flag an earlier defect, but it does not silently absorb the
  earlier pass's job.
</p>

Note:
These boundaries are the operational definition of the pipeline. They let us rerun one pass without reopening every design decision. They also make review findings actionable: if tagging discovers a grading defect, it marks Broken and returns the question to the appropriate earlier workflow.

--- <!-- .slide: class="pqp-slide" -->

## What remains to build

<div class="pqp-next-grid rs-numbered">
  <div class="rs-card number">
    <strong>Implement <code>tag-fixed</code></strong>
    <p>
      Adapt the existing tagging workflow to this course and its assessment
      order.
    </p>
  </div>
  <div class="rs-card number">
    <strong>Consume the handoff</strong>
    <p>
      Require the third pass to read <code>difficulty-analysis.md</code> when it
      exists.
    </p>
  </div>
  <div class="rs-card number">
    <strong>Unify the threshold</strong>
    <p>Resolve five versus fifteen variants; use one definition everywhere.</p>
  </div>
  <div class="rs-card number">
    <strong>Bootstrap the catalog</strong>
    <p>Create LV102's tag inventory and register course-level warnings.</p>
  </div>
  <div class="rs-card number">
    <strong>Align the names</strong>
    <p>
      Either rename the drafting skill or document that it is the implementation
      of <code>generate-fixed</code>.
    </p>
  </div>
</div>

Note:
The randomization skill uses fifteen distinct tasks as the Limited Randomness threshold. The older tagging workflow and a Calc I catalog use five. The new pipeline should resolve that before tag-fixed is run. LV102 also does not yet have the tags.md catalog assumed by the tagging workflow.

--- <!-- .slide: class="rs-center pqp-slide pqp-close" -->

## One uncertainty per pass

<div class="pqp-close-line">
  <span><strong>Correct?</strong><small>generate-fixed</small></span>
  <i aria-hidden="true">→</i>
  <span><strong>Consistent?</strong><small>randomize-fixed</small></span>
  <i aria-hidden="true">→</i>
  <span><strong>Findable?</strong><small>tag-fixed</small></span>
</div>

<p class="rs-lede">
  Next checkpoint: pilot <code>tag-fixed</code> on the randomized Chapter 4
  bank.
</p>

Note:
The result is not just more questions. It is a bank whose correctness, variety, and metadata have separate evidence trails. Chapter 4 is ready to become the first end-to-end demonstration once the third skill is defined.

--- <!-- .slide: class="rs-center pqp-slide" -->

## Appendix

<p class="rs-lede">Specialized randomization and structural patterns</p>

Note:
The following slides are optional. Use them when the audience wants implementation details about graphs or repeated answer structures.

+++ <!-- .slide: class="pqp-slide" -->

## Graphs take a specialist path

<div class="pqp-graph-route">
  <div class="rs-card">
    <strong>randomize-fixed</strong
    ><span>Detect that the supplied graph must vary.</span>
  </div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card secondary">
    <strong>randomize-pl-sketch-graphs</strong
    ><span
      >Control functions, bounds, endpoints, and interval answers
      together.</span
    >
  </div>
</div>

<div class="pqp-placeholder pqp-graph-placeholder">
  <strong>Graph visual placeholder</strong>
  <span
    >Fixed source figure → two read-only <code>pl-sketch</code> variants</span
  >
</div>

<p class="rs-takeaway">
  The sketch remains read-only and ungraded; every visible feature and affected
  answer comes from the same sampled values.
</p>

Note:
The graph skill was updated alongside the pipeline. It now uses plutil.rand, preserves the read-only and zero-weight sketch contract, treats each endpoint as a separate drawing, and checks graph bounds and interval inclusivity. Replace the placeholder with one fixed source image and two generated sketches.

+++ <!-- .slide: class="pqp-slide" -->

## Randomization can strengthen structure too

<div class="rs-grid cols-2 pqp-patterns">
  <div class="rs-card">
    <small>Question 4.15</small>
    <strong>Repeated answer rows</strong>
    <p>
      Python supplies row labels and answer names; one semantic HTML table
      preserves accessible headers and flat answer keys.
    </p>
  </div>
  <div class="rs-card secondary">
    <small>Question 4.21</small>
    <strong>Variant-backed choices</strong>
    <p>
      Python supplies structured option lists; explicit cards and prompts remain
      authored in HTML.
    </p>
  </div>
</div>

<p class="rs-takeaway">
  Generate repeated data, not the question's semantic structure.
</p>

Note:
These two examples show a secondary benefit of the randomization pass. Repeated data moves into structured parameters, while meaningful cards, prompts, labels, and answer elements stay explicit in HTML. The result is less duplication without making the rendered question opaque to reviewers.
