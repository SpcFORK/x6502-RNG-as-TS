const ele = document.querySelector('#rng')

/** @type {Generator<number, any, number>} */
let gen = quickB8RNG255(22, 10)

let vals = [...gen]
ele.innerHTML = vals.join(', ')