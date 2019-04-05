import { capitaliseWord } from "./stringUtilities";

export const splitOutUsernames = (username) =>
    username.map((user) => {
        const { name, familyName } = user;

        return `${capitaliseWord(name)} ${capitaliseWord(familyName)}`;
    });

export default splitOutUsernames;
