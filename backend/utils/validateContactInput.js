const validateContactInput = ({ name, email, message, nickname }) => {
    // Honeypot check
    if (nickname && nickname.trim() != ''){
        return { error: "Bot detected" };
    }

    // Required fields check
    if (!name || !email || !message) {
        return { error: "All fields are required." };
    }

    // Email format check
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)){
        return { error: "Please enter a valid email address." };
    }

    // If all checks pass, return null
    return { error: null };
}

module.exports = validateContactInput;