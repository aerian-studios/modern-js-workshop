export const emoji = [
  { code: "dog", moji: "🐶", base: "dog" },
  { code: "sign of the horns", moji: "🤘", base: "sign_of_the_horns" },
  { code: "sign of the horns(p)", moji: "🤘🏼", base: "sign_of_the_horns" },
  { code: "sign of the horns(ye)", moji: "🤘🏽", base: "sign_of_the_horns" },
  { code: "sign of the horns(br)", moji: "🤘🏾", base: "sign_of_the_horns" },
  { code: "sign of the horns(bk)", moji: "🤘🏿", base: "sign_of_the_horns" },
  { code: "sign of the horns(wh)", moji: "🤘🏻", base: "sign_of_the_horns" },
  { code: "guardsman(wh)", moji: "💂🏻", base: "guardsman" },
  { code: "guardsman(p)", moji: "💂🏼", base: "guardsman" },
  { code: "guardsman(ye)", moji: "💂🏽", base: "guardsman" },
  { code: "guardsman(br)", moji: "💂🏾", base: "guardsman" },
  { code: "guardsman(bk)", moji: "💂🏿", base: "guardsman" },
  { code: "guardsman", moji: "💂", base: "guardsman" }
];

export const mockFetch = jest.fn().mockReturnValue({
  json: jest.fn().mockReturnValue(emoji)
});

export default mockFetch;

global.fetch = mockFetch;
