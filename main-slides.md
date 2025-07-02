<!-- .slide: data-auto-animate -->

### Warm-Up Rounds
<div class="col-container">
<div class="col text-left small" style="margin-right: 20px">
  What is a URI’s query string?
  <ol style="list-style-type: upper-alpha">
    <li>An optional “/” separated string after the hostname & port</li>
    <li>An optional list of key-value pairs starting with “?”</li>
    <li>An optional sql query for a resource in a header</li>
  </ol>

  Which of the following are true of internet protocols?
  <ol style="list-style-type: upper-alpha">
  <li>IP ensures packets are reliably sent</li>
  <li>HTTP defaults to port 443</li>
  <li>AJAX made loading small pieces of pages standard</li>
  </ol>
</div>
<div class="col text-left small">
  Which of the following are true of SOA?
  <ol style="list-style-type: upper-alpha">
    <li>It lets microservices fulfill multiple functions</li>
    <li>It comes at a performance cost</li>
    <li>It lets developers focus exclusively on development</li>
  </ol>

  Which of the following are defining features of RESTful APIs?
  <ol style="list-style-type: upper-alpha">
    <li>allowing only functionally-pure operations</li>
    <li>fully-specifying behaviors in one route</li>
    <li>use of only idempotent actions</li>
  </ol>
</div>
</div>


+++ <!-- .slide: data-auto-animate -->

### Warm-Up Rounds
<div class="col-container">
<div class="col text-left small" style="margin-right: 20px">
  What is a URI’s query string?
  <ol style="list-style-type: upper-alpha">
    <li>An optional “/” separated string after the hostname & port</li>
    <li class="bold">An optional list of key-value pairs starting with “?”</li>
    <li>An optional sql query for a resource in a header</li>
  </ol>

  Which of the following are true of internet protocols?
  <ol style="list-style-type: upper-alpha">
  <li>IP ensures packets are reliably sent</li>
  <li>HTTP defaults to port 443</li>
  <li class="bold">AJAX made loading small pieces of pages standard</li>
  </ol>
</div>
<div class="col text-left small">
  Which of the following are true of SOA?
  <ol style="list-style-type: upper-alpha">
    <li>It lets microservices fulfill multiple functions</li>
    <li class="bold">It comes at a performance cost</li>
    <li>It lets developers focus exclusively on development</li>
  </ol>

  Which of the following are defining features of RESTful APIs?
  <ol style="list-style-type: upper-alpha">
    <li>allowing only functionally-pure operations</li>
    <li class="bold">fully-specifying behaviors in one route</li>
    <li>use of only idempotent actions</li>
  </ol>
</div>
</div>


--- <!-- .slide: data-auto-animate -->

# Module 3 Discussion
<!-- .element: class="r-fit-text" -->
## SaaS Architecture

<br>

*adapted from Adam Lew Dong's slides -- thanks Adam!*
<!-- .element: class="citation" -->

+++ <!-- .slide: data-auto-animate -->

## Agenda
- 10min: Warm-Ups
- 25min: Lecture
  - 5min: Software Patterns
  - 5min: Web Infrastructure
  - 10min: HTTP
  - 5min: RESTful APIs
- 20min: *Tip Your Server* Game
- 05min: Cooldown

--- <!-- .slide: data-auto-animate -->

## Software Patterns

+++ <!-- .slide: data-auto-animate -->

<div class="col-container">
<div class="col">
<h3>Software <br> Design Pattern</h3>
a general architectural solution to a family of similar problems
</div>
<div class="col">
<h3>Software <br> Architecture Pattern</h3>
the ways subsystems are networked to meet design/func requirements
</div>
</div>

+++ <!-- .slide: data-auto-animate -->

### Patterns To Know

**Client-Server**

**Peer-to-Peer**

+++ <!-- .slide: data-auto-animate -->

**Client-Server**

> Client makes requests; <br>
> Server responds to requests

Pros:
- specialization
<!-- .element: class="fragment fade-in" -->
- cost-efficiency
<!-- .element: class="fragment fade-in" -->
- reusability
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

**Peer-to-Peer**

> All entities are both "clients" and "servers"

Pros:
- flexibility*
<!-- .element: class="fragment fade-in" -->
- reliability*
<!-- .element: class="fragment fade-in" -->

**the service has to be popular!*
<!-- .element: class="fragment fade-in" -->


+++ <!-- .slide: data-auto-animate -->

### 10,000ft Overview

![10000ft overview](img/overview.png)
<!-- .element: class="r-stretch" -->

Note:
We're focusing on the top today!


--- <!-- .slide: data-auto-animate -->

## Web Infrastructure

*in the old days, it was all static-site serving...*
<!-- .element: class="fragment" -->

*...but no longer.*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### Basic Web Stack

> HTTP
<!-- .element: class="wide good" -->

> TCP
<!-- .element: class="wide fragment" -->

> IP
<!-- .element: class="wide fragment bad" -->

+++ <!-- .slide: data-auto-animate -->

### Basic Web Stack

> IP
<!-- .element: class="wide bad" -->

just defines "ip addresses + ports": <br>
or "where does this packet go?"

IPs resolved through calls to a DNS!

no reliability, no acknowledgements

+++ <!-- .slide: data-auto-animate -->

### Basic Web Stack

> TCP
<!-- .element: class="wide" -->

gives us reliability and acknowledgement, <br>
or "makes sure the packet gets there"

no knowledge of content

+++ <!-- .slide: data-auto-animate -->

### Basic Web Stack

> HTTP
<!-- .element: class="wide good" -->

defines the standard for content transfer

also comes in a "Secure" version, aka "HTTPS"


--- <!-- .slide: data-auto-animate -->

## HTTP

+++ <!-- .slide: data-auto-animate -->

### HTTP Request
![request question](img/request-trimmed.png)
<!-- .element: class="taper-fade" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Request
![request answer](img/request.png)

*what are you least likely to encounter in a wild request?*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

- GET
<!-- .element: class="fragment fade-in" -->
- POST
<!-- .element: class="fragment fade-in" -->
- PUT
<!-- .element: class="fragment fade-in" -->
- PATCH
<!-- .element: class="fragment fade-in" -->
- DELETE
<!-- .element: class="fragment fade-in" -->
- INDEX*
<!-- .element: class="fragment fade-in" -->
- UPDATE*
<!-- .element: class="fragment fade-in" -->

**not a standard verb*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

- GET: show me one resource
- INDEX: list resources of a certain kind
- POST: make a new resource with data

*note: POST does not usually get to mint res. id's!*

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

- PUT: replace a resources's data (by id)
- PATCH: edit a resource's data (by id)
- DELETE: delete a resource (by id)

*note: these all need an id to identify a target res.!*

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

UPDATE:

it's a PATCH that may revolve around db ops, <br>
but it's so not-standard, basically never used

we're gonna ignore it from here on, <br>
just know it exists.
+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

- GET
- POST
- PUT
- PATCH
- DELETE
- INDEX*
- ~~*UPDATE**~~

+++ <!-- .slide: data-auto-animate -->

### Example Use

*get a listing of repos:*
> GET https://github.com/orgs/cs169/repos
<!-- .element: class="monospace wide" -->
*what non-standard verb might we use here?*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### Example Use

*create a repo:*
> POST https://github.com/cs169/new-app
<!-- .element: class="monospace wide" -->

+++ <!-- .slide: data-auto-animate -->

### Example Use

*push to a repo's branch:*
> PUT https://github.com/cs169/new-app/tree/new-branch
<!-- .element: class="monospace wide" -->
*what might the payload be?*
<!-- .element: class="small" -->


+++ <!-- .slide: data-auto-animate -->

### Idempotence

$$\text{Idem}(f) \Longleftrightarrow \forall x \in \text{Dom}(f), f(f(x)) = f(x)$$

*someone translate to english please...*

+++ <!-- .slide: data-auto-animate -->

### Idempotence

For a function $f$, <br>
calling $f$ once *may* have an effect, <br>
calling it **twice in a row** never will!

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

by convention, almost all verbs are idempotent

**Idempotent:**
> GET, PUT, PATCH, DELETE, INDEX*
<!-- .element: class="wide" -->

**Not Idempotent:**
> POST
<!-- .element: class="wide bad" -->

**not a standard verb*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

**Idempotent:**
> GET, ..., INDEX
<!-- .element: class="wide" -->

*why does it make sense that the selected verbs are idempotent?*
<!-- .element: class="fragment fade-in" -->

**viewing should not change any state/cause effects!**
<!-- .element: class="fragment fade-in small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

**Not Idempotent:**
> POST
<!-- .element: class="wide bad" -->

*why does it make sense that POST is not?*
<!-- .element: class="fragment fade-in" -->

**POST makes new stuff!**
<!-- .element: class="fragment fade-in small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Request/Response Example

![sample response](img/response-example.png)

--- <!-- .slide: data-auto-animate -->

## RESTful APIs

*specify a full action in one request*

+++ <!-- .slide: data-auto-animate -->

### Representational State Transfer (REST)

*a philosophy for organizing your API*

- all manipulable entities are **resources**
- there are only so many **action** on a resource <br> mapped to unique Verb+URI combos
- URI's must specify all info needed to identify a resource and perform an action

+++

### REST Example & Counter

![example table](img/rest-example.png)

+++

### REST & Rails

Rails *assumes REST* as a convention!

This means Controller methods become actions (Verb+URI pairs)!

+++

### REST & Rails

![restful routes table](img/restful-routes.png)

---

## Tip Your Server!

- you and a partner will race to complete request
- one of you is the router:
  - determine the verb in use!
- one of you is the database:
  - manage the stored data in the spreadsheet
  - give a response code!
- mistakes will be tallied, and scores compared!

+++

## Tip Your Server!

[![student-facing game sheet](img/game-qr.png)](https://docs.google.com/spreadsheets/d/1YLO1aPtJADLYCEdNV1cmA96QgGc9cuaUcx6-f1rmsrk/edit?usp=sharing)

*also in the student materials drive*
