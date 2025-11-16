const Request1 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success request1');
	}, 100)
});

const Request2 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success request2');
	}, 100)
});

// через async/await

// Через .then