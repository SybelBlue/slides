<!-- .slide: class="rs-center" -->

## pl-vendor in calculus

a temporary solution to vending course files

Note:
Add speaker notes here.

---
<!-- .slide: data-auto-animate -->

### the problem

*many files need vending*
<!-- .element: class="rs-small" -->

- course/
  - serverFilesCourse/
    <!-- .element: class="fragment highlight-current-blue" -->
    - external-library/...
      <!-- .element: class="directory" -->
  - elements/
    <!-- .element: class="fragment highlight-current-blue" -->
    - external-element/...
      <!-- .element: class="directory" -->
  - .ide-config/
    <!-- .element: class="fragment highlight-current-blue" -->
    - cloned-pl-config/...
      <!-- .element: class="directory" -->

<!-- .element: class="rs-filetree" -->

+++
<!-- .slide: data-auto-animate -->

### the problem

- courses depend on external *libraries*
- all tools exposed to pl cannot be git submodules
<!-- .element: class="fragment fade-in" -->
- some libraries must be current to unversioned branches
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

### the current "solution"

- courses depend on external *libraries*
<!-- .element: class="rs-small" -->
> copy course content over
<!-- .element: class="fragment fade-in rs-small rs-center" -->
- all tools exposed to pl cannot be git submodules
<!-- .element: class="rs-small" -->
> remove tracking
<!-- .element: class="fragment fade-in rs-small rs-center" -->
- some libraries must be current to unversioned branches
<!-- .element: class="rs-small" -->
> write helper scripts to enforce syncing
<!-- .element: class="fragment fade-in rs-small rs-center" -->

+++
<!-- .slide: data-auto-animate -->

### the current "solution"

- courses depend on external *libraries*
<!-- .element: class="rs-small" -->
> copy course content over
<!-- .element: class="rs-small rs-center" -->
- all tools exposed to pl cannot be git submodules
<!-- .element: class="rs-small" -->
> remove tracking
<!-- .element: class="rs-bad rs-small rs-center" -->
- some libraries must be current to unversioned branches
<!-- .element: class="rs-small" -->
> write helper scripts to enforce syncing
<!-- .element: class="rs-bad rs-small rs-center" -->

+++
<!-- .slide: data-auto-animate -->

### the future solution

in time, this will likely be handled by <br/> `pl-marketplace`*

for now, we need a better solution.

*\*name pending*
<!-- .element: class="rs-citation" -->

---

*the new solution*
<!-- .element: class="rs-lede" -->
### `pl-vendor`

- cleanly installs any git tracked directory
<!-- .element: class="fragment fade-in" -->
- comes with built-in version syncing/checking
<!-- .element: class="fragment fade-in" -->
- configured through uv's pyproject.toml
<!-- .element: class="fragment fade-in" -->

```sh
$ uv add --dev pl-vendor
Added 1 package
$ uv run pl-vendor init
```
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

### using `pl-vendor`

- course/
  - serverFilesCourse/
    - external-library/...
      <!-- .element: class="directory" -->
  - elements/
    - external-element/...
      <!-- .element: class="directory" -->
  - .ide-config/
    - cloned-pl-config/...
      <!-- .element: class="directory" -->

<!-- .element: class="rs-filetree" -->

+++
<!-- .slide: data-auto-animate -->

### using `pl-vendor`

*this needs standard dependency tracking*

- course/
  - serverFilesCourse/
    - external-library/...
      <!-- .element: class="directory" -->

<!-- .element: class="rs-filetree" -->

```toml
[tool.pl-vendor.packages.external-library]
path = "serverFilesCourse/external-library"
url = "https://example.org/external-library.git"
```

+++
<!-- .slide: data-auto-animate -->

### using `pl-vendor`

*this needs pinning*

- course/
  - elements/
    - external-element/...
      <!-- .element: class="directory" -->

<!-- .element: class="rs-filetree" -->

```toml
[tool.pl-vendor.packages.external-element]
path = "elements/external-element"
url = "https://example.org/external-element.git"
commit = "0123456789abcdef0123456789abcdef01234567"
```

+++
<!-- .slide: data-auto-animate -->

### using `pl-vendor`

*this needs to always be current with pl/master*

- course/
  - .ide-config/
    - cloned-pl-config/...
      <!-- .element: class="directory" -->

<!-- .element: class="rs-filetree" -->

```toml
[tool.pl-vendor.packages.cloned-pl-config]
path = ".ide-config/cloned-pl-config"
url = "https://github.com/PrairieLearn/PrairieLearn.git"
subdirectory = "apps/prairielearn/src/schemas/schemas"
branch = "us-prod-live"
```

```sh
$ uv run pl-vendor sync
$ uv run pl-vendor require-latest cloned-pl-config
Package cloned-pl-config has no vendored changes
```

---
<!-- .slide: data-auto-animate -->

### `pl-vendor` in prod

![private gh listing](public/decks/pl-vendor/gh.png)
<!-- .element: class="r-stretch" -->

*no formal ties to pl, private source*
<!-- .element: class="rs-center" -->

+++
<!-- .slide: data-auto-animate -->

### `pl-vendor` in prod

![pypi listing](public/decks/pl-vendor/pypi.png)
<!-- .element: class="r-stretch" -->

*still accessible through PyPI*
<!-- .element: class="rs-center" -->

+++
<!-- .slide: data-auto-animate -->

### `pl-vendor` in prod

calculus repos no longer contain bespoke logic

ci now performs faster, more reliable checks by delegating validation to pl-vendor's checker

+++
<!-- .slide: data-auto-animate -->

### using `pl-vendor`

externally developed elements also require pinned versions of other elements:

- pl-equation-input
- pl-sum-notation-input

---
<!-- .slide: data-auto-animate -->

### a note on cost

- this was developed on my own time
- the most effective technical solution excluded *direct* AI use
- the package can always be unlisted (with reproducibility/ci implications)

---
<!-- .slide: data-auto-animate -->

### questions?
