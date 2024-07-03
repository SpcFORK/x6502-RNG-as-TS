/** @type {Generator<number, any, number>} */
let gen = B8RNG255(1, (state) => {
  console.log(state.lastVal());
})

gen.next();