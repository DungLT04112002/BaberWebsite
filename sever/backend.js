const express = require('express');
const mysql = require('mysql');

const app = express();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'babershopweb',
});
app.set('views', './views')
app.set('view engine', 'ejs')

// Route to handle GET requests to fetch data from Merchandise table
app.get('/`merchandise`', (req, res) => {
  // Perform a query to fetch data from Merchandise table
  connection.query('SELECT * FROM merchandise', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }

    // Check if there are results returned
    if (results.length === 0) {
      console.log('No data found in Merchandise table');
      res.status(404).json({ message: 'No data found' });
      return;
    }

    // Log the fetched data to the console
    console.log('Data fetched from Merchandise table:');
    console.log(results); // Log the results array

    // Send the fetched data as JSON in the HTTP response
    res.json(results);
  });
});

// Start the Express server and listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
