# State Machines - the rise of the robot ...er goverment :robot:

## What are State Machines and like... Why?

State Machines are a way of declaring and formalising the states that something
can exist in and how and when it can transition from one state to another. They
specifically define the relationship between different states and importantly,
don't allow any other relationship to occur. This makes them really good for
some things and not so good for others. They would be very useful for describing
the on/off state of a checkbox, or the angle of the hands of a clock for example
because they have a finite set of states and a finite set of inputs (ways that
something can change). On the other hand, they are bad at describing the the
position of something that hasn't a fixed set of positions (think cars on a
track or people at a festival vs tick-tack-to or chess).

Why? There are 3 good reasons to use them:

1. They are a very compact way to describe the states of something.
2. They are easy to design and reason about (when they aren't too complex) - you
   can even generate pretty pictures to help you
3. They are highly automatable/testable because they have fixed states, inputs
   and transitions
