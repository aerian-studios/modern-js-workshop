import * as React from "react";
import { KeyProps } from "./Key";

export const withLogger = (
    MyKey: React.SFC<KeyProps>
): React.SFC<KeyProps> => ({ onClick, ...rest }) => {
    const didPress = (myLabel?: string) => {
        console.log("Pressed key", myLabel);
        onClick(myLabel);
    };

    return <MyKey onClick={didPress} {...rest} />;
};
