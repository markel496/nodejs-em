/** Есть 2 функции, которые отправляют запрос. Запрос имитируется при помощи setTimeout, в шаблоне кода эти функци будут определены. Одина из функци точно вернет ошибку. Нужно написать код, который обработает хотя бы один успешный ответ и выведет результат в консоль: */

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

// первый успешно выполненный промис
Promise.any([Request1(), Request2()])
  .then(console.log)
  .catch((err) => console.log(err.errors))

// массив всех успешно выполненных промисов
Promise.allSettled([Request1(), Request2()])
  .then((result) =>
    result.reduce((acc, item) => {
      if (item.status === 'fulfilled') {
        acc.push(item.value)
      }
      return acc
    }, [])
  )
  .then(console.log)
