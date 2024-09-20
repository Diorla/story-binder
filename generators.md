# Introduction

Generators are functions embedded in markdown text. Values will be generated from this content.
It is inspired by [JSONGenerator](https://www.jsongenerator.io/).

## Basic

```
Hello my dear friend, ~firstName()~.
```
```
Hello my dear friend, John.
```
In this situation, `firstName()` will generate a first name.
Note, functions are case insensitive, so `firstName` = `firstname`

## Arguments
Some times, you want to fine tune the function to return something more precise

```
Hi, my name is firstName(gender=female), I am from ~country(continent=europe)~ and I am ~number(min=20, max=50)~ years old.
```
```
Hi, my name is Jane, I am from Germany and I am 28 years old
```

We declared three functions that took different args

- `firstName(gender=female)` which accepts "male" and "female". In this situation it will return female name
- `country(continent=europe)` returns an european country. It accepts continents, regions (e.g. middle east) etc
- `number(min=20, max=50)` return a number from 20 to 50.

```ts
fn(argType=argValue)
```

You can view all the available functions and what they accept [here](http://story-binder.adeolaade.com/generators).

## Referencing
If you call `firstName()` 100 times, it will return the same name in a particular document.

You might want to reuse the value of a function throughout your work and differentiate it. This can be achieved using variables and arguments.

### Variables

Reusing the value directly in your work

```
I was born in the city of ~city()[hometown]~, I grew up there and didn't leave ~[hometown]~ until I was ~number(min=30, max=32)[age]~ years old.
So why did I wait till I was ~[age]~ before I left ~[hometown]~, well it is a long story.
```
```
I was born in the city of Lagos, I grew up there and didn't leave Lagos until I was 31 years old.
So why did I wait till I was 31 before I left Lagos, well it is a long story.
```
Here, we reference each functions
- `city()[hometown]`, `hometown` is a reference for the city. To reference the city function, we use `[hometown]`
- `number()[age]`, `age` is a reference for the number. To reference the number function, we use `[age]`

### Argument
This means using the value of a function inside another function.

```
I was born in ~city(country=[nationality])~, ~country()[nationality]~, same as my mother, ~firstName(gender=female, country=[nationality])~.
```

```
I was born in Abuja, Nigeria, same as my mother, Funke.
```

- `country()[nationality]`: As usual, we create a reference for country, nationality
- `firstName(gender=female, country=[nationality])` in this case, the firstName will be "female" and and match the country, e.g. Nigeria
- `city(country=[nationality])`: it will return a city from the matching country, e.g. Abuja is in Nigeria.

It should be noted that city was declared before country, even though we will be using the value of country. Order doesn't matter, as this enables you to maintain your artistic liberties while writing without worrying about arguments or dependencies.

# Creating your own generators
No support yet, but it's in the wood work

# Generators

## Active
The following are functions that are currently supported

### `whole_number`

- returns a whole number like 8
- accepts
  - min: the lower bound of the value
  - max: the higher bound of the value

```
whole_number() => 12344234342
whole_number(min=10) => -24834923
whole_number(max=100) => 83
whole_number(min=1, max=50) => 45
```


### `decimal_number`

- returns a whole decimal_number like 8.78
- accepts
  - min: the lower bound of the value
  - max: the higher bound of the value
  - sf: the number of significant values that would be shown after the decimal numbers

```
decimal_number() => 123442.34342
decimal_number(sf=2) => 123442.00
decimal_number(min=10) => -2483492.7873
decimal_number(max=100) => 83.7898
decimal_number(min=1, max=50) => 45.8589
```


## Proposed
These are functions that may be added, under consideration
