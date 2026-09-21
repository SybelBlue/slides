<!-- .slide: class="rs-center plv-title" -->

## Why our courses need `pl-vendor`

<p class="rs-citation">content development internal workflow</p>

Note:
Mariana's starting point is right: a course developer can clone a course and run PrairieLearn locally. This talk explains the extra work created when several courses share components maintained in separate repositories. The decision at the end is about continued internal use in the calculus courses.

---

### A self-contained course needs no extra tool

<div class="rs-grid cols-2 plv-compare">
  <div class="rs-card">
    <strong>One course, its own files</strong>
    <p>Clone the course. Run PrairieLearn locally. Sync the course repository when ready.</p>
  </div>
  <div class="rs-card secondary">
    <strong>Shared source across courses</strong>
    <p>Across Calc 1 and Calc 2, we reuse externally maintained components.</p>
  </div>
</div>

<p class="rs-takeaway">The extra problem is maintaining the same external source in multiple course repositories.</p>

Note:
Answer Mariana's “Why don't I need this?” question directly. She does not need pl-vendor for an ordinary course whose content is authored and maintained in that course repository. Running the course in Docker is still the workflow for both kinds of course. The tool matters only when a course team wants to reuse and maintain files from another repository, such as pl-equation-input or plutil.

---

### What we need in each course

<div class="plv-paths">
  <div class="plv-path-row">
    <code>pl-sum-notation-input</code>
    <span class="plv-arrow" aria-hidden="true">→</span>
    <code>elements/pl-sum-notation-input/</code>
  </div>
  <div class="plv-path-row">
    <code>pl-equation-input</code>
    <span class="plv-arrow" aria-hidden="true">→</span>
    <code>elements/pl-equation-input/</code>
  </div>
  <div class="plv-path-row">
    <code>plutil</code>
    <span class="plv-arrow" aria-hidden="true">→</span>
    <code>serverFilesCourse/plutil/</code>
  </div>
  <div class="plv-path-row">
    <span><code>prairielearn-schemas</code><small>PrairieLearn: apps/prairielearn/src/schemas/schemas/</small></span>
    <span class="plv-arrow" aria-hidden="true">→</span>
    <code>.prairielearn/schemas/</code>
  </div>
</div>

<p class="rs-takeaway">Each course repository holds both runtime content and dev-only schemas.</p>

Note:
These are real Calc 2 destinations, and the shared equation element is also used in Calc 1. A course-specific element lives under elements; shared Python helper code can live under serverFilesCourse. The schema example selects only apps/prairielearn/src/schemas/schemas from the PrairieLearn Git repository and copies it to .prairielearn/schemas for development validation. These copied files are ordinary tracked files. The schemas are not a runtime package and do not need to execute when students use the course.

+++

### Critically, we need to *vendor* files

PL requires that files are tracked by the course repo, and no other

Hence, *vendor*: track external files in our local VC w/o the original git metadata for PL

---

### Copying once is easy(-ish); maintaining copies is not.

<div class="rs-grid cols-3 plv-steps">
  <div class="rs-card"><b>1</b><strong>Place files</strong><p>Put each upstream component in the right course path.</p></div>
  <div class="rs-card secondary"><b>2</b><strong>Record a revision</strong><p>Know which upstream commit each copy came from.</p></div>
  <div class="rs-card rs-inverted"><b>3</b><strong>Update and check</strong><p>Advance deliberately and catch accidental changes in CI.</p></div>
</div>

<p class="rs-takeaway">We had been rebuilding this Git and CI workflow with course-specific scripts.</p>

Note:
The motivation is repeatability, not that any one copy command is difficult. Without a shared tool, each new course needs scripts for fetching, placing, version tracking, and CI checks. Those scripts had to be maintained and debugged separately. Copying by hand also obscures where the files came from and whether a later update is intentional. Big Operator is one reason this problem will persist for a while: it may eventually be included in PrairieLearn core, but it is still a course element today.

---

### The file lifecycle

<div class="rs-workflow plv-flow">
  <div class="rs-card step"><small>Sources</small><strong>Upstream Git repos</strong><span>Shared elements and helpers</span></div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card step secondary"><small>Dev + CI</small><strong>Run <br/> pl-vendor</strong><span>Sync, update, and verify imported materials</span></div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card step"><small>Course Git repo</small><strong>Commit vendored files</strong><span>Add to local tracking for PL</span></div>
  <i class="arrow" aria-hidden="true"></i>
  <div class="rs-card step primary"><small>Course use</small><strong>PrairieLearn</strong><span>Execute and share course content</span></div>
</div>

Note:
This diagram follows the runtime-content path. The vendored element and helper files are committed to the calculus course repository and available when PrairieLearn syncs that course; the vendored PrairieLearn schemas instead support local and CI validation. pl-vendor runs on a developer's machine and in CI, not as part of a student request or PrairieLearn course execution. A person receiving the course gets the checked-in files. They do not have to run pl-vendor to use the course as delivered; they need it only if they intend to maintain or update those upstream copies.

---

### Three distinct dependency jobs

<div class="rs-grid cols-3 plv-boundary">
  <div class="rs-card"><small>Local development</small><strong><code>uv</code></strong><p>Installs python dev dependencies like <code>pyright, pl-vendor</code>.</p></div>
  <div class="rs-card secondary"><small>Source vendoring</small><strong><code>pl-vendor</code></strong><p>Copies upstream source into course paths and records the exact revision.</p></div>
  <div class="rs-card"><small>Question execution</small><strong>PrairieLearn runtime</strong><p>Executes course elements and helper files in its configured environment.</p></div>
</div>

<p class="rs-takeaway"><code>pl-vendor</code> is never deployed to runtime; it's a dependency manager only.</p>

Note:
The same pyproject.toml happens to hold two different kinds of configuration: uv's development dependency on the CLI, and [tool.pl-vendor] entries describing source directories to copy. Neither makes the CLI a runtime dependency. Vendored Python helper code may itself be imported by question code at runtime, but any third-party Python packages it imports must be available in the appropriate PrairieLearn question runtime, external grader, or workspace environment. Those environments have separate dependency rules.

---

### Calc 2: a branch in the manifest, a commit in the lockfile

<div class="plv-example">
  <p><code>pyproject.toml</code></p>
  <pre><code class="language-toml">[tool.pl-vendor.packages.pl-equation-input]
path = "elements/pl-equation-input"
url = "https://github.com/SybelBlue/pl-equation-input.git"
branch = "release"</code></pre>
  <p><code>plvendor-lock.yaml</code></p>
  <pre><code class="language-yaml">packages:
  pl-equation-input: 'c0972de200b2c32d10ccad68f346018a620e9f82'</code></pre>
</div>

<p class="rs-takeaway">The branch names the update source; the lockfile fixes the files used now.</p>

Note:
This example is from the current Calc 2 repository. The manifest says where to fetch the element, where to put it, and which branch to follow. The lockfile records the resolved Git commit. Tracking a branch does not mean a live course automatically changes when that branch moves. The copied files change only when a developer updates them and commits the result. The exact hash shown should be refreshed from Calc 2 if the deck is reused after that repository updates.

---
<!-- .slide: class="plv-commands" -->

### One workflow for updates and checks

| During development or CI | Effect |
| --- | --- |
| `pl-vendor sync` | Install the locked revision; refuse unexpected local edits. |
| `pl-vendor update` | Advance the branch package, lock its new revision, and replace its files. |
| `pl-vendor verify` | Check that committed files match the locked source. |
| `pl-vendor require-latest` | Check that the locked package revision is up-to-date. |

<p class="rs-takeaway">This pulls all dependency verification out of custom scripts in each course.</p>

Note:
The actual Calc 2 Makefile runs these commands with uv run --active. Its deps target installs local dependencies and then runs pl-vendor sync; its update targets call pl-vendor update for one package; its verify-vendored target calls pl-vendor verify, and CI invokes that target. A developer reviews and commits the changed manifest, lockfile, and copied files as appropriate. This is a development workflow, not a new step for students or instructors using the published course.

---

### A bounded internal tool while reuse evolves

<div class="rs-grid cols-2 plv-compare">
  <div class="rs-card"><strong>Today</strong><p>Use it for shared LearnVia source, including calculus repos and custom elements like <br/><code>pl-equation-input</code> and <code>plutil</code>.</p></div>
  <div class="rs-card"><strong>Later</strong><p><code>pl-big-operator-input</code> will move into PrairieLearn core. </p>
  <p>A marketplace may eventually provide a broader reuse workflow.</p></div>
</div>

<p class="rs-takeaway">Decision: approve continued internal use of <code>pl-vendor</code> in the calculus repositories.</p>

Note:
The requested approval is for this internal calculus workflow. It is not a request to make pl-vendor a PrairieLearn platform dependency or to recommend it to every course author. Moving Big Operator into core would remove one reason to vendor that element, but it would not automatically remove the need to maintain other shared components. A future marketplace may offer a different solution; this tool addresses the existing course-file workflow now.

---

<!-- .slide: class="rs-center" -->

### Appendix: distribution and ownership

Note:
Use the following slides only if questions about availability, ownership, or cost arise. They are separate from the explanation of why the calculus courses use the tool.

+++

### Source repository

![Private GitHub repository listing](decks/pl-vendor/gh.png)
<!-- .element: class="r-stretch" -->

<p class="rs-citation">Private source; no formal tie to PrairieLearn core.</p>

Note:
The source repository is private. The internal use decision does not require changing PrairieLearn core or its release process.

+++

### Package distribution

![PyPI package listing](decks/pl-vendor/pypi.png)
<!-- .element: class="r-stretch" -->

<p class="rs-citation">The development command is distributed through PyPI.</p>

Note:
PyPI distributes the pl-vendor command to developers and CI. This should not be confused with PrairieLearn installing a package when it runs a course. Removing the package from distribution would affect reproducible developer and CI setup, not the already committed course files.

+++

### Development cost

- Developed on personal time.
- The most effective technical solution excluded direct AI use.
- Continued distribution supports reproducible setup and CI checks.

Note:
This context may be relevant to the approval discussion, but it is not the technical reason the tool exists. The core case is the repeated maintenance of shared source across course repositories.
