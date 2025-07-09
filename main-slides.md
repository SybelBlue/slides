<!-- .slide: data-auto-animate -->

### Warm-Up Rounds
<div class="col-container">
<div class="col text-left small" style="margin-right: 20px">
  Which of these is a block?
  <ol style="list-style-type: upper-alpha">
    <li><pre>:+</pre></li>
    <li><pre>{ puts 'hi' }</pre></li>
    <li><pre>get '/products', to: 'products#index'</pre></li>
  </ol>

  Which of the following are true of internet protocols?
  <ol style="list-style-type: upper-alpha">
  <li>TCP requires content to be XML</li>
  <li>IP address are made of 4 bytes</li>
  <li>Rails is the standard for displaying webpages</li>
  </ol>
</div>
<div class="col text-left small">
  Why is POST the right verb for triggering a behavior?
  <ol style="list-style-type: upper-alpha">
    <li>GET is used to get results</li>
    <li>POST is the only non-idempotent verb</li>
    <li>RUN is a non-standard verb, so it's unused</li>
  </ol>

  Which of the following are defining features of RESTful APIs?
  <ol style="list-style-type: upper-alpha">
    <li>allowing only functionally-pure operations</li>
    <li>use of only idempotent actions</li>
    <li>fully-specifying behaviors in one route</li>
  </ol>
</div>
</div>

+++ <!-- .slide: data-auto-animate -->

### Warm-Up Rounds
<div class="col-container">
<div class="col text-left small" style="margin-right: 20px">
  Which of these is a block?
  <ol style="list-style-type: upper-alpha">
    <li class="bold"><pre>:+</pre></li>
    <li><pre>{ puts 'hi' }</pre></li>
    <li><pre>get '/products', to: 'products#index'</pre></li>
  </ol>

  Which of the following are true of internet protocols?
  <ol style="list-style-type: upper-alpha">
  <li>TCP requires content to be XML</li>
  <li class="bold">IP address are made of 4 bytes</li>
  <li>Rails is the standard for displaying webpages</li>
  </ol>
</div>
<div class="col text-left small">
  Why is POST the right verb for triggering a behavior?
  <ol style="list-style-type: upper-alpha">
    <li>GET is used to get results</li>
    <li class="bold">POST is the only non-idempotent verb</li>
    <li>RUN is a non-standard verb, so it's unused</li>
  </ol>

  Which of the following are defining features of RESTful APIs?
  <ol style="list-style-type: upper-alpha">
    <li>allowing only functionally-pure operations</li>
    <li>use of only idempotent actions</li>
    <li class="bold">fully-specifying behaviors in one route</li>
  </ol>
</div>
</div>


--- <!-- .slide: data-auto-animate -->
# Module 4 Discussion
<!-- .element: class="r-fit-text" -->
## Routes, MVC & Rails

<br>

*adapted from Adam Lew Dong's slides -- thanks Adam!*
<!-- .element: class="citation" -->

--- <!-- .slide: data-auto-animate -->

## Basic MVC & Routes

+++ <!-- .slide: data-auto-animate -->
### Routes
*what are the verbs?*
- show me box a
- set box a to have name = Jane and color = blue
- update box a to have name = Nell
- make a box with name = Tina and color = red

--- <!-- .slide: data-auto-animate -->
### Routes

*what are the __routes__?*
<!-- .element: class="fragment" -->

- show me box a
- **GET**
- set box a to have name = Jane and color = blue
- **PUT**
- update box a to have name = Nell
- **PATCH**
- make a box with name = Tina and color = red
- **POST**

+++ <!-- .slide: data-auto-animate -->
### Routes

- show me box a
- **GET** `/box/a`
- set box a to have name = Jane and color = blue
- **PUT** `/box/a`
- update box a to have name = Nell
- **PATCH** `/box/a`
- make a box with name = Tina and color = red
- **POST** `/box`

+++ <!-- .slide: data-auto-animate -->

### Controller Actions

- create
- update
- show
- destroy

+++ <!-- .slide: data-auto-animate -->

### Controller Actions

- new
- create
- edit
- update
- index
- show
- destroy

+++ <!-- .slide: data-auto-animate -->
###  Actions

- show me box a
- **GET** `/box/a` `Box#show`
- set box a to have name = Jane and color = blue
- **PUT** `/box/a` `Box#create`
- update box a to have name = Nell
- **PATCH** `/box/a` `Box#update`
- make a box with name = Tina and color = red
- **POST** `/box` `Box#update`

+++ <!-- .slide: data-auto-animate -->


## MVC

<img src="img/overview.png" alt="overview" class="r-stretch">

*reminder: we are here (2.5)*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->
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

![elm logo](img/elm-logo.png)


+++ <!-- .slide: data-auto-animate -->
### MVC in Elm

``` [|8-19|22-29|32-43|46-52] elm
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

+++ <!-- .slide: data-auto-animate -->

### MVC in Elm

*where would the logic for preventing $\texttt{count} < 0$ go?*

*how about for restyling the buttons conditionally?*

*what would change first if we added a "name" field?*

--- <!-- .slide: data-auto-animate -->

## MVC in Rails

*rails takes everything one step futher*

+++<!-- .slide: data-auto-animate -->

**read the [old slides](https://docs.google.com/presentation/d/1fmLlyMBdEDRBC-eN4Sphf4o9VkqjwnuTO0VAuv2P_0k/edit?usp=sharing) for all your quiz content!**

+++<!-- .slide: data-auto-animate -->

### Recap on Rails

Rails is a server-side framework
  - It routes HTTP requests to app code
  - It generates basic scripts
  - It operates as a RDBMS! (more to come)

+++<!-- .slide: data-auto-animate -->

### Recap on Rails

Rails is a server-side framework

Rails has __strong__ opinions
  - Convention, always. Enforced, sometimes.
  - Structured around MVC and REST
  - Grown to include everything a healthy prod needs

+++<!-- .slide: data-auto-animate -->

### Rails MVC

*not black magic, mostly*

> every model class is secretly a table
<!-- .element: class="wide" -->

> every table is made/editted by a migration
<!-- .element: class="wide" -->

*and you guessed it, a migration is a class*
<!-- .element: class="small" -->

+++

### Rails MVC

*we start with a migration*

```sh
$ rails generate model Movie name:string rating:string ...
```

```txt
invoke  active_record
create    db/migrate/20240426151900_create_movies.rb
create    app/models/movie.rb
...
```

+++

### Rails MVC

*we start with a migration*

```rb [|3|4-6|8|]
class CreateMovies < ActiveRecord::Migration[8.0]
  def change
    create_table :movies do |t|
      t.string 'name'
      t.string 'rating'
      t.datetime 'release_date'

      t.timestamps
    end
  end
end
```


+++

### Rails MVC

*then our model `app/models/movie.rb` is sparse:*

```rb
class Movie < ApplicationRecord::Base
end
```



+++

### Rails MVC

*`actions` are instance methods on the controller...*

```rb
class Movie < ApplicationController
  # our actions go here
  def index
    # ...
  end

  def show
    # ...
  end

  #...
end
```

+++

### Rails MVC

*...and controller instance vars become available to linked views*
```rb
class Movie < ApplicationRecord::Base
  def index
    @products = Movie.all
  end
end
```

+++

### Rails MVC

*meanwhile in `index.html.erb`...*

```index.html.erb [|4|4-10|]
<h1>Products</h1>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <a href="/products/<%= product.id %>">
        <%= product.name %>
      </a>
    </div>
  <% end %>
</div>
```

+++

### Rails MVC

I **highly** recommend going through the rails getting started tutorial!

---

## Worksheet

---

## Cooldown Questions

1. Why did the number parsing/validation logic belong in the elm controller and not the view?
2. BLANK is to `new` as `update` is to `create`?
3. What is one way to specify the columns of a table?
