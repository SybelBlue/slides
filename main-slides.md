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

### Agenda
- 10min: Warm-Ups
- 25min: SaaS Architecture Lecture
  - 15min: Optional Review
  - 10min: HTTP Requests + Idempotence
- 20min: *Tip Your Server* Game
- 05min: Cooldown

--- <!-- .slide: data-auto-animate -->

## Software Patterns

*a quick recap*

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

--- <!-- .slide: data-auto-animate -->

## Web Infrastructure

*an informal quiz!*

+++ <!-- .slide: data-auto-animate -->

### 100,000ft Overview

![10000ft overview](img/overview.png)

Note:
We're focusing on the top today!

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

just defines *ip addresses + ports* <br>
or *"where does this packet go?"*

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

+++ <!-- .slide: data-auto-animate -->

### Basic Web Stack

> HTTP
<!-- .element: class="wide good" -->

> TCP
<!-- .element: class="wide" -->

> IP
<!-- .element: class="wide bad" -->


--- <!-- .slide: data-auto-animate -->

## RESTful APIs

*a quick recap*

+++ <!-- .slide: data-auto-animate -->

### Representational State Transfer (REST)

*a philosophy for organizing your API*

- all manipulable entities are **resources**
- there are only so many **actions** on a resource, <br> mapped to unique Verb+URI combos
- URI's must specify **all info needed** to identify a resource and perform an action

+++ <!-- .slide: data-auto-animate -->

### REST Example & Counter

![example table](img/rest-example.png)

*the RESTful site needs the user id!*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### REST & Rails

Rails *assumes REST* as a convention!

*Controller Methods* become *Actions* (Verb+URI pairs)!

+++ <!-- .slide: data-auto-animate -->

### REST & Rails

![restful routes table](img/restful-routes.png)

*careful: `#new` is not `#create`, and `#edit` is not `#update`*
<!-- .element: class="small" -->

--- <!-- .slide: data-auto-animate -->

## HTTP

*now we get to the new stuff*

+++ <!-- .slide: data-auto-animate -->

### HTTP Request
![request question](img/request-trimmed.png)
<!-- .element: class="taper-fade" -->

Note: ask what the parts are
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

note: these all need an id to identify a target resource

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

Note: (*) is for non-standard verbs, UPDATE we will never really talk about again
+++ <!-- .slide: data-auto-animate -->

### Example Use

*get a listing of repos:*
> `GET https://github.com/orgs/cs169/repos`
<!-- .element: class="monospace wide small" -->
*what non-standard verb might we use here?*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### Example Use

*create a repo:*
> `POST https://github.com/cs169/new-app`
<!-- .element: class="monospace wide small" -->

+++ <!-- .slide: data-auto-animate -->

### Example Use

*push to a repo's branch:*
> `PUT https://github.com/cs169/new-app/tree/new-branch`
<!-- .element: class="monospace wide small" -->
*challenge: what might the payload be?*
<!-- .element: class="small" -->

Note: answer: the commit data! maybe a json, maybe a blob, doesn't matter, it's up to the API!

+++ <!-- .slide: data-auto-animate -->

some of these methods <br> are said to be *Idempotent* or have

### Idempotence

+++ <!-- .slide: data-auto-animate -->

### Idempotence

$$\text{Idem}(f) \Longleftrightarrow \forall x \in \text{Dom}(f), f(f(x)) = f(x)$$

*someone translate to english please...*

<!-- $$\frac{\forall \Gamma, a. (\Gamma \vdash f(\vec{a}) \Downarrow v, \Gamma' \implies \Gamma' \vdash f(\vec{a}) \Downarrow v, \Gamma')}{f \text{ idempotent}} \mathrm{[Idem_{Def}]}$$ -->

+++ <!-- .slide: data-auto-animate -->

### Idempotence

$$\text{Idem}(f) \Longleftrightarrow \forall x \in \text{Dom}(f), f(f(x)) = f(x)$$
<!-- .element: class="small" -->

A function $f$ is idempotent when <br>
calling $f$ **the first time *may* have an effect**, <br>
but calling it **the second time never will!**

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

by convention, almost all verbs are idempotent

**Idempotent:**
> GET, PUT, PATCH, DELETE, INDEX*
<!-- .element: class="wide" -->

**not a standard verb*
<!-- .element: class="small" -->

**Not Idempotent:**
> POST
<!-- .element: class="wide bad" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

**Idempotent:**
> GET, ..., INDEX
<!-- .element: class="wide" -->

*why does it make sense that these verbs are idempotent?*

**viewing should not change any state/cause effects!**
<!-- .element: class="fragment fade-in small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

**Not Idempotent:**
> POST
<!-- .element: class="wide bad" -->

*why does it make sense that POST is not?*

**POST makes new stuff!**
<!-- .element: class="fragment fade-in small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Methods (Verbs)

**Idempotent:**
> UPDATE, PATCH
<!-- .element: class="wide" -->

*what about these?*

**consider the effect of setting a name to "Chani" twice...**
<!-- .element: class="fragment fade-in small" -->

+++ <!-- .slide: data-auto-animate -->

### HTTP Request/Response Example

*in CHIPS you will see:*
<!-- .element: class="small" -->

![sample response](img/response-example.png)

--- <!-- .slide: data-auto-animate -->

## Tip Your Server!

you and a partner will race to complete request:
- one of you is the gateway:
  - determine the verb in use!
- one of you is the server:
  - manage the database in the spreadsheet
  - give a response code!

mistakes will be tallied, and scores compared!

+++ <!-- .slide: data-auto-animate -->

## Tip Your Server!

[![student-facing game sheet](img/game-qr.png)](https://docs.google.com/spreadsheets/d/1YLO1aPtJADLYCEdNV1cmA96QgGc9cuaUcx6-f1rmsrk/edit?usp=sharing)

or access via https://tinyurl.com/cs169a-dis-3

*also in the student materials drive*
<!-- .element: class="small" -->
--- <!-- .slide: data-auto-animate -->

### Cooldown/Practice Questions

- Does design sketching on a whiteboard use of Architecture Patterns or Design Patterns or both?
- What are some peer-to-peer apps that failed? Why? How about client-server?
- In real world RESTful APIs, sometimes non-resource operations are required (e.g. triggering a process like sending users an email). Which http method is best for this? Why?
- We've talked a lot about request but not their payloads. Can you give a few examples of a payload for a request or anresponse?
