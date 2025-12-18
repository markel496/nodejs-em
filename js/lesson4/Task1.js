/** Нужно написать код, который проверит, является ли объект пустым. */

const obj = {}
let isEmpty = true

for (const key in obj) {
  isEmpty = false
}

console.log(isEmpty) // true
