import {
    makeExtractFunctionByCategory,
    fetchEmojis,
    insertEmoji,
    extractMojis,
    join,
} from "../lib/emojilib.js";
import { compose } from "../lib/compose.js";

export const calculateBaseFromSquare = (squareNum) => Math.sqrt(squareNum);

export const calculateCube = (base) => base ** 3;

export const calculateCubeFromSquare = (squareNum) =>
    calculateCube(calculateBaseFromSquare(squareNum));

export const getFaces = makeExtractFunctionByCategory("faces");

export const getGestures = makeExtractFunctionByCategory("gestures");

export const makeACrowd = compose(join, extractMojis, getFaces);

export const getFacesEmojiString = makeACrowd;

export const emojiStringGetterByCategory = (category) =>
    compose(join, extractMojis, makeExtractFunctionByCategory(category));

export const getGesturesEmojiString = compose(join, extractMojis, getGestures);

const run = async () => {
    const emojis = await fetchEmojis();

    const crowd = makeACrowd(emojis);
    insertEmoji(crowd);
};

export default run;
