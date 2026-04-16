document.getElementById('load-button').addEventListener('click', () => {
    document.getElementById('status').textContent = 'Loading...';

    const PROMISE = new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            setTimeout(() => {
                resolve('Data loaded successfully');
            }, 2000);
        } else {
            setTimeout(() => {
                reject('Data not loaded');
            }, 2000);
        }
    });

    PROMISE.then((data) => {
        document.getElementById('status').textContent = data;
    })
    .catch((error) => {
        document.getElementById('status').textContent = error;
    })
    .finally(() => {
        document.getElementById('status').textContent += ' - Operation completed';
    });
});