const eslintConfig = require('../eslint-config.json')



describe('The rules', () => {
  it('should not change', () => {
    expect(eslintConfig.rules).toMatchSnapshot()
  })
})
