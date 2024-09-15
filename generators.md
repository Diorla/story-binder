Generators are functions embedded in markdown text. Values will be generated from this content.
It is inspired by [JSONGenerator](https://www.jsongenerator.io/).

# Basic

```
Hello my dear friend, ~firstName()~.
```
```
Hello my dear friend, John.
```
In this situation, `firstName()` will generate a first name.

# Arguments
Some times, you want to fine tune the function to return something more precise

```
Hi, my name is firstName(female), I am from ~country(europe)~ and I am ~number(20, 50)~ years old.
```
```
Hi, my name is Jane, I am from Germany and I am 28 years old
```

We declared three functions that took different args

- `firstName(female)` which accepts "male" and "female". In this situation it will return female name
- `country(europe)` returns an european country. It accepts continents, regions (e.g. middle east) etc
- `number(20, 50)` return a number from 20 to 50.

You can view all the available functions and what they accept [here](http://story-binder.adeolaade.com/generators).

# Referencing
You might want to reuse the value of a function throughout your work. This can be achieved using variables and arguments

## Variables

Reusing the value directly in your work

```
I was born in the city of ~city()[hometown]~, I grew up there and didn't leave ~[hometown]~ until I was ~number(30, 32)[age]~ years old.
So why did I wait till I was ~[age]~ before I left ~[hometown]~, well it is a long story.
```
```
I was born in the city of Lagos, I grew up there and didn't leave Lagos until I was 31 years old.
So why did I wait till I was 31 before I left Lagos, well it is a long story.
```
Here, we reference each functions
- `city()[hometown]`, `hometown` is a reference for the city. To reference the city function, we use `[hometown]`
- `number()[age]`, `age` is a reference for the number. To reference the number function, we use `[age]`

## Argument
This means using the value of a function inside another function.

```
I was born in ~city([nationality])~, ~country()[nationality]~, same as my mother, ~firstName(female, [nationality])~.
```

```
I was born in Abuja, Nigeria, same as my mother, Funke.
```

- `country()[nationality]`: As usual, we create a reference for country, nationality
- `firstName(female, [nationality])` in this case, the firstName will be "female" and and match the country, e.g. Nigeria
- `city([nationality])`: it will return a city from the matching country, e.g. Abuja is in Nigeria.

It should be noted that city was declared before country, even though we will be using the value of country. Order doesn't matter, as this enables you to maintain your artistic liberties while writing without worrying about arguments or dependencies.

# Creating your own generators
Apart from using default generators available with the app, you can create your own generators as well! What would you need?
For example, we want to create a world of magical creatures.

## Basic

1. Data: You need a data in JSON format.

```json
{
  "data": ["vampire", "werewolf", "mage"]
}
```
2. You can load this file (locally) and name it e.g. `magical_creatures`. You will find the place where you will load your data on the app.
3.  Now, you can use your function by prefixing it with an underscore `_` e.g. `_magical_creatures`. This is meant to separate it from user generated and default functions.
```
I am a ~u-magical_creatures()[specie]~ and I hope someday, I would be the most powerful ~[specie]~ on earth.
```
1.  Upload/Download file: If you want to share it with the world, you can upload your own data, and if you are interested, you can find other people's data to use online.

## Add odds

Yes, it is possible make different items in your data have different weight or possibility. Use braces to make it happen

```json
{
  "data": ["vampire(1)", "werewolf(1)", "mage(1)", "human(12)"]
}
```
In this situation, the odds of being a human is 12/15, while the odds of being a werewolf, vampire or mage is 1/15

## Use args

Now, you want to filter down you using arguments, you can next your values

```json
// u-animals
{
  "feline": ["lion", "leopard", "cheetah", "tiger", "cat"],
  "canine": ["fox", "wolf", "jackal", "coyote", "dog"]
}
```
Here are possible use cases

1. `u-animals()`: returns all animals e.g. `lion` or `fox`
2. `u-animals(feline)`: returns only feline animals e.g. `lion` or `leopard`
3. `u-animals(2)`: returns any two animals e.g. `[lion, fox]`
4. `u-animals(canine, 2)`: returns two canine animals e.g. `[fox, wolf]`

## Note

> This following should be programmatically prevented but who knows, somethings might fall through the cracks

1. Do not use numbers as your list wrapper

```json
// don't do this
{
  "1": ["lion", "leopard", "cheetah", "tiger", "cat"],
  "2": ["fox", "wolf", "jackal", "coyote", "dog"]
}
```

This is in this case `u-animals(1)` & `u-animals(2)`, it would be interpreted as generate 1 animal and 2 animals respectively.

2. `data` is reserved

In case you are not nesting, then everything should be placed inside "data" key. If you don't provide an argument, it will
  1. Default to `data`
  2. If `data` is not found, then it will merge all items in the key pattern available

```json
// don't do this
{
  "data": ["James", "John"],
  "male": ["Shawn", "Davids"],
  "female": ["Jane", "June"]
}
```
In the example above, either remove "data" or remove "male" & "female".
