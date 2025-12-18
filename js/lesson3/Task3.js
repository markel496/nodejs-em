/** Данн массив чисел, нужно написать код, который отсортирует только нечетные значения. */

const array = [10, 17, 5, 4, 10, 11, 3, 15, 20, 26, 1]

const oddSorted = array.filter((n) => n % 2).sort((a, b) => a - b)
let index = 0

const result = array.map((n) => (n % 2 ? oddSorted[index++] : n))

console.log(result) // [10,  1,  3,  4, 10, 5, 11, 15, 20, 26, 17]
