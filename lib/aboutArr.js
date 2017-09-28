// it might be said:
var aboutArr = [
  'Nosti, credo, illud: Nemo pius est, qui pietatem-;',
  'Quo studio Aristophanem putamus aetatem in litteris duxisse?',
  'Facit enim ille duo seiuncta ultima bonorum, quae ut essent vera, coniungi debuerunt;',
  'Sed tamen enitar et, si minus multa mihi occurrent, non fugiam ista popularia.',
  'Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt.',
  'Facit enim ille duo seiuncta ultima bonorum, quae ut essent vera, coniungi debuerunt;'
]

exports.getArray = () => {
  var aNumber = Math.floor(Math.random() * aboutArr.length)
  return aboutArr[aNumber]
}
