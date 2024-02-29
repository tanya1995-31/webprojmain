document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('User registered successfully!');
                // Redirect to login or other page as needed
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});
