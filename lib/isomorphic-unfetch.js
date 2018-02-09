export const emoji = 
    [
        { "code": "dog", "moji": "🐶", "base": "dog" }, 
        { "code": "sign of the horns", "moji": "🤘", "base": "sign_of_the_horns"},
        { "code": "sign of the horns(p)", "moji": "🤘🏼", "base": "sign_of_the_horns"},
        { "code": "sign of the horns(ye)", "moji": "🤘🏽", "base": "sign_of_the_horns"},
        { "code": "sign of the horns(br)", "moji": "🤘🏾", "base": "sign_of_the_horns"},
        { "code": "sign of the horns(bk)", "moji": "🤘🏿", "base": "sign_of_the_horns"},
        { "code": "sign of the horns(wh)", "moji": "🤘🏻", "base": "sign_of_the_horns"}
    ]


export const mockJson = jest.fn().mockReturnValue(emoji);

export const mockFetch = jest.fn().mockReturnValue({
    json: mockJson
});

export default mockFetch;

global.fetch = mockFetch;