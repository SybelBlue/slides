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
  - .ide-config/
    <!-- .element: class="fragment highlight-current-blue" -->
    - cloned-pl-config/...
      <!-- .element: class="directory" -->
  - elements/
    <!-- .element: class="fragment highlight-current-blue" -->
    - external-element/...
      <!-- .element: class="directory" -->
  - serverFilesCourse/
    <!-- .element: class="fragment highlight-current-blue" -->
    - external-library/...
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
- comes with built-in version syncing/checking
- configured through uv's pyproject.toml

```sh
$ uv add --dev pl-vendor
Added 1 package
```

+++
<!-- .slide: data-auto-animate -->

### using `pl-vendor`

- course/
  - .ide-config/
    - cloned-pl-config/...
      <!-- .element: class="directory" -->
  - elements/
    - external-element/...
      <!-- .element: class="directory" -->
  - serverFilesCourse/
    - external-library/...
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
[tool.pl-vendor.external-library]
# TODO: fill me out
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
[tool.pl-vendor.external-element]
# TODO: fill me out
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

```sh
$ uv run pl-vendor require-latest cloned-pl-config
Package cloned-pl-config has no vendored changes
```
