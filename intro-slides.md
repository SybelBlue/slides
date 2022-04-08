*(why we care about)*
# Iterators
---

## The __`Iterator`__ Interface

``` java [|2]
public interface Iterator<Item> {
    public Item next();
    public boolean hasNext();
}
```
+++
*Aside: `Iterable`
``` java 
public interface Iterable<Item> {
    public Iterator<Item> iterator();
}
```
Note that this just turns an object into an `Iterator`.
+++
Main Takeaway:
> Interfaces characterize common __behavior__
---

## But why do I want this?
> Well... It's sweeter?
---

## Pseudocode for Counting Sheep
Say we have a zoo full of enclosures.

Our objective is to count the animals in the zoo.
+++
## Pseudocode for Counting Sheep

``` txt
Set animals to 0
For each animal enclosure in the zoo:
    Add the number of animals in the enclsoure to animals
```

---
## Comparing C-style with For-Each
``` java
// C-style For loop
int animals = 0;
for (int i = 0; i < enclosures.length; i++) {
    Enclosure pen = enclosures.get(i);
    animals += pen.getAnimalCount();
}

// For-Each loop
int animals = 0;
for (Enclosure pen : enclosures.length) {
    animals += pen.getAnimalCount();
}
/*     Hurray for Syntax Sugar!        */
```
