import * as React from "react";

import { ucfirst } from "../lib/emojilib";

interface MyProps {
    categories: string[];
    value: string;
}

const makeAnOption = (category: string) => {
    return (
        <option value={category} key={category}>
            {ucfirst(category)}
        </option>
    );
};

type Props = MyProps & React.DOMAttributes<{}>;

export const CategorySelector: React.SFC<Props> = ({ categories, ...rest }) => (
    <select {...rest}>{categories.map(makeAnOption)}</select>
);
