const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple expense schema
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.get('/', (req, res) => {
    // Retrieve expenses from the database using promises
    Expense.find({})
      .then(expenses => {
        res.render('index', { expenses });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

  app.post('/addExpense', (req, res) => {
    // Add new expense to the database
    const { description, amount } = req.body;
    const newExpense = new Expense({ description, amount });
  
    newExpense.save()
    .then(() => {
      // Redirect to the home page after adding the expense
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  });  

  app.get('/clearHistory', (req, res) => {
    Expense.deleteMany({})
      .then(() => {
        console.log('Expense history cleared.');
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/clearHistory', (req, res) => {
    Expense.deleteMany({})
      .then(() => {
        console.log('Expense history cleared.');
        res.json({ success: true });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
