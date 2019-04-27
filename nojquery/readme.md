# Lesson 1

## Goodbye jQuery, 💵 I (don't) need a dollar 💵

-   DOM selection
-   DOM manipulation
-   Style manipulation

jQuery was created in the dark days of 2006 to save the world from cross-browser
incompatibilities and excessive verbosity. It was a revelation. With a simple
`$` symbol, web developers could forget about the nightmares of different
browsers, and no longer needed to jump through hoops to query and manipulate the
DOM. Fast forward 13 years and it's still hanging around, used in millions of
sites both old and new. However in most cases it's no longer needed.

JavaScript and the DOM in 2019 are light years ahead of the mess of 2006. The
browser wars are over, peace and compatibility reign, and jQuery has done its
job. Now, thanks to jQuery, we can do everything that we used jQuery for with
native DOM APIs.

### Selecting DOM

You've already seen how to get things if they have id attributes:

```javascript=
const myElWithId = document.getElementById("my-id");

console.log(myElWithId);
```

Useful but not exactly jQuery useful! Let's use MDN to practice selecting
elements. Go to
[https://developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API)
and open devTools (ctrl/cmd+alt+i) and then click on the console pane. Add the
following to the console and press "return".

```javascript=
// Select anything in the DOM with any CSS selector
// like $('my-css-selector');
document.querySelectorAll("div");
/*NodeList(46) [ div.nav-toolbox-wrapper, div#nav-tech-submenu.submenu.js-submenu, div.submenu-column, div#nav-learn-submenu.submenu.js-submenu, div.submenu-column, div#nav-contact-submenu.submenu.js-submenu, div.submenu-column, div#toolbox.toolbox, div.login, div.search-wrap, … ]*/
```

Notice you get something like an array back. `querySelectorAll` will always
return that, even if it is empty.

You can use _any_ css selector, so let's do something more complex.

```javascript=
document.querySelectorAll('[href^="https"]');
/* NodeList(72)
0: <link rel="preload" href="https://developer.mozill…ubset.bbc33fb47cf6.woff2" as="font" type="font/woff2" crossorigin=""> ...
...
71: <a href="https://www.mozilla.org/privacy/websites/#cookies" data-bcup-haslogintext="no">
length: 72
<prototype>: NodeListPrototype { item: item(), keys: keys(), values: values(), … }
*/
```

That returned all elements that have an attribute of `href` whose value starts
with `https`.

If you only want the first returned **element**:

```javascript=
// like $('[href=^="https"]')[0];
document.querySelector('[href^="https"]');
// <link rel="preload" href="https://developer.mozill…ubset.bbc33fb47cf6.woff2" as="font" type="font/woff2" crossorigin="">
```

Notice `querySelector` returns the actual element.

Finally you can search within selections with the same methods.

```javascript=
const body = document.body;

body.querySelectorAll("a");
// or
body.querySelector("a");
```

### Creating and manipulating elements

We first create our search form and set its id so we can easily access it:

```javascript
const searchForm = document.createElement("form");
searchForm.id = "search-form";
```

`document.createElement` creates the DOM element but doesn't insert it into the
page DOM. To do that we need to use one of the insertion methods:

```javascript
document.body.append(searchForm);
```

This creates a form and adds it to the page, but doesn't add anything to it. As
well as creating elements as shown above, we can also create them from HTML
strings, by assigning them to `innerHTML`:

```javascript
searchForm.innerHTML = "<div class='uninitialised'></div>";
```

All container elements have a `children` property, which can be accessed like an
array. We can easily add and remove CSS classes by using the `classList`
property, which is like jQuery's `class()` function. It has lots of useful
methods like `add()`

```javascript
searchForm.children[0].classList.add("input-wrap");

// or add many at a time
const classes = ["input-search", "another-class"];

searchForm.children[0].classList.add(...classes);
```

We can use `querySelector` now to check if it has a class name and `remove` a
class from the `classList`.

```javascript
const divWrapper = searchForm.querySelector("div");

const classesToRemove = ["uninitialised", "another-class", "non-class"];
if (divWrapper.classList.contains("uninitialised")) {
    divWrapper.classList.remove(...classesToRemove);
}

console.log(divWrapper);
```

As well as manually creating elements, we can also easily create them using HTML
strings. Frustratingly, we can't add arrays of HTML strings directly, but, it's
simple enough to just `join()` them and add the whole string:

```javascript
import { findSomeMoviePosters } from "./movieModel";

const addPosters = async () => {
    const moviePosters = await findSomeMoviePosters("zatoichi");

    document.body.innerHTML = moviePosters.join(" ");
};

addPosters();
```

The equivalent to jQuery's `attr()` is `setAttribute` and `getAttribute`, and we
also have `hasAttribute` to test if the attribute exists. We can set the text
content of an element in a similar way as we set HTML:

```javascript
const searchInput = document.createElement("input");

const searchId = "search";
searchInput.id = searchId;
searchInput.setAttribute("type", "search");
searchInput.setAttribute("placeholder", "Search for a movie");

const label = document.createElement("label");
label.setAttribute("for", searchId);
label.textContent = "Search movies:";

const searchBtn = document.createElement("button");
searchBtn.textContent = "Search";
```

When we've built the elements, we can add them to the DOM. The methods are
mostly the same as jQuery:

```javascript
divWrapper.append(searchInput);
divWrapper.prepend(label);
document.body.append(searchForm);
```

There are other methods like `insertAdjacentElement` or `insertAdjacentHTML`
that allow a lot of control over where an element insert either another element
or some HTMLString (either before, as first child(ren), at the end or after) all
with the same method.

```javascript=
searchInput.insertAdjacentElement("afterend", searchBtn);

console.log(searchForm.outerHTML);
```

### Events

jQuery has a nice shorthand syntax for adding event listeners. The syntax is
very similar for DOM APIs nowadays.

```javascript
selectBtn.onclick = () => {
    console.log(searchInput.value);
};

// longhand would look like this
selectBtn.addEventlistener("click", function() {
    alert(searchInput.value);
});
```

## Still no :dollar:

I'm sure that you are thinking that there is still quite a lot more that you can
do with the \$ than we've covered... and that is part of the charm of the
original library. Nevertheless, let's have a look at some more common tasks.

### CSS

It is debatable whether one should be doing too CSS directly in this way; it
could be much more efficient to be writing classes in your stylesheets and
applying them. The DOM provides us with a couple of ways to manipulate styles on
Elements. They both work through the `Element.style` object.

The first is if you just have a couple of named styles to change; let's style
our label a little:

```javascript=
searchLabel.style.display = "block";
searchLabel.style.fontSize = "5rem";
searchLabel.style.fontWeight = "bold";
searchLabel.style.opacity = "0.05";
searchLabel.style.marginBottom = "-48px";
```

A couple of things to note about this are; that it is quite verbose and that the
styles are camelCase rather than kebab-case.

The other method we can use on the style object is called `cssText`.

```javascript=
searchInput.style.cssText = `font-size: 2em;
    position: realtive; 
    z-index: 2; 
    background-color: rgba(255, 255, 255, 0.5); 
    border: 0 transparent; 
    border-bottom: 2px solid slategray; 
    z-index: 2; 
    display: inline-block;`;
```

As you can see, this a little more like writing normal CSS.

You can find out about an element's styles, but you have to ask the window about
it for some reason.

```javascript=
const buttonStyles = window.getComputedStyle(searchBtn);

console.log(buttonStyles);
console.log(buttonStyles["background-color"]);
```

### Mini-task

Write some styles for the search button...

### What? How big? Where?

Often one needs to work out or set how big something is and where it is on the
page. To be honest the width/height of things is still a mess in DOM-land... but
I'll show you a coupl'a things :stuck_out_tongue_winking_eye:.

So as I was saying a bit messed up... just stay away from `clientWidth` and
`clientHeight` and you should be okay...

```javascript=
console.log(searchLabel.offsetWidth); // 745
console.log(searchLabel.offsetHeight);
console.log(document.querySelector("kbd").offsetWidth); // 50
```

So that could be that, but there is another useful method,
`Element.getBoundingClientRect()`. It "returns the size of an element and its
position relative to the viewport".

```javascript=
console.log(searchLabel.getBoundingClientRect());
console.log(document.querySelector("kbd").getBoundingClientRect());
```

In the console, you will see something called a `DOMRect`, which looks like a
normal JavaScript object and can be treated as such for the most part. If you
open it, you will see that it has all the information you need about where, what
and whatnot.

Two things to note, the width and height are not rounded like `offsetWidth` and
`offsetHeight` and the positioning data is relative to the viewport (so will
change if you scroll); it is like `$(el).offset()`. It is also best to not rely
on `x` and `y` if you need to support IE and Edge.

If you want the position without the scrollOffset (like `$(el).position()`) you
can use `offsetTop` and `offsetLeft`.

```javascript=
console.log(searchLabel.offsetLeft, searchLabel.offsetTop);
// try this with scroll
```

### Talking of scrolling...

Let's take a look at scrolling control. To do that we'll need to make the page
scrollable by adding something to the page that is higher than the page and
let's add a "scroll to top" anchor on the bottom.

```javascript=
const scrollDiv = document.createElement("div");

scrollDiv.style.height = "200vh";

document.body.append(scrollDiv);

const topAnchor = document.createElement("a");

topAnchor.setAttribute("href", ``);
topAnchor.innerText = "^ To top ^";
```

At this point I would absolutely adivse you to use the native scrolling options
rather than hand writing some animation to scroll the page with javaScript.
let's see how easy that is.

First, just link the anchor tag we made to an element id near the top of the
page. In this case we'll link to the form, which is at the top, but you could
equally add an id at the top for this purpose.

```javascript=
topAnchor.setAttribute("href", `#search-form`);
```

Clicking on that will focus the form and viewport on the form.

... and to make the browser animate to that point we can take advantage of the
nice new `scroll-behavior` css property, either set it in a stylesheet.

```css
body,
.scrolling-element {
    scroll-behavior: smooth;
}
```

or set the style with JS

```javascript=
document.body.style.scrollBehavior = "smooth";
```

The next best thing, which still leverages the native scrolling abilities, with
a little less elegance (more JS), is to use the nicve new DOM
`element.scrollIntoView` method. The benefit of this method is that you can
anchor the scroll to any element, not just elements with ids.

First you need to add an event listener to the anchor, so that we can use the
`scrollIntoView` method on click.

```javascript
topAnchor.onclick = (event) => {
    event.preventDefault();
    searchForm.scrollIntoView({ behavior: "smooth" });
};
```

We need to have an element (our searchForm) and then call the `scrollIntoView`
method on it. And we can pass in the optional options object that means we can
tell it to scroll smoothly rather than just jump there.

If you really, really, really HAVE TO animate the scroll with JS (this is
asimple as it gets - no easing etc)...

```javascript=
const scrollAnimation = (destinationElement) => {
    const destination = destinationElement.offsetTop;
    let currentScroll = document.scrollingElement.scrollTop;

    const scrollThePage = () => {
        if (currentScroll > destination) {
            document.scrollingElement.scrollBy(0, -5);
            currentScroll = document.scrollingElement.scrollTop;

            window.requestAnimationFrame(scrollThePage);
        }
    };

    window.requestAnimationFrame(scrollThePage);
};

topAnchor.onclick = (event) => {
    event.preventDefault();
    scrollAnimation(searchForm);
};
```

We still need to use the click event on the anchor; this time to call a scroll
animation function.

In the `scrollAnimation` function we start off by setting the destination for
our scroll (the `offsetTop` of our form) and then we instantiate a variable that
we'll use to keep track of the current scroll position.

We want to keep scrolling the page a little bit until this `currentScroll`
equals the `destination`. To do this we'll set up a little looping function that
will be called on every frame that that browser renders.

Let's take a little detour and discuss frames and what they mean in browsers. A
"frame" in this case is similar to the concept of a frame on a roll of analogue
film. A film camera exposes the film in front of the lens at 25 frames per
second (fps), the minimum speed to "fool" the human eye that it is one moving
picture. A browser frame is the rate that it can update everything that needs
updating on the screen, typically >= 60fps. Modern browsers give us a way to
synchronise changes with their update cycle so that we can get the best and
smoothest visible performance. The more work we make the browser do in a frame
the slower and "jankier" it looks.

So, we use the `requestAnimationFrame` (essentially, asking the browser to
execure a function the next time it starts a "frame"/an update) method to
synchronise our scroll updates with the screen update
`window.requestAnimationFrame(scrollThePage);` and then call the screen to
update again on the next frame because we add the same line inside the
`scrollThePage` function.

The `scrollThePage` function checks that `currentScroll` is not the same as
`destination` and if so, it uses the `element.scrollBy` method to move the
scroll a small amount. Then it updates the `currentScroll` variable and requests
the next frame to do it all over again.

Not big and not clever... better just let the browser work its magic.

This has been a whistle-stop run-through of some popular jQuery functions and
their equivalent. The table below gives some more, as well as some note about
them.

| **jQuery**                                          | **JavaScript**                                                                                                           | **Comment/Example**                                                                                                                                                                                                                        |
| :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Selection**                                       |                                                                                                                          |
| `$("#my-id")`                                       | `document.getElementById("my-id)`                                                                                        |
| `$("div")`                                          | `document.querySelectorAll("div")`                                                                                       | Selects all divs and returns a nodeList/Array                                                                                                                                                                                              |
| `$("div")[0]`                                       | `document.querySelector("div")`                                                                                          | Selects and returns only the first div element                                                                                                                                                                                             |
| `$("div")[0].find("p")`                             | `document.querySelector("div").querySelectorAll("p")`                                                                    | Select all the p elements in the first div. Note:It isn"t possible to do this: `document.querySelectorAll("div").querySelectorAll("p")`                                                                                                    |
| `$("div")[0].children()`                            | `document.querySelector("div").children`                                                                                 | Get the children of an element. As with the above you cannot directly select all the children of multiple Elements. Note: Some types of selector are directly available on the Element, likechildren, id, options(on select elements), etc |
| `$("div.yell")[0].parent()`                         | `document.querySelector("div.yell").parentElement`                                                                       |
| `$(".yell")[0].closest(".quiet")`                   | `document.querySelector(".yell").closest(".quiet")`                                                                      |
| `$(".yell")[0].siblings()`                          | `document.querySelector(".yell").parentElement.children`                                                                 | The vanilla version will contain the original element as well or you can useprevious/nextElementSibling                                                                                                                                    |
| `$(".yell")[0].is("#angry")`                        | `document.querySelector(".yell").matches("#angry")`                                                                      |
| **Manipulation**                                    |                                                                                                                          |
| `const div = $("<div>")`                            | `const div = document.createElement("div")`                                                                              |
| `$(".yell")[0].html("<em></em>")`                   | `document.querySelector(".yell").innerHTML= "<em></em>"`                                                                 | innerHTML can take a string or actual DOM elements                                                                                                                                                                                         |
| `$(".yell")[0].replaceWith(quietEl);`               | `document.querySelector(".yell").replaceWith(quietEl)`                                                                   | Polyfills needed for the shorter API, but there are other options                                                                                                                                                                          |
| `$(".yell")[0].after(quietEl);`                     | `document.querySelector(".yell").after(quietEl)`                                                                         |
| `$(".yell")[0].before(sleeping);`                   | `document.querySelector(".yell").before(sleeping)`                                                                       |
| `$(".yell")[0].append(fistOfSteel);`                | `document.querySelector(".yell").append(fistOfSteel)`                                                                    |
| `$(".yell")[0].prepend(flyingSomersault);`          | `document.querySelector(".yell").prepend(flyingSomersault)`                                                              |
| `$(".inner-peace")[0].remove()`                     | `document.querySelector(".inner-peace").remove()`                                                                        |
| `$(".yell")[0].clone();`                            | `document.querySelector(".yell").cloneNode();`                                                                           |
| **Classes and attributes**                          |                                                                                                                          |
| `$(".yell")[0].addClass("angry")`                   | `document.querySelector(".yell").classList.add("angry")`                                                                 |
| `$(".yell")[0].removeClass("it")`                   | `document.querySelector(".yell").classList.remove("it")`                                                                 |
| `$(".yell")[0].hasClass("mercy")`                   | `document.querySelector(".yell").classList.has("mercy")`                                                                 |
| `$(".yell")[0].toggleClass("ninja")`                | `document.querySelector(".yell").classList.toggle("ninja")`                                                              |
| `$(".yell")[0].attr("aggressiveness")`              | `document.querySelector(".yell").getAttribute("aggressiveness")`                                                         |
| `$(".yell")[0].attr("aggressiveness","middling")`   | `document.querySelector(".yell").setAttribute("aggressiveness", "middling")`                                             |
| **Other**                                           |                                                                                                                          |
| `$(".yell")[0].on("click", fn)`                     | `document.querySelector(".yell").onclick(fn);`<br>`document.querySelector(".yell").addEventListener("click", fn, false)` | There are a number of these shorthand functions, they all map to the same thing without the "on" in addEventListener                                                                                                                       |
| `$(".yell")[0].css("opacity", "0")`                 | `document.querySelector(".yell").style.opacity = 0;`                                                                     |
| `$(".yell")[0].css({"Color":"red","Opacity": "1"})` | `document.querySelector(".yell").style.cssText= "color: red; opacity: 1"`                                                |
| `$(".yell")[0].animate()`                           | `document.querySelector(".yell").animate()`                                                                              |
| `$(".yell")[0].scrollTop()`                         | `document.querySelector(".yell").scrollTop`                                                                              |

### Resources

-   [(Now more than ever you) might not need jQuery](https://css-tricks.com/now-ever-might-not-need-jquery/)
-   [MDN: Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element)
