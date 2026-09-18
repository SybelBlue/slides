<!-- .slide: class="marketplace marketplace-title" data-background-color="#f4f7f2" -->

<p class="mp-kicker">PrairieLearn · concept deck</p>

# A marketplace for learning infrastructure

<p class="mp-lede">Reusable educational content should be as easy to adopt as a package—and as stable as a pinned dependency.</p>

<div class="mp-path"><span>Discover</span><i></i><span>Install</span><i></i><span>Pin</span><i></i><strong>Upgrade</strong></div>

Note:
A package registry and marketplace for educational software and content, not merely a sharing gallery.

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">01 · Why now</p>

## Sharing files is not an ecosystem

<div class="mp-split">
  <div><p class="mp-display">PrairieLearn content is already <em>reused.</em></p><p class="mp-muted">But copying and linking leave instructors choosing between isolation and uncontrolled change.</p></div>
  <div class="mp-stack"><div><strong>Copy</strong><span>Stable, but disconnected</span></div><div><strong>Link</strong><span>Connected, but unpredictable</span></div><div class="accent"><strong>Package</strong><span>Connected and versioned</span></div></div>
</div>

<p class="mp-takeaway">The opportunity: make reuse safe across courses, institutions, and semesters.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">02 · Three constituencies</p>

## One marketplace, three definitions of success

<div class="mp-cards mp-three">
  <article><span>01</span><h3>Instructors</h3><p>“Help me find trusted material and keep my course stable.”</p><ul><li>Fast discovery</li><li>Minimal setup</li><li>Predictable behavior</li></ul></article>
  <article><span>02</span><h3>Content authors</h3><p>“Help me release, maintain, and evolve my work.”</p><ul><li>Dependencies</li><li>Versions</li><li>Upgrade signals</li></ul></article>
  <article><span>03</span><h3>Researchers</h3><p>“Preserve credit and show where the work travels.”</p><ul><li>Provenance</li><li>Adoption</li><li>Durable authorship</li></ul></article>
</div>

Note:
These roles can overlap, but the system should not collapse their responsibilities into one generic owner role.

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">03 · Package types</p>

## The marketplace is bigger than questions

<div class="mp-artifacts">
  <div><b>Q</b><span>Questions</span></div><div><b>◇</b><span>Elements</span></div><div><b>{ }</b><span>Helper code</span></div>
  <div><b>▦</b><span>Datasets</span></div><div><b>⌘</b><span>Databases</span></div><div><b>▤</b><span>Course modules</span></div>
</div>

<p class="mp-takeaway">A package may be small, large, or composed from other packages.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">04 · Today’s OER model</p>

## Open by default has real strengths—and limits

<div class="mp-balance">
  <div><small>What works</small><h3>Publish a demo course</h3><ul><li>Open and inspectable</li><li>Easy to share publicly</li><li>Aligned with OER values</li></ul></div>
  <b>but</b>
  <div class="risk"><small>What breaks</small><h3>Expose all source</h3><ul><li>Answers and grading logic</li><li>No dependency lifecycle</li><li>No intentional upgrades</li></ul></div>
</div>

<p class="mp-caption">Openness, access, and assessment security need separate controls.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">05 · Existing sharing patterns</p>

## Copy vs. link is the wrong tradeoff

<div class="mp-compare">
  <article><h3>⧉ &nbsp; Copy</h3><strong>Stable and editable</strong><ul><li>Local control</li><li>No surprise changes</li></ul><hr><em>Relationship lost</em><ul><li>Fixes do not flow</li><li>Provenance drifts</li></ul></article>
  <article><h3>↗ &nbsp; Link</h3><strong>Connected upstream</strong><ul><li>Shared maintenance</li><li>Updates can flow</li></ul><hr><em>Behavior can drift</em><ul><li>Changes arrive live</li><li>Terms are not reproducible</li></ul></article>
</div>

<p class="mp-equation"><strong>Package</strong> = connection + version boundary</p>

--- <!-- .slide: class="marketplace marketplace-dark" data-background-color="#172b2d" -->

<p class="mp-kicker">06 · The package model</p>

## Reuse should be intentional at every step

<div class="mp-process"><div><span>1</span><strong>Discover</strong><small>Find trusted work</small></div><i>→</i><div><span>2</span><strong>Install</strong><small>Add it to a course</small></div><i>→</i><div><span>3</span><strong>Pin</strong><small>Freeze the version</small></div><i>→</i><div><span>4</span><strong>Upgrade</strong><small>Move when ready</small></div></div>

<blockquote class="mp-quote">Nothing changes in a live course until an instructor chooses it.</blockquote>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">07 · Versions and dependencies</p>

## Make the invisible graph explicit

<div class="mp-deps">
  <div class="root"><small>Problem bank</small><strong>Physics 101</strong><code>v2.4.1</code></div><i>→</i>
  <div class="mp-dep-stack"><div><small>Element</small><strong>Vector input</strong><code>^3.2</code></div><div><small>Library</small><strong>Unit helpers</strong><code>1.8.x</code></div><div><small>Dataset</small><strong>Constants</strong><code>2026.1</code></div></div><i>→</i>
  <div><small>Runtime</small><strong>Python helper</strong><code>^5.0</code></div>
</div>

<div class="mp-chips"><span>Resolve conflicts</span><span>Track transitive dependencies</span><span>Lock exact versions</span></div>

Note:
Package publication should have a CI gate for question functioning. At minimum, every question should generate, render, and grade successfully using the package's declared dependency versions and supported PrairieLearn versions. The marketplace should record which versions passed so compatibility claims are evidence-based rather than self-reported.

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">08 · First-class roles</p>

## Authorship is not maintainership

<div class="mp-roles">
  <div class="mp-role-grid"><div><b>Author</b><span>created it</span></div><div><b>Maintainer</b><span>keeps it working</span></div><div><b>Publisher</b><span>can release it</span></div><div><b>Consumer</b><span>uses it</span></div></div>
  <aside><span>≠</span><p>Adopting content does not make an instructor responsible for its future.</p></aside>
</div>

<p class="mp-takeaway">Replace “owner” with explicit relationships that can change independently.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">09 · Research and provenance</p>

## Let contribution outlive responsibility

<div class="mp-provenance">
  <div class="mp-timeline"><div><span>2024</span><strong>Research team authors package</strong><small>Credit begins</small></div><div><span>2026</span><strong>Department adopts it</strong><small>Usage becomes visible</small></div><div><span>2028</span><strong>Community takes maintenance</strong><small>Responsibility transfers</small></div></div>
  <aside><p><strong>38</strong> active courses</p><p><strong>12</strong> institutions</p><p><strong>7</strong> derived packages</p></aside>
</div>

<p class="mp-caption">Illustrative metrics · reporting must respect institutional and instructor privacy.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">10 · Authentication and source protection</p>

## “Open” does not have to mean “all visible to everyone”

<div class="mp-access"><div><span>01</span><strong>Public metadata</strong><small>Description · authors · versions</small></div><div><span>02</span><strong>Public source</strong><small>OER content · examples · docs</small></div><div><span>03</span><strong>Instructor access</strong><small>Answers · grading · generation logic</small></div><div><span>04</span><strong>Restricted</strong><small>Institution · organization · private</small></div></div>

<p class="mp-takeaway">Who can discover, inspect, install, and run each package?</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">11 · PrairieLearn-native workflow</p>

## Meet instructors where they already work

<div class="mp-window">
  <div class="bar">● ● ● <span>Course · Marketplace</span></div>
  <div class="body"><nav><b>My course</b><span>Questions</span><span>Assessments</span><strong>Marketplace</strong><span>Dependencies</span></nav><main><div class="search">⌕ &nbsp; Search questions, elements, datasets…</div><div class="result"><b>∿</b><p><small>QUESTION COLLECTION</small><strong>Signals &amp; Systems</strong><span>PrairieLearn Community · v3.6.0</span></p><button>Preview</button><button>Add to course</button></div><div class="flow">Choose version &nbsp; → &nbsp; Resolve dependencies &nbsp; → &nbsp; Record in manifest</div></main></div>
</div>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">12 · Models to learn from</p>

## Borrow mature patterns—not entire products

<div class="mp-models">
  <article><b>VS</b><h3>VS Code Marketplace</h3><p>Discovery and trust</p><ul><li>Publisher identity</li><li>Compatibility metadata</li><li>Version history</li></ul></article>
  <i>+</i>
  <article><b class="npm">npm</b><h3>npm / pnpm</h3><p>Dependency lifecycle</p><ul><li>Package manifests</li><li>Version constraints</li><li>Lockfiles</li></ul></article>
  <i>→</i>
  <aside><strong>Adapt for education</strong><span>Pedagogy · provenance · privacy · assessment security</span></aside>
</div>

--- <!-- .slide: class="marketplace marketplace-dark" data-background-color="#172b2d" -->

<p class="mp-kicker">13 · Core requirements</p>

## The foundation, at a glance

<div class="mp-requirements"><div>01<strong>Versioned packages</strong></div><div>02<strong>Explicit dependencies</strong></div><div>03<strong>Reproducible installs</strong></div><div>04<strong>Intentional upgrades</strong></div><div>05<strong>Durable provenance</strong></div><div>06<strong>Separate roles</strong></div><div>07<strong>Usage signals</strong></div><div>08<strong>Access control</strong></div></div>

<p class="mp-final">Stable for instructors. Sustainable for maintainers. Visible for authors.</p>

Note:
Add continuous validation to the release requirements. A question package should not be marked ready—or publish a new version—unless CI confirms that its questions generate valid variants, render without errors, and grade representative correct and incorrect submissions. CI should run against locked dependencies and every supported PrairieLearn version, then rerun for dependency updates and release candidates.

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">14 · Discussion</p>

## The decisions we need to make together

<div class="mp-questions"><div>01 <span>What is the <strong>package boundary?</strong></span></div><div>02 <span>What counts as a <strong>breaking change?</strong></span></div><div>03 <span>How do <strong>local modifications</strong> work?</span></div><div>04 <span>Which source stays <strong>public?</strong></span></div><div>05 <span>Who may <strong>publish and maintain?</strong></span></div><div>06 <span>Which adoption data is <strong>appropriate to share?</strong></span></div></div>

<blockquote class="mp-quote mp-quote--light">How do we make reuse feel effortless <em>without making responsibility ambiguous?</em></blockquote>
