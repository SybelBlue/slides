<!-- .slide: data-auto-animate -->
## introductions

Note:

--- <!-- .slide: data-auto-animate -->

## computing is an art

Note:Did you know that the founders of computing believed that programming, and computing at large, was too artistic to allow for scientific research?

+++ <!-- .slide: data-auto-animate -->

## computing is an art

<img style="width: 80%; height: 80%" src="data/acm%20excerpt.png" alt="acm exercpt">

[ACM publication policies and plans. Journal of the ACM 6 (Apr. 1959)]
<!-- .element: class="citation" -->

Note: It’s true - in one of the earliest issues of the most prestigious journals in all of computer science, there was an official policy statement that called for programming to be codified into less of an artform. That was the fifties. We’ve come a long way in developing our understanding of science and art. Today, we know that science and art are not mutually exclusive.

+++ <!-- .slide: data-auto-animate -->

## computing is an art

> programmers who subconsciously view themselves
> as artists will enjoy what they do and
> will **do it better**.
<!-- .element: class="fragment good" data-fragment-index="1" -->

-- Donald Knuth, Author of "The Art of Programming"
<!-- .element: class="fragment citation" data-fragment-index="1" -->

Note: Though some disagree with me, I believe that there is value in letting disciplines be practiced both as arts and sciences. There is a quote by a giant in the field that I think about all the time, “Programmers who subconsciously view themselves as artists will enjoy what they do and will do it better.” If joy and improvement are not good motivations to embrace computing as an art, I don’t know what is.

--- <!-- .slide: data-auto-animate -->

## computing is an art

Note: In this talk, I want to add to this conversation around computing as an artform.

+++ <!-- .slide: data-auto-animate -->

## computing is an art
## of making meaning

Note: Specifically, I claim that computing is the art of making meaning. I can feel some philosophers in the room bristling; this is not my intent, in fact, I need your help in a moment - but first an outline of the talk.

--- <!-- .slide: data-auto-animate -->

#### outline

<hr>

## of making meaning
<!-- .element: class="fragment" -->

#### interlude
<!-- .element: class="fragment" -->

## computing is an art
## of making meaning

#### epilogue
<!-- .element: class="fragment" -->

#### bonus rounds!
<!-- .element: class="fragment" -->

Note:

--- <!-- .slide: data-auto-animate -->

## of making meaning

### abstractions
<!-- .element: class="fragment" -->

### abstraction blindness
<!-- .element: class="fragment" -->

[What Computers Do, Doing With Computers: <br>
a philosophical field guide to computing in the world - Rawn 2023]
<!-- .element: class="fragment citation" data-fragment-index="1" -->

Note: We need to define what it is to “make meaning.” To do so, I will be drawing upon the centuries old philosophical school called “rationalism.” One of my fellow HCI researchers, Eric Rawn, wrote a fantastic queer history of rationalism, and I will be leaning on it in this section. One final note - I wrote this section to be discipline-agnostic. No matter your interests, if you will be making or interpreting meaning, I hope this section will be of use to you.

So, how do we make meaning in rationalism?

+++ <!-- .slide: data-auto-animate -->

### abstractions

> The Way™️ of representing some <br>
> behavior in a particular context

we build up big abstractions using smaller ones
<!-- .element: class="fragment" -->

Note: In good philosophical style, we start with a definition: an abstraction is The Way™ of representing some behavior within a particular context. We use abstractions to direct our attention and we compose them to make greater meaning out of smaller building blocks.

+++ <!-- .slide: data-auto-animate -->

### abstractions

good abstractions...
- mirror the structure of their context
<!-- .element: class="fragment" -->
- meaningfully limit actions in context
<!-- .element: class="fragment" -->

Note: Good abstractions mirror their context, a sort of form from function, and they meaningfully limit the space of actions within their context.

+++ <!-- .slide: data-auto-animate -->

### abstractions
#### good example: pac-man's joystick

![an image of pac-man](pacman.png)
![an image of joystick](joystick.png)

mirrors the top-down 2d world
<!-- .element: class="fragment" -->

limits to 4 directions
<!-- .element: class="fragment" -->

Note: Let’s have some examples of good abstractions - a couple different steering controls. Pac-Man uses a two axis joystick. This mirrors the 2-D grid-world that pac-man inhabits. The controls limit the realm of actions to Up/Down/Right/Left, all confined in a 2D plane.
+++ <!-- .slide: data-auto-animate -->

### abstractions
#### good example: steering wheel & pedals

mirror the...
- throttle
- brake
- wheel deflection

Note: Another example - a car’s steering wheel and pedals. They mirror the physical systems they control, the throttle, the brakes, the deflection of the front wheels.


+++ <!-- .slide: data-auto-animate -->

### abstractions
#### good example: steering wheel & pedals

imposes limits like...
- meaningful default: no gas, no brake
- maximum input: hard left, full stop
- no sudden changes in input
<!-- .element: class="fragment" -->
- good feedback: wheel turning itself
<!-- .element: class="fragment" -->

Note: They impose some clear limits: things like meaningful default positions, the maximum wheel deflection or acceleration, but they also provide subtle limits: they leverage how fast an individual can move to mitigate sudden changes - you wouldn’t want your tires to suddenly change direction, or engine to flood - and they provide intuitive tactile feedback, like the wheel pulling itself to center.

+++ <!-- .slide: data-auto-animate -->

### abstractions
#### evaluation

<img style="width: 60%; height: 60%;" src="data/wii-car.jpg" alt="wii controller in a car">

*context is key when evaluating abstractions*

Note: These are good abstractions, but note how terrible they would be if they switched context. Imagine steering a car with a joystick, or worse, Pac-Man with pedals. Their goodness is directly tied to their relationship with context. When it comes to designing and evaluating abstractions, context is key.

+++ <!-- .slide: data-auto-animate -->

## of making meaning

### abstractions

### abstraction blindness
<!-- .element: class="fragment" -->

*...directs your attention to places of interest*
<!-- .element: class="fragment" -->

Note: I want to formalize something we’ve been hinting at. The power and peril of abstraction is derived from something I will be calling abstraction blindness. It stems from the context and limitations we discussed, and it operates by directing your attention to places of interest.


--- <!-- .slide: data-auto-animate -->

### abstraction blindness

![an image of pac-man](pacman.png)
![an image of joystick](joystick.png)

*the joystick blinds us to relative direction <br> to highlight absolute direction*
<!-- .element: class="fragment" -->

Note: Let’s return to our examples. The Pac-Man’s joystick only concerns itself with the absolute direction Pac-Man moves. This may seem trivial at first, but consider that you are accustomed to an overhead view, and anyone who’s played a first-person game will know that getting the instruction “walk north, now east” from teammates is far harder to follow than “right, now right again.” The joystick blinds us to Pac-Man’s relative directions because they are useless in our third-person view - which is to say, the helpful blindness that the abstraction imposes aligns with what we would expect from context.


+++ <!-- .slide: data-auto-animate -->

### abstraction blindness

![an image of a car](car.png)

*the controls hide the complexity of the engine*
<!-- .element: class="fragment" -->

Note: Let’s address the car. The pedals and wheel all work independently. This mirrors the physical machine quite well, and hides all the complex mechanics from us - this is another helpful blindness. No driver wants to think about pumping the coolant or the exact flow rate of gas to the engine block.

+++ <!-- .slide: data-auto-animate -->

### abstraction blindness

![an image of a car](car.png)

the controls are independent, <br>
*but the underlying systems aren't!*
<!-- .element: class="fragment" -->

Note: Question - have you ever sat a four year old in a car? If you do, first make sure it’s off. The first thing they will likely do is depress both pedals at once. In the biz, we say that “the abstraction of pedals affords this interaction” - meaning the independent motion of the pedals make the child believe the systems are truly independent - but indeed if the car was on, this could do great damage both to the machine and the child. In this way, the blindness of “independent systems” can be both helpful and harmful in our interactions with the car.

+++ <!-- .slide: data-auto-animate -->

### abstraction blindness

![an image of a car](car.png)

*the controls only function in their context*
<!-- .element: class="fragment" -->

Note: Another question - have you ever tried slamming the gas when you’re two feet from a brick wall? I don’t recommend it. The abstraction that “gas means go” is blinding in its simplicity, a simplicity informed by the context that an adequate driver sits behind the wheel - so that’s my license revoked.


+++ <!-- .slide: data-auto-animate -->

### abstraction blindness

*directing attention is very powerful*

> we seek **helpful** blindness, but...
<!-- .element: class="fragment good" -->

> no escape from **harmful** blindness.
<!-- .element: class="fragment bad" -->

Note: In summary, we use abstraction because it blinds us to useless information, and highlights critical information. This selective attention is critically important - but in some situations, it directs our attention away from potentially harmful effects, particularly when used outside the context they are designed for.

+++ <!-- .slide: data-auto-animate -->

### abstraction blindness

good thinkers...

- understand each abstraction's blindness
<!-- .element: class="fragment" -->
- expect weird interactions between them
<!-- .element: class="fragment" -->
- study their context continually
<!-- .element: class="fragment" -->
- when in doubt, talk to a human
<!-- .element: class="fragment" -->

Note: Good thinkers pick abstractions and are mindful of their blindnesses. They take care to predict and check how their blindnesses compose - think again of pressing two pedals at once. Responsible thinkers continuously check that their abstractions are still well-suited to their contexts, and always double-check how their abstractions blind them to human harm.

--- <!-- .slide: data-auto-animate -->

#### interlude
<hr>

**multi-disciplinarity and abstraction**

wide study shows the history of our abstractions, <br>
and exposes us to new viewpoints
<!-- .element: class="fragment" -->

searching far and wide shows us <br> *how often our abstractions fail*
<!-- .element: class="fragment" -->

**this is why I love hci & cs education**
<!-- .element: class="fragment" -->

Note: An aside: this is why mutli-disciplinary study is so vital. By drawing from many studies, you get to see how our abstractions evolve and change. You are exposed to many different contexts and what kinds of abstractions are valuable in those contexts. And perhaps most importantly, it gives you a long history of the failures due to harmful blindness, failures you must try not to repeat. This is why I love CS Education, and HCI at large - it gives me the freedom to explore many disciplines and learn from many mistakes. It makes me a stronger thinker.


+++ <!-- .slide: data-auto-animate -->

## computing is an art

Note: To recap - computing has always been an art...

+++ <!-- .slide: data-auto-animate -->

## of making meaning

### abstractions

### abstraction blindness

Note: we use abstractions to make meaning.

--- <!-- .slide: data-auto-animate -->

## computing is the art
## of making meaning

<hr>

<div class="col-container fragment">
<div class="col">
  <blockquote class="wide bad">???</blockquote>
</div>
<div class="col">
  <blockquote class="wide">???</blockquote>
</div>
<div class="col">
  <blockquote class="wide good">???</blockquote>
</div>
</div>

Note: So what do I mean when I say “computing is an art of making meaning?” I mean that when we do computing, particularly when we are programming, there are three audiences for which the abstractions we design must be comprehensible.


+++ <!-- .slide: data-auto-animate -->

### audience one

> the computer
<!-- .element: class="bad" -->

- incredible abilities
<!-- .element: class="fragment" -->
- strict requirements
<!-- .element: class="fragment" -->
- a total time-sink
<!-- .element: class="fragment" -->

Note: The first audience is the computer itself. You will spend the most time in conversation with this audience, I promise you. The computer, as the custodian of the mechanical work we want done, has strict rules for what it is allowed to do, and you, as the author, must write programs that appease it.

+++ <!-- .slide: data-auto-animate -->

### audience two

> the user
<!-- .element: class="" -->

- use your work to shape the world
<!-- .element: class="fragment" -->
- artists in their own right
<!-- .element: class="fragment" -->
- the most overlooked
<!-- .element: class="fragment" -->

Note: The second audience are your users - they must be able to pick up and comprehend your abstractions, and use them to manipulate the world around them. In this capacity,  I like to say that you are a maker of instruments - a craftsperson who makes devices that are put to their own artistic ends. A huge concern in HCI is that we often spend too little time consulting our users, and too much consulting our machines.

+++ <!-- .slide: data-auto-animate -->

### audience three

> the developers and maintainers
<!-- .element: class="good" -->

*look, it's you!*

Note: The third audience is you - the developers or maintainers of the application. Not only do the abstractions exposed to the machine literally need to compute, and the abstractions exposed to the users need to be legible, but the abstractions that bind it all together need to make sense to those people with an inside view.

+++ <!-- .slide: data-auto-animate -->

### audience three

![an image of car engine](car_engine.png)

Note: Consider a car engine - it primarily interfaces with the outside world through the tires and gas tank, it interacts with the user through the clutch and gas pedals, and this is good - but it also must be sensible to the mechanics in the shop! The layout, the labeling, the documentation, all of it was designed to be in line with the expectations of these workers.

+++ <!-- .slide: data-auto-animate -->

### audience three

![an image of code](script.png)

Note: And unlike makers of physical machines, we programmers are unburdened by the terrible slowness of tangible reality. Our nuts and bolts are ideas and script, editable by simple keystroke. In order to make abstractions that are legible to the computer, the users, and ourselves, it takes a real skill, real art. We are charged with writing code that has not one, not two, but often three meanings, one for each audience, and unlike any other art, every audience must be appeased for your art piece to function.


+++ <!-- .slide: data-auto-animate -->

## computing is the art
## of making meaning

<hr>

<div class="col-container">
<div class="col">
  <blockquote class="wide bad">computer</blockquote>
</div>
<div class="col">
  <blockquote class="wide ">user</blockquote>
</div>
<div class="col">
  <blockquote class="wide good">developer</blockquote>
</div>
</div>

Note: What you need to understand is that all code is like this, and every computer runs on code. This means every computer is built upon unimaginably deep layers of abstraction, each with its own plurality of meanings. It is an art to navigate and write these abstractions, even more so when they fail or break down, as they so often do.


+++ <!-- .slide: data-auto-animate -->

## computing is the art
## of making meaning

Note: This is why I believe that computing is the art of making meaning.

--- <!-- .slide: data-auto-animate -->

#### epilogue

we build meaning from abstractions, but...
<!-- .element: class="fragment" -->

> with abstraction, comes blindness.
<!-- .element: class="wide fragment good" -->

<hr>

computing abstractions have three audiences, so...
<!-- .element: class="fragment" -->

> computing is the art of making meaning.
<!-- .element: class="wide fragment good" -->

Note: In conclusion, we build meaning out of abstraction. These abstractions come with their blindness, that’s why we use them, but if we are not careful to study our contexts and track our blindnesses, we can do great harm. In computing, our most powerful and ubiquitous tool is the abstraction, and it must be comprehensible to three audiences - the author, the user, and the machine. Therefore I claim that computing is the art of making meaning.

+++ <!-- .slide: data-auto-animate -->

#### epilogue

**where do I fit into all of this?**

all art has style, structure, and composition
<!-- .element: class="fragment" -->

computing has *so much* style
<!-- .element: class="fragment" -->

*I've spent my phd studying how to teach style*
<!-- .element: class="fragment" -->

Note: So where do I fit in to all of this? Well, this art, like all others, has style, structure and composition. But because of the demands of our audiences, the art of computing is unique in that it is characterized by a preponderance of style. These styles were developed as skilled people all over the world found idioms that appeased all three audiences simultaneously. In a very human way, we have built our computer languages with these idioms and styles. And it is the art of teaching style that I have spent my PhD studying, within the realm of HCI - bonus round topic!

+++ <!-- .slide: data-auto-animate -->

#### epilogue

**where do *you* fit into all of this?**

wherever you like!
<!-- .element: class="fragment" -->

**a round of applause for <br> the CS Kickstart '24 leaders**
<!-- .element: class="fragment" -->

Note: And where do you fit in to all this? Well, nowhere, if you like, or right here beside me, if you’d rather. I surveyed a lot of femme folk in preparation for this talk, both in and out of STEM. They said all kinds of things - but some particular anxieties kept surfacing. Those anxieties and their antidotes are more bonus round topics, but for now I feel the need to end my talk today with this.

*cs kickstart staff please help me, stand up for a moment

For generations, women in this field have worked to make it a more hospitable place. I wish I could tell you that this work is done, and the field is ready, or promise that you will not encounter hostile idiots with something to prove. What I can promise is this - the women standing up here, the CS Kickstart leaders and myself, take the ongoing work of making computing a home seriously, and we will support you if you call on us for help. And what’s more, research has shown that the best defense against hate of this kind is a community of peers, which means that the women sitting next to you are an even greater asset than the ones standing up here. Just by coming to CS Kickstart, you are already more prepared to succeed in this field in the face of any adversity that may arise. And for providing that gift of community, I want to give our CS Kickstart leaders a round of applause.

--- <!-- .slide: data-auto-animate -->

[bonus rounds, anyone?](https://docs.google.com/presentation/d/1XlGRr8MwTnJgvMHvZCDuMVAI1fFyFA1-nFge0DSgtSo/edit?usp=sharing)
<!-- .element: class="fragment" -->
