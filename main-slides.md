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

# Module 4 Discussion
<!-- .element: class="r-fit-text" -->
## MVC & Rails

<br>

*adapted from Adam Lew Dong's slides -- thanks Adam!*
<!-- .element: class="citation" -->

--- <!-- .slide: data-auto-animate -->

## MVC

<div class="col-container">
<div class="col">
  <h4>Model</h4>

  all about the data:
  storage, representation
</div>
<div class="col">
  <h4>View</h4>

  the way we display data <br>
  (user-facing UI)
</div>
<div class="col">
  <h4>Controller</h4>

  how we handle UI events and <br>
  deliver data to renderer
</div>
</div>

*your app will have many MVCs!*

+++ <!-- .slide: data-auto-animate -->

### MVC in Elm

**don't memorize syntax, look for patterns!**

+++ <!-- .slide: data-auto-animate -->

``` elm
module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Events exposing (onClick)


type alias Model =
    { count : Int }


init : Model
init =
    { count = 10 }


type Msg
    = Increment
    | Decrement


controller : Msg -> Model -> Model
controller msg model =
    case msg of
        Increment ->
            { count = model.count + 1 }

        Decrement ->
            { count = model.count - 1 }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Your Number is:" ]
        , div []
            [ button [ onClick Decrement ] [ text "-" ]
            , span [] [ text "  " ]
            , em [] [ text (String.fromInt model.count) ]
            , span [] [ text "  " ]
            , button [ onClick Increment ] [ text "+" ]
            ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , update = controller
        , view = view
        }

```
