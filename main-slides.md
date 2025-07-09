<!-- .slide: data-auto-animate -->

### Warm-Up Rounds
<div class="col-container">
<div class="col text-left small" style="margin-right: 20px">
  Which of the following would interpolate an attribute from an instance variable set in an `ApplicationController`?
  <ol style="list-style-type: upper-alpha">
    <li><%= product.name %></li>
    <li><% @product.name do |n| n.to_s %></li>
    <li><%= @product.name %></li>
  </ol>

  Which of these development methodologies does not include an extensive planning phase?
  <ol style="list-style-type: upper-alpha">
  <li>Waterfall</li>
  <li>Spiral</li>
  <li>Agile</li>
  </ol>
</div>
<div class="col text-left small">
  Which productivity principle does `attr_accessor :name` exemplify best?
  <ol style="list-style-type: upper-alpha">
    <li>Synthesis</li>
    <li>Reuse</li>
    <li>Automation via Tools</li>
  </ol>

  Which best implements the action corresponding to `GET /posts/:id/`?
  <ol style="list-style-type: upper-alpha">
    <li>@post = Posts.find_by id: params[:id]</li>
    <li>@post = Posts.create! id: params[:id]</li>
    <li>@post = Posts.find_by id: @id</li>
  </ol>
</div>
</div>

+++ <!-- .slide: data-auto-animate -->

### Warm-Up Rounds
<div class="col-container">
<div class="col text-left small" style="margin-right: 20px">
  Which of the following would interpolate an attribute from an instance variable set in an `ApplicationController`?
  <ol style="list-style-type: upper-alpha">
    <li><%= product.name %></li>
    <li><% @product.name do |n| n.to_s %></li>
    <li class="bold"><%= @product.name %></li>
  </ol>

  Which of these development methodologies does not include an extensive planning phase?
  <ol style="list-style-type: upper-alpha">
  <li>Waterfall</li>
  <li>Spiral</li>
  <li class="bold">Agile</li>
  </ol>
</div>
<div class="col text-left small">
  Which productivity principle does `attr_accessor :name` exemplify best?
  <ol style="list-style-type: upper-alpha">
    <li class="bold">Synthesis</li>
    <li>Reuse</li>
    <li>Automation via Tools</li>
  </ol>

  Which best implements the action corresponding to `GET /posts/:id/`?
  <ol style="list-style-type: upper-alpha">
    <li class="bold">@post = Posts.find_by id: params[:id]</li>
    <li>@post = Posts.create! id: params[:id]</li>
    <li>@post = Posts.find_by id: @id</li>
  </ol>
</div>
</div>

--- <!-- .slide: data-auto-animate -->
# Module 5 Discussion
<!-- .element: class="r-fit-text" -->
## Review & Rails Tutorial

--- <!-- .slide: data-auto-animate -->

## Basic MVC & Routes

+++ <!-- .slide: data-auto-animate -->
### Routes

*what are the verbs, routes, and action?*
- show me box a
- set box a to have name = Jane and color = blue
- update box a to have name = Nell
- make a box with name = Tina and color = red

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

--- <!-- .slide: data-auto-animate -->

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

```rb [|4-6||]
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
class Movie < ApplicationController
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

---

## Worksheet:

*get into pairs and...*
<!-- .element: class="small" -->

### [Build Your Own Rails Cheatsheet](https://docs.google.com/document/d/1TgAf2FyoZprK0CIOMgX5jPHstHKDMERpERtIpWxTTuU/edit?usp=sharing)

---

## Cooldown Questions

1. Why do we use `bin/rails` and not just `rails` on the CLI?
2. What are the steps to add a "stock" tracker and indicator to the Product class and display it to end users?
3. What filetype would be output by `erb "meta.rb.erb"`?
