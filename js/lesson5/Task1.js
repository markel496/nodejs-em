/** Продвинутые условные операторы. Задание 1: */
function checkNumbers(a, b, c) {
  if (a < 0 || b < 0 || c < 0 || a + b + c === 100) {
    console.log('Нет')
  }

  if (a > c + b) {
    console.log(-1)
  }

  if (a + b + c < 0) {
    console.log(500)
  } else {
    console.log(0)
  }
}

/** Продвинутые условные операторы. Задание 2: */
function checkSum(a, b) {
  const c = a + b > 100
  console.log(c ? 'Да' : 'Нет')
}

/** Продвинутые условные операторы. Задание 3: */

// С использованием if else
function logicSwitch(a, b, c) {
  if (c) {
    return a || b
  }
  return a && b
}

// С использованием тернарного оператора
function logicSwitch2(a, b, c) {
  return c ? a || b : a && b
}

/** Методы работы с массивами. Задание 1: */
const copyArray = (arr) => arr.slice()

/** Методы работы с массивами. Задание 2: */
const isSorted = (arr) => arr.every((el, i) => i === 0 || el >= arr[i - 1])

/** Методы работы с массивами. Задание 3: */
function sortOnlyOdd(arr) {
  const oddSorted = arr.filter((n) => n % 2).sort((a, b) => a - b)

  let index = 0

  return arr.map((n) => (n % 2 ? oddSorted[index++] : n))
}

/** Методы работы с объектами. Задание 1: */
const isEmpty = (obj) => {
  for (const key in obj) {
    return false
  }
  return true
}

/** Методы работы с объектами. Задание 2: */
function filterEvenValues(obj) {
  const resultObj = {}

  for (const key in obj) {
    if (typeof obj[key] === 'number' && !(obj[key] % 2)) {
      resultObj[key] = obj[key]
    }
  }

  return resultObj
}

/** Методы работы с объектами. Задание 3: */
function getObjectValueTypesCount(obj) {
  const types = [
    'number',
    'boolean',
    'string',
    'object',
    'bigint',
    'undefined',
    'null',
    'symbol'
  ]
  const result = {}

  for (const type of types) {
    result[type] = 0
  }

  for (const key in obj) {
    const value = obj[key]

    if (typeof value === 'function') continue

    if (value === null) {
      result['null']++
      continue
    }

    result[typeof value]++
  }

  return result
}
