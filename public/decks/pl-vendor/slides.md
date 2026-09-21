<!-- .slide: class="rs-center" -->

## pl-vendor in calculus

a temporary solution to vending course files

Note:
Add speaker notes here.

---
<!-- .slide: data-auto-animate -->

### the problem

- courses depend on external *libraries*
<!-- .element: class="fragment fade-in" -->
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
<!-- .element: class="fragment rs-bad rs-small rs-center" -->
- some libraries must be current to unversioned branches
<!-- .element: class="rs-small" -->
> write helper scripts to enforce syncing
<!-- .element: class="fragment rs-bad rs-small rs-center" -->

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
