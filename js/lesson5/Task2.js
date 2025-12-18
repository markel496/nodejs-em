/** Написать функцию, которая принимает в себя объект, и строку со значением ‘keys’ или ‘values’. Вернуть нужно, либо массив ключей объекта либо массив значений объекта. Дефолтное значение для параметра, который определяет, что нужно вернуть равен ‘keys’. Если же сам объект не передан, или он передан другой тип данных, то нужно вернуть false. 

Примечание: реализовать нужно как в формате стрелочной так и обычной функци.  */

// В формате обычной функци:
function getObjectData(obj, mode = 'keys') {
  if (
    typeof obj !== 'object' ||
    Array.isArray(obj) ||
    !obj ||
    (mode !== 'values' && mode !== 'keys')
  ) {
    return false
  }
  if (mode === 'keys') {
    return Object.keys(obj)
  }
  return Object.values(obj)
}

// В формате стрелочной функци:
const getObjectData2 = (obj, mode = 'keys') => {
  if (
    typeof obj !== 'object' ||
    Array.isArray(obj) ||
    !obj ||
    (mode !== 'values' && mode !== 'keys')
  ) {
    return false
  }

  return mode === 'keys' ? Object.keys(obj) : Object.values(obj)
}
