export const compose = (...fns) =>
    fns
        .reverse()
        .reduce(
            (prevFn, nextFn) => (value) => nextFn(prevFn(value)),
            (value) => value
        );

export const pipe = (...fns) =>
    fns.reduce(
        (prevFn, nextFn) => (value) => nextFn(prevFn(value)),
        (value) => value
    );
