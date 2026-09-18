<!-- .slide: class="marketplace marketplace-title" data-background-color="#f4f7f2" -->

<p class="mp-kicker">PrairieLearn · internal discussion</p>

# Marketplace

<p class="mp-lede">Stable, versioned reuse of educational content and software.</p>

<div class="mp-path"><span>Discover</span><i></i><span>Install</span><i></i><span>Pin</span><i></i><strong>Upgrade</strong></div>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">The shift</p>

## Packages, not shared files

<div class="mp-artifacts">
  <div><b>Q</b><span>Questions</span></div>
  <div><b>◇</b><span>Elements</span></div>
  <div><b>{ }</b><span>Code</span></div>
  <div><b>▦</b><span>Data</span></div>
  <div><b>⌘</b><span>Databases</span></div>
  <div><b>▤</b><span>Modules</span></div>
</div>

<p class="mp-takeaway">The unit of reuse needs versions, dependencies, and provenance.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">The gap</p>

## Copy vs. link is the wrong tradeoff

<div class="mp-compare">
  <article><h3>⧉ &nbsp; Copy</h3><strong>Stable</strong><ul><li>Disconnected from fixes</li><li>Provenance drifts</li></ul></article>
  <article><h3>↗ &nbsp; Link</h3><strong>Connected</strong><ul><li>Changes arrive live</li><li>Terms are not reproducible</li></ul></article>
</div>

<p class="mp-equation"><strong>Package</strong> = connection + version boundary</p>

--- <!-- .slide: class="marketplace marketplace-dark" data-background-color="#172b2d" -->

<p class="mp-kicker">The model</p>

## Every change is intentional

<div class="mp-process"><div><span>1</span><strong>Discover</strong></div><i>→</i><div><span>2</span><strong>Install</strong></div><i>→</i><div><span>3</span><strong>Pin</strong></div><i>→</i><div><span>4</span><strong>Upgrade</strong></div></div>

<blockquote class="mp-quote">Nothing changes in a live course until an instructor chooses it.</blockquote>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">The contract</p>

## Dependencies are explicit—and tested

<div class="mp-deps">
  <div class="root"><small>Problem bank</small><strong>Physics 101</strong><code>v2.4.1</code></div><i>→</i>
  <div class="mp-dep-stack"><div><small>Element</small><strong>Vector input</strong><code>^3.2</code></div><div><small>Library</small><strong>Unit helpers</strong><code>1.8.x</code></div><div><small>Dataset</small><strong>Constants</strong><code>2026.1</code></div></div><i>→</i>
  <div><small>CI gate</small><strong>Generate · Render · Grade</strong><code>✓ passed</code></div>
</div>

<div class="mp-chips"><span>Locked dependencies</span><span>Supported PL versions</span><span>Release validation</span></div>

Note:
Publishing requires CI evidence that questions generate, render, and grade against locked dependencies and supported PrairieLearn versions.

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">The roles</p>

## Author ≠ maintainer ≠ publisher ≠ consumer

<div class="mp-roles">
  <div class="mp-role-grid"><div><b>Author</b><span>credit</span></div><div><b>Maintainer</b><span>responsibility</span></div><div><b>Publisher</b><span>release authority</span></div><div><b>Consumer</b><span>use</span></div></div>
  <aside><span>≠</span><p>Publishing a package does not create maintenance responsibility, but lack of maintenance is marked!</p></aside>
</div>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">The boundary</p>

## Open metadata; controlled source

<div class="mp-access"><div><span>01</span><strong>Metadata</strong><small>Public</small></div><div><span>02</span><strong>OER source</strong><small>Public</small></div><div><span>03</span><strong>Assessment source</strong><small>Instructor</small></div><div><span>04</span><strong>Private packages</strong><small>Restricted</small></div></div>

<p class="mp-takeaway">Discovery, inspection, installation, and execution may need different permissions.</p>

--- <!-- .slide: class="marketplace" -->

<p class="mp-kicker">Decisions</p>

## What do we need to settle first?

<div class="mp-questions">
  <div>01 <span><strong>Package boundary</strong></span></div>
  <div>02 <span><strong>Version semantics</strong></span></div>
  <div>03 <span><strong>Local modifications</strong></span></div>
  <div>04 <span><strong>Source visibility</strong></span></div>
  <div>05 <span><strong>Publishing authority</strong></span></div>
  <div>06 <span><strong>Usage data</strong></span></div>
</div>

<blockquote class="mp-quote mp-quote--light">Stable for instructors. Sustainable for maintainers. Visible for authors.</blockquote>
