document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm'); // Make sure your form has an ID

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Send this data to the server
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Redirect user after login or handle logged in state
            window.location.href = 'index.html'; // Change '/dashboard' to your success page
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed, please try again.');
        }
    });
});
