// Handle Signup Form
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  if(signupForm){
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(signupForm);
      const data = Object.fromEntries(formData);

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const result = await res.json();
      
      const msgBox = document.getElementById('messageBox');
      msgBox.className = `alert ${result.status === 'error' ? 'error' : 'success'}`;
      msgBox.textContent = result.message;

      if(result.status === 'success'){
        localStorage.setItem('tempUserId', result.userId);
        setTimeout(() => window.location.href = 'verify.html', 1500);
      }
    });
  }

  // Handle Login Form
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const result = await res.json();

      const msgBox = document.getElementById('messageBox');
      msgBox.className = `alert ${result.status === 'error' ? 'error' : 'success'}`;
      msgBox.textContent = result.message;

      if(result.status === 'success'){
        localStorage.setItem('userId', result.user.id);
        localStorage.setItem('userName', result.user.fullname);
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
      } else if(result.status === 'unverified'){
        localStorage.setItem('tempUserId', result.userId);
        setTimeout(() => window.location.href = 'verify.html', 1500);
      }
    });
  }

  // Handle Payment Verification
  const verifyForm = document.getElementById('verifyForm');
  if(verifyForm){
    verifyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = localStorage.getItem('tempUserId');
      const transactionCode = document.getElementById('transCode').value;

      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, transactionCode})
      });
      const result = await res.json();

      const msgBox = document.getElementById('messageBox');
      msgBox.className = `alert ${result.status === 'error' ? 'error' : 'success'}`;
      msgBox.textContent = result.message;

      if(result.status === 'success'){
        localStorage.setItem('userId', userId);
        setTimeout(() => window.location.href = 'dashboard.html', 1500);
      }
    });
  }

  // Load Surveys
  const surveysContainer = document.getElementById('surveysContainer');
  if(surveysContainer){
    loadSurveys();
  }
});

async function loadSurveys(){
  const userId = localStorage.getItem('userId');
  if(!userId) {
    surveysContainer.innerHTML = `<div class="alert error">Please login first</div>`;
    return;
  }

  const res = await fetch(`/api/surveys?userId=${userId}`);
  const result = await res.json();

  if(result.status === 'error'){
    surveysContainer.innerHTML = `<div class="alert error">${result.message}</div>`;
  } else {
    let html = '';
    result.surveys.forEach(survey => {
      html += `
      <div class="card">
        <h3>${survey.title}</h3>
        <p>${survey.description}</p>
        <p class="reward">Reward: ${survey.reward}</p>
        <button class="btn" style="width:100%; margin-top:1rem;">Start Survey</button>
      </div>
      `;
    });
    surveysContainer.innerHTML = html;
  }
}