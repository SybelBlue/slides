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
    <li><pre>:+</pre></li>
    <li class="bold"><pre>{ puts 'hi' }</pre></li>
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
## Routes, Actions, MVC & Rails

<br>

*adapted from Adam Lew Dong's slides -- thanks Adam!*
<!-- .element: class="citation" -->

--- <!-- .slide: data-auto-animate -->

## Routes & Actions
<hr>

*ready, players?*

+++ <!-- .slide: data-auto-animate -->

### Routes
*what are the verbs?*
- show me box a
<!-- .element: class="fragment" -->
- set box a to have name = Jane and color = blue
<!-- .element: class="fragment" -->
- update box a to have name = Nell
<!-- .element: class="fragment" -->
- make a box with name = Tina and color = red
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### Routes

*what are the __routes__?*
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

*what are the __routes__?*
- show me box a
- **GET** `/box/a`
- set box a to have name = Jane and color = blue
- **PUT** `/box/a`
- update box a to have name = Nell
- **PATCH** `/box/a`
- make a box with name = Tina and color = red
- **POST** `/box`

+++ <!-- .slide: data-auto-animate -->
### Actions

*what are the `Box` controller __actions__?*
- show me box a
- **GET** `/box/a`
- set box a to have name = Jane and color = blue
- **PUT** `/box/a`
- update box a to have name = Nell
- **PATCH** `/box/a`
- make a box with name = Tina and color = red
- **POST** `/box`

+++ <!-- .slide: data-auto-animate -->
### Actions

*what are the `Box` controller __actions__?*
- show me box a
- **GET** `/box/a` $\Rightarrow$ `Box#show`
- set box a to have name = Jane and color = blue
- **PUT** `/box/a` $\Rightarrow$ `Box#update`
- update box a to have name = Nell
- **PATCH** `/box/a` $\Rightarrow$ `Box#update`
- make a box with name = Tina and color = red
- **POST** `/box` $\Rightarrow$ `Box#create`
+++ <!-- .slide: data-auto-animate -->

### Actions

*these correspond to these actions*
- create
- show
- update

*but oftentimes, users need forms/views to <br> make a valid request...*
<!-- .element: class="fragment" -->

*...this means we need actions to provide those forms!*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### Actions

*so these are our "CRUDI" actions:*

- *new*
- create
- *index*
- show
- *edit*
- update
- destroy


--- <!-- .slide: data-auto-animate -->

## MVC
<hr>

*maybe the single most important concept all course.*

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

```elm [|8-19|22-29|32-43|46-52]
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

*what does this look like?*

+++ <!-- .slide: data-auto-animate -->

### MVC in Elm

*what would change:*

>  Model? &nbsp; View? &nbsp; Controller? &nbsp; Msg?
<!-- .element: class="wide" -->

*where would logic for preventing $count < 0$ go?*

*how about restyling buttons conditionally?*
<!-- .element: class="fragment" -->

*what about setting the text field directly?*
<!-- .element: class="fragment" -->
+++ <!-- .slide: data-auto-animate -->

### MVC in Elm


*but serena, \*technically,\* elm is MVU not MVC.*

``` elm [5]
main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , update = controller
        , view = view
        }
```

true! in elm, nothing is mutable, apps are small, and everything is frontend, <br> so elm doesn't care too much about "view over-reach".
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### MVC in Elm

*why demo elm then? look at our types:*

``` elm
type Msg
    = Increment
    | Decrement

type alias Model =
  { count : Int }

view : Model -> Html Msg

controller : Msg -> (Model -> Model)
```

- `model` is like our db schemas
- `view` displays info nicely w/o complex logic
- `controller` has business logic, <br> responds to requests

--- <!-- .slide: data-auto-animate -->

### Recap on Rails
<hr>

*remember our golden rule: <br> everything in ruby is ~~objects~~ message passing*

+++ <!-- .slide: data-auto-animate -->

### Recap on Rails

Rails is a *server-side* framework

- it routes http requests to app code
- it generates basic scripts and views
- it operates as an "RDBMS"

*more to come on all of this*

+++ <!-- .slide: data-auto-animate -->

### Recap on Rails

Rails has **strong** opinions

- convention, always.
- enforced, mostly.
- checked... never.

*so resist the urge to defy the system*

+++ <!-- .slide: data-auto-animate -->

### Recap on Rails

Rails has **strong** opinions

- file structure is all based in MVC
- routing and resources follow REST
- the `rails g` command is /powerful/

*over time, rails has grown to include: <br> auth, migrations, versioning...*

+++ <!-- .slide: data-auto-animate -->

### Recap on Rails

*over time, rails has grown to include: <br> auth, migrations, versioning...*

<img src="img/everything-the-body-needs.gif" class="r-stretch" alt="matrix meme">

Note: everything a healthy production app needs

--- <!-- .slide: data-auto-animate -->

### Rails MVC
<hr>

*so how do we actually use rails?*

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*not arcane magic, mostly...*
> every model class is secretly a db table
<!-- .element: class="wide" -->

> every table is made & edited by migrations
<!-- .element: class="wide" -->

*and, you guessed it,*
<!-- .element: class="small" -->

> every migration is a generated class
<!-- .element: class="wide" -->

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*let's see an example then*

before we can see data or control data, <br> we need a place to put it.
<!-- .element: class="fragment" -->

*we start with a migration*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*we start with a migration*

``` sh
$ rails generate model Movie name:string rating:string ...
invoke active_record
create db/migrate/YYYYMMDDHHMMSS_create_movies.rb
create app/models/movie.rb
create app/controllers/movie.rb
...
```

+++ <!-- .slide: data-auto-animate -->

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
*db/migrate/[timestamp]_create_movies.rb*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*the generated model is pretty sparse*

``` rb
class Movie < ApplicationRecord::Base
end
```
*app/models/movie.rb*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*actions are controller instance methods*

``` rb
class MovieController < ApplicationController
  def index
    # ...
  end

  def show
    # ...
  end

  # ...
end
```
*app/controllers/movie.rb*
<!-- .element: class="small" -->

*challenge: what is the http request for show?*
<!-- .element: class="fragment" -->
Note: `GET /movie/id`

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*controller instance variables passed to the view*

``` rb [|3]
class MovieController < ApplicationController
  def index
    @movies = Movie.all
  end

  # ...
end
```
*app/controllers/movie.rb*
<!-- .element: class="small" -->

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*meanwhile, in movie's `index.html.erb`...*
``` erb [4|4-10|5-9||6-8]
<h1> Movies </h1>

<div id="movie-list">
  <% @movies.each do |movie| %>
    <div>
      <a href="/movies/<%= movie.id %>">
        <strong><%= movie.name %></strong> (<%= movie.year %>)
      </a>
    </div>
  <% end %>
</div>
```
*app/views/movie/index.html.erb*
<!-- .element: class="small" -->

*what http request is issued by link clicks?*
<!-- .element: class="fragment" -->

Note: the same http request as before!

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*what http request is issued by link clicks?*

> `GET /movies/{id}`


+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*what happens when the link is pressed?*

> `GET /movies/{id}`

*...which in turn calls what controller action?*

> `MovieController#show`
<!-- .element: class="fragment good" -->

+++ <!-- .slide: data-auto-animate -->

### Rails MVC

*`GET /movies/{id}` $\Rightarrow$ `MovieController#show`*
``` rb [1,6-9|3,7-8|6-9]
class MovieController < ApplicationController
  def index
    @movies = Movie.all
  end

  def show
    requested_id = params[:id]
    @movie = Movie.find(requested_id)
  end

  # ...
end
```
*app/controllers/movie.rb*
<!-- .element: class="small" -->

*`params` is based off the request!*

Note: `params` is set by the router, and there are standard

+++ <!-- .slide: data-auto-animate -->

### Rails MVC
*`MovieController#show` $\Rightarrow$ `show.html.erb`*
``` erb
<h1> <%= @movie.name %> </h1>

Year: <%= @movie.year %>
Rating: <%= @movie.rating %>

<a href="/movies">Back to Movies List</a>
```
*app/views/movie/show.html.erb*
<!-- .element: class="small" -->

--- <!-- .slide: data-auto-animate -->

### Rails Quiz Review
<hr>

*a small collection of resources*

+++ <!-- .slide: data-auto-animate -->

### Rails Quiz Review

*for our quizzes every week...*

I wrote [the Quiz Review DevBowl](https://docs.google.com/document/d/1GXMtZDx9enOno-2Bh1RekjcRb_TunAArXr58mVsk158/edit?usp=drive_link)


<img src="img/devbowl-qr.png" alt="overview" class="r-stretch">

+++ <!-- .slide: data-auto-animate -->

### Rails Quiz Review

*for our quiz next week...*

**I recommend looking at [the old slides](https://docs.google.com/presentation/d/1WYa5wl3pCU6DgsMRtKmnugs2oOKY9YsibQ8SQMh-_N0/edit?usp=sharing)**

*plenty of juicy ActiveRecord details, good quiz review*

+++ <!-- .slide: data-auto-animate -->

### Rails Quiz Review

*for all course content, slowly but surely...*

**I *highly* recommend [the rails tutorial](https://guides.rubyonrails.org/getting_started.html)**

*this is one of the most useful documents for rails, ever.*

*btw don't mind the up-to-date version, <br> it's a better tutorial with nearly identical skills*
<!-- .element: class="citation" -->


### Cool-down Questions

1. Why did the number parsing/validation belong in the controller and not the view?
2. BLANK is to `#new`, as `#update` is to `#create`?
3. What is one way to specify the columns of a table?
