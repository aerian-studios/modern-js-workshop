## Week 4: 💵 I (don't) need a dollar 💵

### You probably don't need jQuery anymore.

jQuery was created in the dark days of 2006 to save the world from cross-browser incompatibilities and excessive verbosity. It was a revelation. With a simple `$` symbol, web developers could forget about the nightmares of different browsers, and no longer needed to jump through hoops to query and manipulate the DOM. Fast forward 12 years and it's still hanging around, used in millions of sites both old and new. However in most cases it's no longer needed.

JavaScript and the DOM in 2018 are light years ahead of the mess of 2006. The browser wars are over, peace and compatibility reign, and jQuery has done its job. Now we can do almost everything that we used jQuery for with vanilla JS.

### Creating and manipulating elements

We first create our emojitron form and set its id so we can easily access it:

```javascript
const emojitron = document.createElement("form");
emojitron.id = "emojitron";
```

`document.createElement` creates the DOM element but doesn't insert it into the page DOM. To do that we need to use one of the insertion methods:

```javascript
document.body.append(emojitron);
```

This creates a form and adds it to the page, but doesn't add anything to it. As well as creating elements as shown above, we can also create them from HTML strings, by assinging them to `innerHTML`:

```javascript
emojitron.innerHTML = "<div class='uninitialised'></div>";
```

All container elements have a `children` property, which can be accessed like an array. We can easily add and remove CSS classes by using the `classList` property.

```javascript
emojitron.children[0].classList.add("input-wrap", "input-select");
```

We can use `querySelector` on individual elements to only search that element's children.

```javascript
const divWrapper = emojitron.querySelector("div");
divWrapper.classList.remove("uninitialised");
```

As well as manually creating elements, we can also easily create them using HTML strings. Frustratingly, we can't add arrays of HTML strings directly, but it's simple enough to just `join()` them and add the whole string:

```javascript
export const createEmojiOptionElements = async emojis => {
  const emojiDex = await Promise.all(emojis.map(getEmoji));
  const emojiOptions = emojiDex
    .map(emoji => `<option value="${emoji}">${emoji}</option>`)
    .join();
  return `<option>Select an emoji</option>
    ${emojiOptions}`;
};

export const createEmojiSelect = async emojis => {
  const selectEl = document.createElement("select");
  selectEl.id = "emoji-select";
  selectEl.innerHTML = await createEmojiOptionElements(emojis);
  return selectEl;
};
```

We can also see here the use of `Promise.all` to handle `map` with an async callback. An async function returns a Promise, so if we tried to `join` the result of the map as normal, we'd be trying to join Promise objects rather than the strings. One option is to use await inside the callback, e.g. `emojis.map(await getEmoji)`, but the trouble with this is that the calls can't execute in parallel: it `await`s each one before calling the next. A much more efficient way is to call map as usual, and then wrap the resulting array of Promsies in `Promise.all`. We can then `await` this and it will resolve once all of the promises that were passed to it have resolved, with an array of the reolved values. In this case, these are the emoji strings.

Once we have these emojis, it's simple to use `map` to transform them into HTML strings, and then join them together.

The equivalent to jQuery's `attr()` is `setAttribute` and `getAttribute`, and we also have `hasAttribute` to test if the attribute exists. We can set the text content of an element in a similar way as we set HTML:

```javascript
const label = document.createElement("label");
label.setAttribute("for", id);
label.textContent = content;
```

When we've built the elements, we can add them to the DOM. The methods are mostly the same as jQuery:

```javascript
divWrapper.append(selectEl);
divWrapper.prepend(label);
document.body.append(emojitron);
```

### Events

jQuery has a nice shorthand syntax for adding event listeners. The syntax is very similar for vanilla now. To show this, we attached events to our select element. e.g. for the change event, we can either assign a handler to the `onchange` property of the element, or we can call `addEventListener`:

```javascript
selectEl.onchange = () => {
  setHeadingText(selectEl.value);
  selectEl.blur();
};

selectEl.addEventListener("focus", handleFocus, false);
selectEl.addEventListener("blur", handleFocus, false);
```

Our handler for this shows how we can also toggle CSS classes on an element:

```javascript
export const handleFocus = event => {
  const select = event.currentTarget;
  select.classList.toggle("focussed");
};
```

This has been a whistle-stop run-through of some popular jQuery functions and their equivalent. The table below gives some more, as well as some note about them.

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

### Resources
- [(Now more than ever you) might not need jQuery](https://css-tricks.com/now-ever-might-not-need-jquery/)
- [MDN: Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element)
