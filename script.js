const AkanNameGenerator = (() => {
  const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
  const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

  const init = () => {
      setupEventListeners();
      loadPreferences();
  };

  const setupEventListeners = () => {
      document.getElementById('akanForm').addEventListener('submit', handleSubmit);
      document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      clearMessages();

      const formData = new FormData(e.target);
      const { birthDate, gender } = Object.fromEntries(formData);

      if (!validateForm(birthDate, gender)) return;

      toggleLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API delay

      try {
          const akanName = calculateAkanName(birthDate, gender);
          showResult(`Your Akan name is ${akanName}!`);
          savePreferences(birthDate, gender);
      } catch (error) {
          showError(error.message);
      } finally {
          toggleLoading(false);
      }
  };

  const calculateAkanName = (dateString, gender) => {
      const date = new Date(dateString);
      const dayIndex = date.getDay();
      return gender === 'male' ? maleNames[dayIndex] : femaleNames[dayIndex];
  };

  const validateForm = (date, gender) => {
      if (!date || !gender) {
          showError('Please fill in all required fields');
          return false;
      }

      if (new Date(date) > new Date()) {
          showError('Birth date cannot be in the future');
          return false;
      }

      return true;
  };

  const toggleLoading = (isLoading) => {
      const button = document.querySelector('.cta-button');
      button.disabled = isLoading;
      button.querySelector('.button-text').textContent = isLoading ? 'Calculating' : 'Discover My Name';
  };

  const showResult = (message) => {
      const resultElement = document.getElementById('result');
      resultElement.textContent = message;
      resultElement.classList.add('show');
  };

  const showError = (message) => {
      const errorElement = document.getElementById('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
  };

  const clearMessages = () => {
      document.querySelectorAll('.result-card, .error-card')
          .forEach(el => {
              el.classList.remove('show');
              el.textContent = ""; // Clear messages
          });
  };

  const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
  };

  const loadPreferences = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
  };

  const savePreferences = (date, gender) => {
      // Future implementation: Store user preferences in localStorage
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", AkanNameGenerator.init);
// In app.js, modify the submit handler
// In app.js, modify the submit handler
akanForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.textContent = '';
    resultDiv.textContent = '';
    
    const formData = new FormData(akanForm);
    const birthDate = formData.get('birthDate');
    const gender = formData.get('gender');

    if (!birthDate || !gender) {
        showError('Please fill in all fields');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.querySelector('.loading-dots').style.display = 'inline-block';
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed in JS
        const year = date.getFullYear();

        // Validate components
        if (year < 1850 || year > 2025) {
            showError('Year must be between 1899 and 2025');
            return;
        }

        if (month < 1 || month > 12) {
            showError('Month must be between 1 and 12');
            return;
        }

        if (day < 1 || day > 31) {
            showError('Day must be between 1 and 31');
            return;
        }

        // Rest of your existing code
        const dayOfWeek = date.getDay();
        
        if (dayOfWeek < 0 || dayOfWeek > 6) {
            throw new Error('Invalid date calculation');
        }

        const name = gender === 'male' 
            ? akanNames.male[dayOfWeek] 
            : akanNames.female[dayOfWeek];
        
        const dayName = akanNames.days[dayOfWeek];
        
        resultDiv.innerHTML = `
            Your Akan name is <strong>${name}</strong><br>
            Born on ${dayName}
        `;
    } catch (err) {
        showError('Error calculating Akan name. Please check your input.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.loading-dots').style.display = 'none';
    }
});
        
        
        