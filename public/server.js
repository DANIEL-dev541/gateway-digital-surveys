const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/signup', (req, res) => {
  res.json({ status: 'success', message: 'Created', userId: '123' });
});

app.post('/api/login', (req, res) => {
  res.json({ status: 'success', user: { fullname: 'User' } });
});

app.post('/api/verify-payment', (req, res) => {
  res.json({ status: 'success', message: 'Verified' });
});

app.get('/api/surveys', (req, res) => {
  res.json({ surveys: [{title: 'Test', reward: '50 Ksh'}] });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Running on http://localhost:${PORT}`);
});