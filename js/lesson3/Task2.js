const array = [2, 3, 4, 1, 2, 3, 4, 5]

// Код, который проверит, является ли массив отсортированным
let isSortedArray = array.every((el, i) => i === 0 || el >= array[i - 1])

console.log(isSortedArray) // false
