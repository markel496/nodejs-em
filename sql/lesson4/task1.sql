/** Нужно написать запрос, который создаст таблицу с адресами пользователей. В таблице должны быть следующие поля:

id SERIAL PK
address VARCHAR(255)
users_id SERIAL FK

users_id - это внешний ключ, который определяет связь с таблицу users. Далее нужно написать запрос, который добавить 10 адресов и свяжет их 4 любыми пользователями из таблицы users. 

Написать запрос, который получит все адреса и фамилии связанных с ними пользователей. */



CREATE TABLE Addresses
(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    users_id INTEGER REFERENCES users (id)
);

INSERT INTO Addresses(users_id, address) 
VALUES
((SELECT Id FROM users WHERE Surname='Маркелов'), 'Address 1'),
((SELECT Id FROM users WHERE Surname='Морозова'), 'Address 2'),
((SELECT Id FROM users WHERE Surname='Мушкин'), 'Address 3'),
((SELECT Id FROM users WHERE Surname='Пупкин'), 'Address 4'),
(NULL, 'Address 5'),
(NULL, 'Address 6'),
(NULL, 'Address 7'),
(NULL, 'Address 8'),
(NULL, 'Address 9'),
(NULL, 'Address 10');

SELECT address, surname
FROM Addresses
LEFT JOIN users
ON Addresses.users_id = users.id;
