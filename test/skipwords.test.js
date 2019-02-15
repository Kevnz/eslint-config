const eslintConfig = require('../eslint-config.json')
const skipWords = eslintConfig.rules['spellcheck/spell-checker'][1].skipWords

function hasDuplicates(arr) {

  let x = {}
  let len = arr.length

  for (let i = 0; i < len; i++) {
      if (x[arr[i]] === true) {
           return true;
      }
      x[arr[i]] = true;
  }
  return false;
}
describe('The Spelling rules', () => {
  it('should not change', () => {
    expect(skipWords).toMatchSnapshot()
  })
  it('should not have duplicates', () => {
    expect(hasDuplicates(skipWords)).toBe(false)
  })
});