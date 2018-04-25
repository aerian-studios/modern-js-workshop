# Week 10: ⚛️ Further adventures in React ⚛️

We continue this week with our React project from our last session. We begin
with a review of React components.

There are two types of component that we deal with, but at their core they are
both just **a function that returns some JSX**. Class components do this via an
object with a `render()` method, while functional components are just the
function.

We can mix and match the components that we return, and with ReactDOM they can
be DOM elements or custom components. The rule is that the function must either
return a single wrapper component (which can have as many child components as
they'd like), or the components must be wrapped in JSX fragment identifiers
(which are just empty tags):

```jsx
//Valid
export const MyComponent = () => (
    <div>
        <h1>Hello</h1>
        <p>World</p>
    </div>
);
//Valid:
export const MyComponent = () => (
    <>
        <h1>Hello</h1>
        <p>World</p>
    </>
);

//Invalid:
export const MyComponent = () => (
    <h1>Hello</h1>
    <p>World</p>
);
```
