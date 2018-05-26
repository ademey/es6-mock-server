## Providers

A provider is a function that returns data. They are the building blocks of random data creation.
A useful provider is designed to return random data. This could be a random number, a chunk
of "Lorem Ipsum" or a complex object. Let's look at an example random number provider.

```
// A function when called returns a random number between 0 & 100
const randomProvider = () => Math.round(Math.random() * 100);
randomProvider(); // 23
randomProvider(); // 67
```

We will want to create random data of fixed lengths to simulate things like serial codes.
This package contains functions to create providers that generate random values.

```
// Use text() to create a function that always returns 4 random letters
const code = text(4);
code(); // 'RKLS'
code(); // 'VQLD'
```

Calling `text(4)` creates a function that will always return 4 random letters. If we just
defined a _provider_ as a function that returns something, then we could call `text()` a
_Provider Creator_. It is a function, that uses its params, to create a provider. This is a
frequent pattern in this library. 


### Provider Types

The names and locations of these functions is still very much a work in progress. I'm hoping
for input on what types of providers we would like as a team.

*Note:* the syntax like `text(3)()` that I'll be using to describe these functions... Remember
that a _Provider Creator_ configures a function. So the first call with `text(3)` means
"Create a function that will return 3 random letters". So calling the second time with
no arguments is what actually generates the text.

We should have basic providers for generic data:

```
text(4)(); // 'XDFK'
text(1)(); // 'J'

words(3)(); // 'iusto odio dignissimos'

timestamp()() // 1295742338759 @todo this api might change cus kinda silly to call that twice
```

We could also create more specific providers for known Air Force data types.

```
base() // AL UDEID
base() // LANGLEY

niin() // @todo whatever a niin is
```

### Provider Creator API

Provider Creators will create a provider function with a configuration. We might use
`text(3)` to create a function to return 3 random letters. Provider creators will take
a second argument as well. So calling `text(3, 10)` will create a function that makes a string
between 3 & 10 (@todo it may include those values).

```
// Random data of a fixed length
letters(1)() // 'A' or 'B' or 'C'
letters(4)() // 'PLSQ' or 'LSZA'
// Two arguments for random length
letters(3, 10)() // 'ALDKFSOW' or 'XKS
```

### Shape Provider

The `shape()` _Provider Creator_ is a function to create objects with randomized data. The `shape()` function takes it's only argument as an `object`. This object
is used to create a new object when the provider is called.

```
const boringShape = shape({ code: 'AJJX', name: 'ANDREWS' });
// This will always return the same object
boringShape() // { code: 'AJJX', name: 'ANDREWS' }
```

The data is always the same... This is where providers come in!
Shape will iterate over it's values, and if it is a function, call it. The returned
value is assigned to the object. Now we can create random data.

```
const baseCode = shape({ code: letters(4), name: words(1, 3) });
baseCode() // { code: 'CXQW', name: 'lorem ipsum' }
baseCode() // { code: 'GKSA', name: 'culpa qui officia' }
```

## Repeaters

The final concept in this library is the _Repeater_. A repeater is a function that accepts
a function and a number of times to repeat. The result is an array.

```
repeat(letters(1), 5) // ['B', 'E', 'P', 'Q', 'X']
repeat(code(2, 5), 5) // ['K3', 'LS3P1', 'XA', 'A1E63', '10AZ0']
```

Creating data for something like the Data Grid brings all of these concepts together. A repeater
will take a shape provider, which has its own providers.

```
const row = shape({
  shipFromName: words(3),
  fscCode: numbers(4),
  documentNumber: code(13),
  locationCode: () => `${letters(2)()}${numbers(4)()}`,
  status: pick(['R', 'Y', 'G'])
});

repeat(row, 10) // Creates an array of 10 objects with the shape described above
```

## Roadmap

I would like to point out that while these utilities are built with supplying data from the
mock server, there could be many other uses. Our data grids in story book examples could
use random data. Or we could write a node script that creates JSON files.