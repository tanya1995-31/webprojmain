var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
const userActionsDiv = document.getElementById("userActions");

if (loggedInUser) {
    userActionsDiv.innerHTML = `
        <span class="mr-4">Hello, ${loggedInUser.username}!</span>
        <button onclick="logout()" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Log Out</button>
    `;
} else {
    userActionsDiv.innerHTML = `
        <button id="signupButton" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign up</button>
        <button id="loginButton" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Log In</button>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Contact Us</button>
    `;
    // Re-attach event listeners to login and signup buttons
    document.getElementById("loginButton").addEventListener("click", function() {
        window.location.href = "login.html";
    });
    document.getElementById("signupButton").addEventListener("click", function() {
        window.location.href = "signup.html";
    });
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload(); // Refresh the page to update the UI
}