# React, simple in reality

This week we decided to dump all the "baggage" (to quote Hannah) and just focus
on getting people making things with React. We dropped TypeScript, tests and
Function Programming concerns (:shocked_face_with_exploding_head:) because they
were getting in the way of people seeing React for what it is: a really easy way
to understand and build UI.

We used the excellent
[stackblitz react starter](https://stackblitz.com/fork/react) to get everybody
going. The starter is a really good place to start learning basic React for a
number of reasons:

1.  It shows "html" markup right from the start, so users can see that they can
    just compose a familiar html page if they want to.
2.  If the user is ready, it shows a really simple Stateless Functional
    Component and how to use it. It is setup so that it is fairly obvious that
    you can just put more html markup in it.
3.  It shows the most simple case for using css with react - this conversation
    often gets needlessly complicated.
4.  Finally it also provides an example of a Stateful component if the user is
    ready.

We were assuming that people who were new to React would be able to make
something straight away, even if they weren't able to do everything that they
might want without asking for help. So we created a fictional company called
Zebra Café and gave our brief.

1.  Build the Zebra Café single page website with React
2.  The Zebra brand requires that everything is alternating black and white.
3.  There should be images (of black and white) from https://loremflickr.com/
4.  There should/could be a button to switch the blacks to whites and the whites
    to blacks.
5.  You might want to think about using reusable components to make it easy - if
    you need help, ask
6.  You might want to use local State - if you need help, ask

We discussed various topics duing the session and gave examples of using State
in buttons, using the style object on components, etc. The following are
examples generated in the session.

*   [S'unya's base example using grid and wrapping components for the logic](https://stackblitz.com/edit/react-lxu1xt)
*   [Simon's HOC ftw example](https://stackblitz.com/edit/react-si)
