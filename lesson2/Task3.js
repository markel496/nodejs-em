const a = true
const b = true
const c = true

/** С использованием if else */
let res

if (c) {
  res = a || b
} else {
  res = a && b
}

/** С использованием тернарного оператора */
const result = c ? a || b : a && b
