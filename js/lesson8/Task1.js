/** Есть 2 функции, которые отправляют запрос. Запрос имитируется при помощи setTimeout, в шаблоне кода эти функци будут определены. Нужно написать код, который позволит поочередно выполнить эти запросы. Сначала Request1, потом Request2. Вывести в консоль результат выполнения функций

Примечание: должно быть 2 реализации, как через .then так и через async await.

 */

const Request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success request1')
    }, 1000)
  })

const Request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success request2')
    }, 1000)
  })

// через async/await
async function func() {
  const result1 = await Request1()
  console.log(result1)
  const result2 = await Request2()
  console.log(result2)
}
func()

// Через .then
Request1()
  .then((result) => {
    console.log(result)
    return Request2()
  })
  .then((result) => console.log(result))
