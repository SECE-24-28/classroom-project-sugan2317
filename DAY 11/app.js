const express = require('express');
const app = express();
const PORT = 3001;

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Express.js!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
