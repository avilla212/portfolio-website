document.getElementById('contact-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
    const spinner = document.getElementById('loading-spinner'); // Reference to loader

    const validateInput = (name, email, message, nickname) => {
        if (nickname && nickname.trim() !== '') {
            return "Bot detected. Form submission blocked.";
        }
        if (!name || !email || !message) {
            return "All fields are required.";
        }
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }
        return null;
    }

    const error = validateInput(name, email, message, nickname);
    if (error) {
        alert(error);
        return;
    }

    // Show the loading spinner
    spinner.style.display = 'block';

    try {
        const response = await fetch('https://portfolio-website-32zx.onrender.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message, nickname }),
        });

        const data = await response.json();

        if (response.ok){
            alert(data.message);
            document.getElementById('contact-form').reset();
        } else {
            alert(`Error: ${data.error || 'Failed to send email.'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    } finally {
        // Always hide the spinner
        spinner.style.display = 'none';
    }
});
