/* Написать запрос, который вернет сгруппирует users по возрасту и вернет их количество, и количество людей с определенным возрастом должно быть больше 2. */

SELECT age, COUNT(*) AS UsersCount
FROM users
GROUP BY age
HAVING COUNT(*) > 2;