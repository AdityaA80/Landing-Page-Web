// Form Toggle
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const showSignIn = document.getElementById('showSignIn');
const showSignUp = document.getElementById('showSignUp');
const registerMessage = document.getElementById('registerMessage');

showSignIn.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.style.display = 'none';
  signinForm.style.display = 'flex';
});

showSignUp.addEventListener('click', (e) => {
  e.preventDefault();
  signinForm.style.display = 'none';
  signupForm.style.display = 'flex';
});

// Form Submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData);
  
  // Simulate successful signup
  registerMessage.textContent = 'Sign up successful! Welcome to Lakshadweep!';
  registerMessage.classList.add('register__success');
  registerMessage.style.display = 'block';
  
  // Hide the signup form after successful registration
  setTimeout(() => {
    signupForm.style.display = 'none';
    signinForm.style.display = 'none';
    registerMessage.textContent = 'You are now signed in!';
    
    // Store sign-in status in localStorage
    localStorage.setItem('isSignedIn', 'true');
    
    // Redirect to index page after a short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 2000);
});

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(signinForm);
  const data = Object.fromEntries(formData);
  
  // Simulate successful signin
  registerMessage.textContent = 'Sign in successful! Welcome back!';
  registerMessage.classList.add('register__success');
  registerMessage.style.display = 'block';
  
  // Hide the signin form after successful login
  setTimeout(() => {
    signupForm.style.display = 'none';
    signinForm.style.display = 'none';
    registerMessage.textContent = 'You are now signed in!';
    
    // Store sign-in status in localStorage
    localStorage.setItem('isSignedIn', 'true');
    
    // Redirect to index page after a short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 2000);
});

// Check for verification token in URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  verifyEmail(token);
}

async function verifyEmail(token) {
  try {
    const response = await fetch(`${API_URL}/verify?token=${token}`);
    const result = await response.json();

    if (result.success) {
      registerMessage.textContent = result.message;
      registerMessage.classList.add('register__success');
      registerMessage.style.display = 'block';
      
      // Show signin form after successful verification
      setTimeout(() => {
        signinForm.style.display = 'flex';
      }, 2000);
    } else {
      registerMessage.textContent = result.message;
      registerMessage.classList.add('register__error');
      registerMessage.style.display = 'block';
    }
  } catch (error) {
    registerMessage.textContent = 'An error occurred during verification.';
    registerMessage.classList.add('register__error');
    registerMessage.style.display = 'block';
  }
} 