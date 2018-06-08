# Style. Style? Style!

This week we discuss styling, what works, what is hard and how component systems
can help us with it. We look at `S'unya's 3 levels of styling^tm` and CSS
modules as one of the css in js solutions.

## CSS, the good

-   It is very easy to share styles
-   It allows us to separate look from markup - Separation of concerns
-   It is very powerful - filters, gpu accelerated hardware, parallel processed,
    non-blocking

## CSS, the hard:

-   It is very easy to break styles unexpectedly - class name clashes,
    unexpected cascade, etc
-   It is easy to get into selector war - .selector.other-selector, !important
-   There are some obscure rules - who remembers the numeric values of the
    selectors, e.g?
-   Names are hard, organisation is hard

We all know that the most efficient way to use CSS is starting generally and
selectively becoming more and more precise in selection. We run into trouble
around 2 main areas that are really the sides of the same coin, going too
specific too soon and thinking really broadly.

Some people may be able to hold the broad shape with many variables in their
head, but I think it is safe to say that humans, generally are bad at thinking
very abstractly and broadly; rather we are better at solving specific proplems.
This means that we will usually go to specific cases very quickly. There is
nothing wrong with this if we then refactor as we find shared styles etc, but
that seldom ever happens, especially if there are multiple developers on the
same project.

There are a number of tools that have come about to deal with this difficulty,
but they fall into 2 main approaches:

1.  Use a code framework, like bootstrap, etc that formalise some of the mental
    frameworks and provide time tested code.
2.  Use a mental framework like BEM, ITCSS, OOCSS that provides a ruleset of
    what to do, when

In this workshop, the aim is to show how component based programming can inform
this and how it makes things easier to reason about.

Before we do that, let me say that if you are happy with styling the way that
you style then just add your stylesheets and classes and go forth and make! None
of the following is necessary beyond the fact that it aims to make less work,
more flexibility and more reusability.

### How CSS and components work together:

-   React/Component based development helps solve some of the problems in CSS
    because they help us think about styles in a different way (see below)
-   Equally CSS helps us think about Components so that they are more reusable
-   CSS-Modules help solve the problem of styles clashing

### S'unya's 3 types of style

Conceptually there are **3 main types of Style** (most general down to most
specific):

1.  **THEME STYLES** - font, colours, spacing, metrics: These are usually shared
    by pretty much every part of a web application. Theme styles will be set
    once per project and then not again. The next project will need exactly the
    same theme elements set, so it is boilerplate and can be parametised.
2.  **CONTEXTUAL STYLES** - difference between a Primary button and a secondary
    button; the way a modal component animates in, or the colour of the modal
    background: These need to be context specific, and _will often_ be shared by
    other parts of the application. Contextual styles will be defined by ..er,
    context... They will be the most changing and project specific styles.
3.  **DEFINITION STYLES** - group of 3 items, a modal component styles for
    placing it above everything else; These are almost never shared except
    between similar components. Will be set once per entire lifetime of the
    component (assuming that the whole scope of the component is realised). The
    component may be used in many projects but these will not change (though in
    reality they will be refined over time as new usages are realised).
4.  **HELPERS** - The unspoken 4th type. These tend to be shared across multiple
    projects, like definition styles, but unlike definition styles they are used
    accross the projects. They will be things like `.visually-hidden` or (not
    that you need them) `.clearfix` and can possibly include some styles for
    common layout manoevres.

All this is just a way of ring fencing styles based on the observations above
about what is hard. The aim is that themeing styles will be boilerplate with
variables, Components will be shipped with their definition styles. Then
contextual styles will arise out of project needs. The theme and definition
types of styles will be very easy to reason about because they are specific, the
hard part will be working out what styles to leave out, but you can go with
sensible defaults.

Then the styles that one works with in the application are the contextual
styles.

### Enough theorising, give me examples

Let's look at this Component:

```javascript
export const FullScreenImage = () => (<figure><img src=”red-alert.png” alt=”HELP!”></figure>);
```

We can tell that we could only use that code in an emergency. So we could make
it more flexible with:

```javascript
export const FullScreenImage = ({src, alt}) => (<figure><img src={src} alt={alt}></figure>);
```

Better… but what about this:

```javascript
export const FullScreenImage = ({src, alt}) => (<figure style={{border: “10px solid red”}}><img src={src} alt={alt}></figure>);
```

Or

```javascript
export const FullScreenImage = ({src, alt}) => (<figure className=”DefCon1”><img src={src} alt={alt}></figure>);
```

In much the same way, they are as un-reusable as the first example... So how do
we make them more reusable?

We can apply our observations from above:

-   We separate out the styles into our 3 types
    1.  We treat theming and context based styles to be Props or conceptually
        similar to Props (in that they are applied from the outside)
    2.  We treat styles that define the component as defined in the Component -
        with optional override from context
-   At the same time we do the same thing for our Component functionality…
    Unless the content of our component defines it, we can tell that it must be
    contextual.

In this case, we need our image to be fullscreen for it to be a "fullscreen
image", so the styles that make that

```css
/* fullScreenImage.css */
.fullscreenImage {
    height: 100vh;
    width: 100vw;
}
.image {
    object-fit: cover;
    min-height: 100%;
    min-width: 100%;
}
```

```javascript
// FullScreenImage.jsx
import style from './fullScreenImage.css';

export const FullScreenImage = ({src, alt}) =>
(<figure className={style.fullscreenImage}>
    <img className={style.image} src={src} alt={alt}>
</figure>);
```

Okay, so now we have a component that makes a full screen image and we can
re-use it... BUT how do we make our Emergency FullScreenImage? The answer is it
depends if you need to re-use the functionality as an EmergencyFullScreenImage
component or, if the context of the FullScreenImage component is the
emergency... This might seem like nitpicking but this decision is at the heart
of where component systems help us reason about our CSS. I will show each option
below; first the component.

```css
/* emergencyFullScreenImage.css */
.emergencyFullScreenImage {
    composes: fullScreenImage from "./fullScreenImage.css";
    border: 10px solid red;
}
```

```javascript
// EmergencyFullScreenImage.js
import style from './emergencyFullScreenImage.css';

export const EmergencyFullScreenImage = ({src, alt}) =>
(<figure className={style.emergencyFullScreenImage}>
    <img src={src} alt={alt} className={style.image}>
</figure>);
```

Our New component is an extension of the original component, it is exactly the
same js except that it imports the `emergencyFullScreenImage.css`. In the css we
use the CSS Modules `compose` function to compose the styles from the original
and then we can add our new styles below.

The other option is to pass in the new styles from e.g. `EmergencyPage.js`.

```css
/* emergencyFullScreenImage.css */
.emergencyFullScreenImage {
    border: 10px solid red;
}
```

```javascript
// FullScreenImage.jsx
import style from './fullScreenImage.css';

export const FullScreenImage = ({src, alt, contextualStyles}) =>
(<figure className={[style.fullscreenImage, contextualStyles].join(' ')}>
    <img className={style.image} src={src} alt={alt}>
</figure>);

// EmergencyPage.jsx
import emergencyStyle from './defcon.css';
import { FullScreenImage } from './components/FullScreenImage';

export const EmergencyPage = () => (
    <main>
        <FullscreenImage contextualStyles={emergencyStyle.emergencyFullScreenImage} src="help.jpg" alt="HElp! />
        <div>
            <h1>HELP!!!!</h1>
        </div>
    </main>
)
```

Above we have modified our `FullScreenImage` component to have a slightly new
API; we now allow parent components (the context) to pass in `contextualStyles`.
In `EmergencyPage` we pass in the styles from our context's css that we want to
apply.

## Now it's your turn

The aim of the lesson is to go through the process of differentiating between
structure, content and styles that define a component and contextual structure,
content and styles that one would pass in to components.

You can get setup like this:

1.  `npm i -g preact-cli`
2.  `preact create aerian-studios/stripy-starter my-project`
3.  run `npm start` to compile, watch and serve the code.

Make some styles for our website.
[https://stackblitz.com/edit/stripes-xyz](https://stackblitz.com/edit/stripes-xyz)

Have a look at the finished example (with a bit more, because it is the example
for next week too... and the week after) if you want some examples:
[https://github.com/aerian-studios/stripy-state](https://github.com/aerian-studios/stripy-state)

## Further reading

https://github.com/css-modules/css-modules
