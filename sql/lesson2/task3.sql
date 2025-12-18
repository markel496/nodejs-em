/* Написать запрос, который удалит первые 2 записи из таблицы users. */

DELETE FROM users
WHERE id IN (
  SELECT id FROM users
  ORDER BY id
  LIMIT 2
);