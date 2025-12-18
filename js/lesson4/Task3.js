/** Дан объект, в значениях которого может быть любой тип данных. Нужно написать код, который посчитает, сколько каждого типа данных встречалось в объекте. Исходный объект мутировать нельзя. Примечания: Результат должен соответствовать тем типам данных, которые есть в JS. Разбор типов уже был выше. Если тип данных не встречается, то в результате должно быть 0.
 */

const obj = {
  prop1: null,
  prop2: {},
  prop3: 3,
  prop4: 'str',
  prop5: 100
}
const result = {}

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

console.log(result)
// { number: 2, boolean: 0, string: 1, object: 1, bigint: 0, undefined: 0, null: 1, symbol: 0 }
