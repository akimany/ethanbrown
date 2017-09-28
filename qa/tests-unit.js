// it might be said:
var aboutArr = require('../lib/aboutArr.js')
var expect = require('chai').expect

suite('Array tests', () => {
  test('getArray() should return a string', () => {
    expect(typeof aboutArr.getArray() === 'string')
  })
})
