const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ---------------- API ROUTES ----------------
app.post('/api/signup', (req, res) => {
  const { fullname, email, phone, password } = req.body;
  console.log('Signup:', { fullname, email, phone });
  res.json({ status: 'success', message: 'Account created! Go verify payment.', userId: Date.now().toString() });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if(email && password){
    res.json({ 
      status: 'success', 
      message: 'Login successful!', 
      user: { id: '123', fullname: 'Welcome Member' } 
    });
  } else {
    res.json({ status: 'error', message: 'Invalid details' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  res.json({ status: 'success', message: 'Payment confirmed! Account activated.' });
});

app.get('/api/surveys', (req, res) => {
  const surveys = [
    { id:1, title: 'Customer Satisfaction', description: '10 questions', reward: '50 Ksh' },
    { id:2, title: 'Market Research', description: 'Opinion survey', reward: '120 Ksh' },
    { id:3, title: 'Shopping Habits', description: 'Short questions', reward: '80 Ksh' }
  ];
  res.json({ status: 'success', surveys });
});

// ✅ NEW SAFE METHOD — NO * OR /* ANYMORE!
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅✅✅ Gateway Digital running perfectly at: http://localhost:${PORT}`);
});