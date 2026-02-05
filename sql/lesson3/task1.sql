/* Из прошлой практики у нас есть таблицы users и categories. Нужно написать запрос, который вернет уникальные имена пользователей и запрос, который вернет уникальные названия категорий. */

SELECT DISTINCT name FROM users;
SELECT DISTINCT name FROM categories;