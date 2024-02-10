const {test, expect} = require(`@jest/globals`)
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


test('normalize 1', () => {
    const url = 'https://jestjs.io/docs/getting-started'
    const valid = 'jestjs.io/docs/getting-started'
    expect(normalizeURL(url)).toBe(valid)
})


test('normalize 2', () => {
    const url = 'https://jestjs.io/'
    const valid = 'jestjs.io/'
    expect(normalizeURL(url)).toBe(valid)
})


test('normalize 3', () => {
    const url = 'https://amazon.jobs/en/search?offset=0&result_limit=10&sort=recent&category%5B%5D=fulfillment-operations-management&country%5B%5D=USA&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=&city=&country=&region=&county=&query_options=&'
    const valid = 'amazon.jobs/en/search?offset=0&result_limit=10&sort=recent&category%5B%5D=fulfillment-operations-management&country%5B%5D=USA&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=&city=&country=&region=&county=&query_options=&'
    expect(normalizeURL(url)).toBe(valid)
})


test('getURLs 1', () => {
    const html = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    const urls = getURLsFromHTML(html)
    expect(urls.length === 1)
})

