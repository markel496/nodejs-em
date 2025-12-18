/** Есть 2 функции, которые отправляют запрос. Запрос имитируется при помощи setTimeout, в шаблоне кода эти функци будут определены. Одина из функци точно вернет ошибку. Нужно написать код, который выполнит запросы параллельно, но вернет ошибку, если один из запросов будет неуспешен. Результат нужно вывести в консоль */

const Request1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 100)
  })

const Request2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Ошибка')
    }, 100)
  })

Promise.all([Request1(), Request2()]).catch(console.log)
