# Week 09: ⚛️ React ⚛️

This week we are introducing something new and exciting: React. This is a
frontend library created by Facebook, which has become incredibly popular over
the past few years, both on the web and via React Native for creating native
mobile apps.

On the web, React works by taking over a DOM element on the page, and rendering
itself to it. We've already set up our environment with Webpack, so we can get
started by adding our React `<div>` in index.html, and importing the compiled JS
bundle.

```html
<!-- ... -->
<head>
  <script async defer src="dist/bundle.js" type="text/javascript"></script>
</head>

<body>
  <div id="app"></div>
<!-- ... -->
</body>
```

We've added the `defer` attribute to the script to ensure it loads after the
HTML.

In our `index.js`, we're no longer loading a `run()` function as we did before:
we're just importing our initial `week09/index.tsx` file, which is our React
entry point.

```js
import "./week09/index.tsx";
```

You'll note that we're using the extension `tsx`, not `js`. This is because
we'll be working in TypeScript this week. This isn't required, but it gives us a
lot of useful tools later on. The `x` indicates that this is a React file, which
tells the compiler to allow syntax that would be illegal in regular TypeScript
or JavaScript.

Let's continue by creating our `index.tsx` file in this folder.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello world</h1>, document.getElementById("app"));
```

Let's walk through what's going on here. FIrst we need to import React and
ReactDOM. The ReactDOM method is the part that actually renders our app into the
web page. It's passed two paramters. The second is simply the DOM element we
created before. The first one is the odd one. We're not used to putting HTML
straight into a JavaScript or TypeScript file, because it would be a syntax
error. However in a JSX or TSX file it is allowed, and the compiler converts it
to function calls. The code we have there is compiled to this:

```ts
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
    React.createElement("h1", {}, "Hello world"),
    document.getElementById("app")
);
```

If we want to see our code we need to start the Webpack compiler anmd dev
server. We have scripts for these, so in separate terminals run
`npm run webpack:dev` and `npm run serve`. This will launch the browser and
hopefully we should see **Hello world** at the top. Congratulations: you've made
your first React app!
