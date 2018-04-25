import * as React from "react";

interface MyProps {
    categories: string[];
}

const makeAnOption = (category: string) => {
    return (
        <option value={category} key={category}>
            {category}
        </option>
    );
};

type Props = MyProps & React.DOMAttributes<{}>;

export const CategorySelector: React.SFC<Props> = ({ categories, ...rest }) => (
    <select {...rest}>{categories.map(makeAnOption)}</select>
);
