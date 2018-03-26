## Week 6: :pie: Functional progamming is easy as :pie:

This week we're going to learn and implement "Functonal Programming" in 3 easy slices.

### What the heck is functional programming?

I know, you write functions all the time right? That's what functional programming is... but with a couple of requirements for the "shape" of the functions:

1.  :no_smoking: No side effects: - this is often called "Purity".
2.  :gemini: Always returns the same thing given the same input - opaquely known as "referential transparency"
3.  :one: Single purpose: - this is just good practice.

One otehr notable thing that people say about FP (Functional Programming) is that you write **What** you want to happen rather than **How** it should happen. We'll look at this later.

### Yeah, but what the heck is functional pragramming?

Let's look at an example. A very contrived example. Let's say that you are passed the area of a square and you need to calculate the volume of a cube with that square. So area is calculated by `sideLength * sideLength` or <code>sideLength<sup>2</sup></code> and volume is ``sideLength _ sideLength _ sideLength` or <code>sideLength<sup>3</sup></code>, which means that your first attempt might looks something like this:

```javascript
export const calculateCubeFromSquare = (squaredNo) => {
    const baseNo = Math.sqrt(squaredNo);

    return squaredNo * baseNo;
};

const twentySeven = calculateCubeFromSquare(9);
```

Guess what? You've just written a pure function (no side effects) _and_ it always returns the same thing given the same input - the first 2 points from our requirements (the 3rd is (just) best practice). BOOM! walk away... Walking away is the correct thing to do; there is no need to optimise until you have good reason.

It is worth noting 2 things about the code above (apart from the fact that it is awesome FP goodness and you didn't even have to try):

1.  Because it does follow our two main principles of FP, we **can** say things like `const twentySeven = calculateCubeFromSquare(9);` or `const nine = calculateCubeFromSquare(3);` - it is like the function in _that particular configuration_ can almost be replaced by the value it outputs. This is entirely because we know that our function isn't reliant on any outside factors (it's pure) and because it doesn't do anything that is subject to change (referetial transparency). This is an important thing for a number of reasons, not least because we can stop thinking about it so hard and reduce our cognitive load and we can test this function really easily to make sure we're can stop thinking about it.
2.  If we really want to be picky about it, that function is really doing 2 things... calculating a base number from a squared number and then calculating a cubed number... just saying.

Okay, let's say for the sake of argument that you **had a good reason to refactor** according to the best practice of "single purpose", what would that look like?

Glad you asked, we need a `calculateBaseFromSquare` and a `calculateCube` to cover those 2 functions:

```javascript
// Sorry for this silly function, it's just for illustration
export const calculateBaseFromSquare = (squaredNo) => Math.sqrt(squaredNo);
export const calculateCube = (number) => number * number * number;

const three = caculateBaseFromSquare(9);
const twentySeven = calculateCube(three);
```

Okay done, now walk away... No really. Walk. Away. Now we've got a more generic function that allows us to calculate cubes against any number and we can now also calculate base numbers should we need to... Your application just got more extensible, more testable and more reusable, and it is easy to read. What more do you want?

Well, I did say that you could treat these fancy pure functions as if they were the value they returned... `caculateBaseFromSquare(9)` always returns `3`, every time. So that I suppose if you wanted to you could do this:

```javascript
export const calculateBaseFromSquare = (squaredNo) => Math.sqrt(squaredNo);
export const calculateCube = (base) => Math.pow(base, 3); // continue the theme of replacing the javascipt Math methods :|

const twentySeven = calculateCube(caculateBaseFromSquare(9));
```

Let me stress right now, you shouldn't do this if you don't feel comfortable with it. You could make the biggest difference to the extensibility, testability and reusability of your code by simply focussing on those 3 points above, but if you want to follow the :rabbit: down this hole you've just discovered...

### Welcome to Higher Order Functions

What now? Higher Order Functions, it's just a fancy way of saying that you can pass a function as a parameter to another function, or that a function can return a function. This is just a feature of javascript, but combined with purity and referential transparency we can start doing something very interesting.

Let's just look at that last line again without all the previous lines:

```javascript
// ... code
const twentySeven = calculateCube(caculateBaseFromSquare(9));
```

Before we do anything else, notice that it is saying **What** is happening rather than **How** that number is being converted? Without reading anything else I can see that it is saying it expects a squared number parameter and it will return the base number from that, and then it will calculate a cubed number from that. It isn't saying how any of that is done, and theoretically I never need know. So it is cutting out a whole lot of reading time and thinking time.

Another thing to notice is that you have passed one function as the parameter of another. You've probably done this a lot without realising it using jQuery or eventListeners or timeouts. You've been using HOFs. Nice. This only works if the inner function returns something that the outer function expects, the above wouldn't work if the inner function returned `undefined` or a date, etc.

Finally, something odd, you kind of have to read that backwards, or from the inside out - `caculateBaseFromSquare` before `calculateCube`. This can take getting used to, but that is all, it just needs a bit of practice. We've swapped one type of long term cognitive load for a shorter term cognitive load. You may decide never to do this. Up to you.

So this hole goes deeper... :hole:

When you return a function from another function, things get really spanky.

To have a look at this let us finally leave my horribly contrived example alone and look at the aim for this week; we want to get some emoji by their 'category' and add them to the heading.

Let's start with the function as we might write it first time around:
