import * as React from "react";
export interface KeyProps {
    label: string;
    onClick: (label?: string) => void;
    disabled?: boolean;
    style?: any;
}

export const Key: React.SFC<KeyProps> = ({ label, onClick, ...rest }) => (
    <button onClick={() => onClick(label)} {...rest}>
        {label}
    </button>
);
