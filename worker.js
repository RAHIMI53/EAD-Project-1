function processData(number) {
    // Simulate heavy data processing: calculate the sum of square roots of a large number of integers
    let result = 0;
    for (let i = 0; i < number; i++) {
        result += Math.sqrt(i);
    }
    return result;
}

self.onmessage = function(event) {
    const number = event.data;
    const result = processData(number);
    self.postMessage(result);
};
