import * as React from "react";
import { KeyProps } from "./Key";

export const withRedBorder = (
    MyKey: React.SFC<KeyProps>
): React.SFC<KeyProps> => ({ style, ...rest }) => (
    <MyKey {...rest} style={{ ...style, border: "1px red solid" }} />
);
