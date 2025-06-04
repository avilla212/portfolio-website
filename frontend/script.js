document.getElementById('contact-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const nickname = document.getElementById('nickname').value.trim(); // Honeypot field

    // Function to validate input fields
    const validateInput = (name, email, message, nickname) => {
        // Honeypot check 
        if (nickname && nickname.trim() !== '') {
            return "Bot detected. Form submission blocked.";
        }

        // Required fields check
        if (!name || !email || !message) {
            return "All fields are required.";
        }
        
        // Email format check
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/

        // Validate email format by testing against the regex
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }

        return null; // No errors
    }

    // run validation 
    const error = validateInput(name, email, message);
    if (error) {
        alert(error);
        return;
    }

    // Proceed with sending the email
    try {
        const response = await fetch('https://portfolio-website-32zx.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message, nickname }),
        });

        const data = await response.json();

        if (response.ok){
            alert(data.message);
            document.getElementById('contact-form').reset(); // Reset the form
        } else {
            alert(`Error: ${data.error || 'Failed to send email.'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }

    

})

