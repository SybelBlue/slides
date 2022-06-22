# Primitives & Objects
*Thursday - 6/23*

---

## Agenda

- Intro Poll
- Lecture
- Lab

---

# Intro Poll!

---

Answers:

>`ls` lists a directory's contents
+++
Answers:

> Saving Overwrites Saves, Committing adds to the timeline of work in the git history, You write commits with the command line
+++
Answers:

> It is false that every class needs a `main` method.
+++
Answers:

> Only assigning reference types (non-primitives) creates a reference, ie
``` java
Potato spud = new Potato();
```

---

# Lecture!

---

## Primitives

The basic building blocks of program data.

+++

## Primitives

In Java there exactly 8...

``` txt [|1]
boolean  char  int    double
byte     long  short  float
```
<!-- .element: class="fragment fade-in" -->

You will only really use the top 4 <!-- .element: class="fragment fade-in" -->

+++

## `boolean`

*It is or it isn't! It's that simple!*

Values: `true` or `false`

+++

## `boolean`

``` java
boolean isEven = x % 2 == 0;
```
<!-- .element: class="fragment fade-in" -->

``` java
boolean isDangerous = geeseIds.contains(animalTagId);
```
<!-- .element: class="fragment fade-in" -->

+++

## `char`

*The `'a'` `'b'` `'c'`s of computing*

Values: any single character! emoji welcome!

+++

## `char`

``` java
char java = '☕';
```
<!-- .element: class="fragment fade-in" -->

``` java
String name = "Logan";
char firstLetter = name.charAt(0);
// firstLetter == 'L'
```
<!-- .element: class="fragment fade-in" -->

+++

## `int`

*The `123`s of computing*

Values: any round number (between ±2 billion).

+++

## `int`

``` java
int two = 4 * 3 / 2 + 1 - 5;
int two2 = Math.round(Math.PI / 2);
```
<!-- .element: class="fragment fade-in" -->

Note, `Math.pi` isn't an `int` it's a `double`! 
<!-- .element: class="fragment fade-in" -->

+++

## `double`

*A floating point number, but twice as precise*

Values: all the (best) numbers <br> between (±`1.7 * 10 ^ 308`)

+++

## `double`

``` java
double three = 3.0; // need the .0, or else int!
double circumfrence = 2.0 * Math.PI * r;
double gramsFlour = 850.0 * loavesOfBread;
```
<!-- .element: class="fragment fade-in" -->

Note that `loavesOfBread` may be an `int`, but `gramsOfFlour` is a `double` because we multiplied `850.0` 
<!-- .element: class="fragment fade-in" -->

+++

## Be Aware of `int` division!

``` java
System.out.println(4 * 3 / 2);
System.out.println(3 / 2 * 4);
```
<!-- .element: class="fragment fade-in" -->

``` txt
> 6
> 4
```
<!-- .element: class="fragment fade-in" -->


Why? Because dividing two integers in java does integer division <!-- .element: class="fragment fade-in" -->

(no remainders! always rounds down) <!-- .element: class="fragment fade-in" -->

``` java
3 / 2 * 4 =>        // PEMDAS
    (3 / 2) * 4 =>  // INT DIVIDE
    1       * 4 =>  // MULTIPLY
    4               
```
<!-- .element: class="fragment fade-in" -->

---

## Classes!

---

## Classes as...
> Containers
<!-- .element: class="fragment fade-in" -->
> Templates
<!-- .element: class="fragment fade-in" -->

---

## Classes as Containers

Think of the `Math` class:

- `Math.PI` <!-- .element: class="fragment fade-in" -->
- `Math.sin(x)` <!-- .element: class="fragment fade-in" -->
- `Math.max(a, b)`  <!-- .element: class="fragment fade-in" -->

Used as a container for all math functions and constants. 
<!-- .element: class="fragment fade-in" -->

+++

Detour to the [Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html) documentaiton...

Everything's `static`!
<!-- .element: class="fragment fade-in" -->

Why?
<!-- .element: class="fragment fade-in" -->

+++

Can you imagine the chaos if there were different instances of Math?

*And you thought learning one math was bad.*
<!-- .element: class="demph fragment fade-in" -->

<br>

The point here is that there is **one math for all uses**.
<!-- .element: class="demph fragment fade-in" -->

+++

### `static`

Marks something as unique within a class or universal for all uses.

Consider `main` methods: they must be unique
<!-- .element: class="demph fragment fade-in" -->

Consider `Math.PI`: pi is just pi, no 'instances' about it
<!-- .element: class="demph fragment fade-in" -->

Comparable to script level values/methods in Python
<!-- .element: class="demph fragment fade-in" -->

**Use with caution. Java runs on objects.**
<!-- .element: class="demph fragment fade-in" -->

---

## Classes as Templates

+++

### Let's create a `Person` class. 

Think of defining properties of a `Person`. 
<!-- .element: class="fragment fade-in" -->

- Age  <!-- .element: class="fragment fade-in" -->
- Name  <!-- .element: class="fragment fade-in" -->

+++

### Let's create a `Person` class. 

What are the kinds of these properties?

- Age
    
    **`int`** <!-- .element: class="fragment fade-in" -->

- Name
    
    **`String`** <!-- .element: class="fragment fade-in" -->

+++

### Let's create a `Person` class. 

``` java [|1]
public class Person {
    

}
```
<!-- .element: class="fragment fade-in" -->
Note: what is the name of the file?

+++

### Let's create a `Person` class. 

``` java [2]
public class Person {
    public int age;
    
}
```

+++

### Let's create a `Person` class. 

``` java [3]
public class Person {
    public int age;
    public String name;
}
```

`age` and `name` are called instance variables. 
<!-- .element: class="fragment fade-in" -->

each instance gets its own copy.
<!-- .element: class="fragment fade-in" -->

---

## We did it!

Now we can make instances of the `Person` class: 
<!-- .element: class="fragment fade-in" -->

``` java [|2|3-4|]
    public static void main(String[] args) {
        Person essun = new Person();
        essun.name = "Essun Orogene";
        essun.age = 42;
    }
```
<!-- .element: class="fragment fade-in" -->

We use the keyword `new` to create objects! 
<!-- .element: class="fragment fade-in" -->

---

## Interlude on Variable Shadowing

+++ 

``` python
def add(a, b):
    return a + b

print(add(2, 3))
```

+++

``` python [3-5|]
def add(a, b):
    return a + b

a = 4

print(add(2, 3))
```

+++

``` python [6|]
def add(a, b):
    return a + b

a = 4

print(add(a, 3))
```

+++

``` python [1,6|]
a = 4

def add(a, b):
    return a + b

print(add(2, 3))
```

+++

``` python [1-3|]
def add(a, b):
    a = 4
    return a + b

print(add(2, 3))
```

This is called shadowing! 
<!-- .element: class="fragment fade-in" -->

+++

``` python
a = 4 # this is shadowed

def add(a, b):  # this 'a' in scope for return
    return a + b
```

---

## Problem

This is annoying: 
<!-- .element: class="fragment fade-in" -->

``` java
Person essun = new Person();
essun.name = "Essun Orogene";
essun.age = 42;
```
<!-- .element: class="fragment fade-in" -->

Worse: this makes no sense! 
<!-- .element: class="fragment fade-in" -->

``` java
Person theNamelessOne = new Person();
System.out.println(theNamelessOne.name);
// null
System.out.println(theNamelessOne.age);
// 0
```
<!-- .element: class="fragment fade-in" -->

This is an example of an "Illegal State". 
<!-- .element: class="fragment fade-in" -->

**Good code prohibits Illegal States *by design*.**
<!-- .element: class="fragment fade-in" -->

---

## Solution!

### Constructors: Make it right from the start.

``` java [5-7]
public class Person {
    public int age;
    public String name;

    public Person(/* arguments here */) {
        
    }
}
```
<!-- .element: class="fragment fade-in" -->

+++

``` java [5-7]
public class Person {
    public int age;
    public String name;

    public Person(String name, int age) {
        
    }
}
```

+++

``` java
Person essun = new Person("Essun Orogene", 42);
```

Java says: Looking good! <!-- .element: class="fragment fade-in" -->


``` java
System.out.println(essun.name);
```
<!-- .element: class="fragment fade-in" -->

``` txt
> null
```
<!-- .element: class="fragment fade-in" -->

+++

``` java
public class Person {
    public int age;
    public String name;

    public Person(String name, int age) {
        
    }
}
```

+++

``` java
public class Person {
    public int age;
    public String name;

    public Person(String name, int age) {
        name = name;
        age = age;
    }
}
```

+++

``` java
Person essun = new Person("Essun Orogene", 42);
System.out.println(essun.name);
```

``` txt
> null
```
<!-- .element: class="fragment fade-in" -->

+++

``` java [|3|5|3,5,7|3,5,6]
public class Person {
    public int age;
    public String name;                   // 3 (instance var)

    public Person(String name, int age) { // 5 (parameter)
        name =    // place B
            name; // place A
        age = age;
    }
}
```

Both A and B reference the parameter on line 5.
<!-- .element: class="fragment fade-in" -->


+++

**But, how did we resolve this in Python?**

``` python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```
<!-- .element: class="fragment fade-in" -->

### `self`!
<!-- .element: class="fragment fade-in" -->

+++

### In Java we use `this`

``` java
public class Person {
    public int age;
    public String name;

    public Person(String name, int age) {
        this.name   // refers to line 3 name
            = name; // refers to line 5 name
        this.age = age;
    }
}
```
*Warning: bad style!*
<!-- .element: class="fragment fade-in" -->

+++

In our class we avoid this problem by prefixing fields like these with '_':
``` java
public class Person {
    public int _age;
    public String _name;

    public Person(String name, int age) {
        _name = name;
        _age = age;
    }
}
```

+++

`this` refers to the instance we're currently "inside of".

Constructors begin by silently making `this` some new instance of the current class.
<!-- .element: class="fragment fade-in" -->

+++

**Unlike Python, Java helps us where possible**

``` python
class Person:
    # ...
    def name_first_initial(self):
        # have to write out self.name
        return self.name[0]
```

``` java
public class Person {
    public String _name;
    // ..
    public char nameFirstInitial() { // no arguments!
        return _name.charAt(0);       // no this!
    }
}
```

Because there's only one variable `name` could refer to, Java doesn't care about using `this`.
<!-- .element: class="fragment fade-in" -->

+++

## Time to test it.

``` java
Person essun = new Person("Essun Orogene", 42);
System.out.println(essun.name);
```
<!-- .element: class="fragment fade-in" -->

``` txt
> Essun Orogene
```
<!-- .element: class="fragment fade-in" -->

---

## Problem
``` java
public class Person {
    public int _age;
    public String _name;
    /* constructor ... */
}
```

``` java [|3]
    /** @author jeremyBearimy@good.plc */
    public void thereCanOnlyBeJeremy(Person student) {
        student._name = "Jeremy";
    }
```
<!-- .element: class="fragment fade-in" -->

Anyone can edit names! <!-- .element: class="fragment fade-in" -->

---

## Solution! 

### Sweet, sweet privacy. 

+++

### Solution!

``` java [2-3]
public class Person {
    public int _age;
    public String _name;
    /* constructor ... */
}
```
<!-- .element: class="fragment fade-in" -->

turns into <!-- .element: class="fragment fade-in" -->

``` java [2-3]
public class Person {
    private int _age;
    private String _name;
    /* constructor ... */
}
```
<!-- .element: class="fragment fade-in" -->

+++

``` java [|3]
    /** @author jeremyBearimy@good.plc */
    public void thereCanOnlyBeJeremy(Person student) {
        student._name = "Jeremy";
    }
```

Java says: no, no, no! <!-- .element: class="fragment fade-in" -->

``` txt
Jermey.java:3: error: name has private access in Person
        student._name = "Jeremy";
                ^
```
<!-- .element: class="fragment fade-in" -->

---

## New Problem!

``` java
Person essun = new Person("Essun Orogene", 42);
System.out.println(essun._name);
```

Java says: no, no, no! <!-- .element: class="fragment fade-in" -->

But we want a way to print just the name... <!-- .element: class="fragment fade-in" -->

---

## Solution

Part of lab today! 
<!-- .element: class="fragment fade-in" -->

See if you can find what it would be...
<!-- .element: class="fragment fade-in" -->