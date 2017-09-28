// it might be said:
suite('"About" Page Tests', () => {
  test('Page should contain link to contact page', () => {
    assert($('a[href="/contact"]').length)
  })
})
