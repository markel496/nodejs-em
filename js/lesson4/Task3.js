const obj = {
	prop1: null,
	prop2: {},
	prop3: 3,
	prop4: 'str',
	prop5: 100,
}
const result = {};
...
console.log(result); // {null: 1, object: 1, string: 1, number: 2}