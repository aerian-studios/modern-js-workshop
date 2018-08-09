export const statechart = {
  initial: 'a',
  states: {
    a: {
      on: {
        NEXT: 'b',
      },
      onEntry: 'sayHello',
    },
    b: {
      on: {
        NEXT: 'a',
      },
      onEntry: 'sayCiao',
    },
  },
};