document.addEventListener('DOMContentLoaded', function() {
    const processWithoutWorkersBtn = document.getElementById('process-without-workers');
    const processWithWorkersBtn = document.getElementById('process-with-workers');
    const resultContainer = document.getElementById('results');
    const numberInput = document.getElementById('number');

    processWithoutWorkersBtn.addEventListener('click', processWithoutWorkers);
    processWithWorkersBtn.addEventListener('click', processWithWorkers);

    function processData(number) {
        // Simulate heavy data processing: calculate the sum of square roots of a large number of integers
        let result = 0;
        for (let i = 0; i < number; i++) {
            result += Math.sqrt(i);
        }
        return result;
    }

    function processWithoutWorkers() {
        const number = parseInt(numberInput.value);
        if (isNaN(number) || number <= 0) {
            alert("Please enter a valid number.");
            return;
        }
        const startTime = performance.now();
        const result = processData(number);
        const endTime = performance.now();
        displayResult("Without Workers", result, endTime - startTime);
    }

    function processWithWorkers() {
        const number = parseInt(numberInput.value);
        if (isNaN(number) || number <= 0) {
            alert("Please enter a valid number.");
            return;
        }
        const startTime = performance.now();
        const worker = new Worker('worker.js');
        worker.postMessage(number);
        worker.onmessage = function(event) {
            const endTime = performance.now();
            displayResult("With Workers", event.data, endTime - startTime);
        };
    }

    function displayResult(type, result, time) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
            <h3>${type}</h3>
            <p>Result: ${result}</p>
            <p>Time: ${time.toFixed(2)} milliseconds</p>
        `;
        resultContainer.appendChild(resultDiv);
    }
});
