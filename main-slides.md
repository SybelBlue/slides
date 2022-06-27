# Primitives & Objects
*Thursday - 6/23*

---

## Agenda

- Intro Poll
- Lecture
- Lab

---

### Get to know ya Poll Results

- Most popular vacations
    - beach with friends
    - family game nights
- There's a math god among us
    - They're outnumbered by the math inquisition
- Even split on artistic opinion

Note: least pop vacation: cs61bl at the gym

---

## Intro Poll!

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

Note: talk about implicit casting

+++

## `int`

*The `123`s of computing*

Values: any round number (between ±2 billion)

+++

## `int`

``` java
int two = 4 * 3 / 2 + 1 - 5;
int two2 = Math.round(Math.PI / 2);
```
<!-- .element: class="fragment fade-in" -->

Note, `Math.pi` isn't an `int` it's a `double`! 
<!-- .element: class="fragment fade-in" -->

Note: what is Math.round ret type

+++

## `double`

*A floating point number, but twice as precise*

Values: all the (best) numbers <br> between (±`1.7E308`)

+++

## `double`

``` java
double three = 3.0; // need the .0, or else int!
double circumfrence = 2.0 * Math.PI * r;
double gramsFlour = 850.0 * loavesOfBread;
```

Note: implicit casting

+++

## Be Aware of `int` division!

``` java
System.out.println(4 * 3 / 2);
```
<!-- .element: class="fragment fade-in" -->
``` txt
> 6
```
<!-- .element: class="fragment fade-in" -->

``` java
System.out.println(3 / 2 * 4);
```
<!-- .element: class="fragment fade-in" -->

``` txt
> 4
```
<!-- .element: class="fragment fade-in" -->


Why? Because dividing two integers in java does integer division <!-- .element: class="fragment fade-in" -->

Note: (no remainders! always rounds down)

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

Note: The point here is that there is **one math for all uses**.

+++

### `static`

Marks something as unique within a class or universal for all uses.

`main` methods must be unique
<!-- .element: class="demph fragment fade-in" -->

Pi is just Pi, no 'instances' about it
<!-- .element: class="demph fragment fade-in" -->

Refrence directly with `Class.static`
<!-- .element: class="demph fragment fade-in" -->

**Use with caution. Java runs on objects.**
<!-- .element: class="demph fragment fade-in" -->


Note: Comparable to script level values/methods in Python

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

What are the types of these properties?

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

``` java [3|]
public class Person {
    public int age;
    public String name;
}
```

`age` and `name` are called instance variables. 
<!-- .element: class="fragment fade-in" -->

Note: each instance gets its own copy. defaults are filled in

---

## We did it!

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

Note: now we can make new instances

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

**Good code prohibits Illegal States *by design*.**
<!-- .element: class="fragment fade-in" -->

Note: This is an example of an "Illegal State". 

---

## Solution!

### Constructors

Make it right from the start.
<!-- .element: class="demph fragment fade-in" -->

``` java [5-7]
public class Person {
    public int age;
    public String name;

    public Person(/* arguments here */) {
        
    }
}
```
<!-- .element: class="fragment fade-in" -->

Note: are always just the name of the class, no return types!

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

Note: this refers to the instance we're currently "inside of". Constructors begin by silently making `this` some new instance of the current class.

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

Note: theres a mathy section, don't worry if your eyes glaze over, mine did. Good news is, when it's done, you get a neat animation out of it!

---

## Problem

``` java
System.out.prinln(essun);
```

``` txt
Person@0xbeef
```

---

## Solution

### `toString`

``` java
public class Person {
    // ...
    public ? toString() {
        return "Person{ _name = " + _name + 
            ", _age = " + _age + "};
    }
}
```

+++

### `toString`

``` java
public class Person {
    // ...
    public String toString() {
        return "Person{ _name = " + _name + 
            ", _age = " + _age + " };
    }
}
```

+++

### Test it!
``` java
System.out.println(essun);
```

``` txt
Person{ _name = "Essun Strongback", age = 42 }
```