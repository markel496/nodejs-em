/** Нужно написать код, который оставит в объекте только свойства, которые являются четными числами. Исходные объект изменять нельзя: */

const obj = { prop1: 1, prop2: 2, prop3: true, prop4: 'test', prop5: 10 }
const resultObj = {}

for (const key in obj) {
  if (typeof obj[key] === 'number' && !(obj[key] % 2)) {
    resultObj[key] = obj[key]
  }
}

console.log(resultObj) // { prop2: 2, prop5: 10 }
