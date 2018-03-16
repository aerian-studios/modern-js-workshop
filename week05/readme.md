## Week 5: :rocket: Welcome to the future :rocket:

This week we look at how we can use modern JS even in old environments, by using bundlers and transpilers.
We started by looking at how browser modules had a useful mechanism for supporting older browsers, by providing a "nomodule" fallback. We could point this at a bundled JS file that was in a format supported by old browsers.

First, we updated our `index.html` to point at the bundle (which doesn't exist yet)

```html
  <script type="module" src="index.js"></script>
  <script nomodule src="dist/bundle.js" type="text/javascript"></script>
```

Adding the `nomodule` attribute means that module-aware browsers ignore the bundle. Old browsers don't understand the attribute, but that's OK as they'll load it by default anyway.
