const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Function to validate numbers
const validateNumbers = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return 'Both num1 and num2 must be valid numbers';
    }
    return null;
};

// Centralized function to handle errors
const handleError = (res, errorMessage, statusCode = 400) => {
    return res.status(statusCode).json({ error: errorMessage });
};

// Route handler function for operations
function performOperation(req, res, operation) {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    console.log(`Received num1: ${num1}, num2: ${num2}, operation: ${operation}`); // Debugging line

    const error = validateNumbers(num1, num2);

    // If validation fails, return error message
    if (error) return handleError(res, error);

    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            // Handle division by zero
            if (num2 === 0) {
                return handleError(res, 'Cannot divide by zero', 400);
            }
            result = num1 / num2;
            break;
        case 'exponentiation':
            result = Math.pow(num1, num2);
            break;
        case 'sqrt':
            // Handle negative number input for square root
            if (num1 < 0) {
                return handleError(res, 'Cannot calculate square root of a negative number', 400);
            }
            result = Math.sqrt(num1);
            break;
        case 'modulo':
            result = num1 % num2;
            break;
        default:
            return handleError(res, 'Invalid operation', 400);
    }

    console.log(`Result of ${operation}: ${result}`); // Debugging line
    res.json({ result });
}

// Define API endpoints for basic and advanced operations
app.get('/add', (req, res) => performOperation(req, res, 'add'));
app.get('/subtract', (req, res) => performOperation(req, res, 'subtract'));
app.get('/multiply', (req, res) => performOperation(req, res, 'multiply'));
app.get('/divide', (req, res) => performOperation(req, res, 'divide'));
app.get('/exponentiation', (req, res) => performOperation(req, res, 'exponentiation'));
app.get('/sqrt', (req, res) => performOperation(req, res, 'sqrt'));
app.get('/modulo', (req, res) => performOperation(req, res, 'modulo'));

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Calculator Microservice! Use /add, /subtract, /multiply, /divide, /exponentiation, /sqrt, or /modulo with num1 and num2 as query parameters.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Calculator microservice running on http://localhost:${PORT}`);
});
