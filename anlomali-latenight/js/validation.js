function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    
    errorDiv.innerHTML = '';
    
    if(username === "" || password === "") {
        errorDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Please fill in all fields!
            </div>
        `;
        return false;
    } 
    else if(username === "admin123" && password === "anomali2025") {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', 'DwiMuafa');
        localStorage.setItem('role', 'admin');
        window.location.href = "dashboard.html";
        return false;
    } 
    else if(username === "owner" && password === "owner123") {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', 'ShadowReaper');
        localStorage.setItem('role', 'owner');
        window.location.href = "dashboard.html";
        return false;
    }
    else if(username === "coowner" && password === "coowner123") {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', 'LunaNight');
        localStorage.setItem('role', 'coowner');
        window.location.href = "dashboard.html";
        return false;
    }
    else if(username === "guard1" && password === "guard123") {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', 'WolfPack');
        localStorage.setItem('role', 'guard');
        window.location.href = "dashboard.html";
        return false;
    }
    else {
        errorDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-times-circle me-2"></i>
                Invalid username or password!<br>
                <small>Try: admin123 / anomali2025</small>
            </div>
        `;
        return false;
    }
}

function validateRegister() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;

    if(username === "" || email === "" || password === "" || confirmPass === "") {
        alert("Please fill in all fields!");
        return false;
    } 
    else if(password !== confirmPass) {
        alert("Passwords do not match!");
        return false;
    }
    else if(password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return false;
    }
    else if(!terms) {
        alert("You must agree to the Terms & Conditions!");
        return false;
    }
    else if(username.length < 3) {
        alert("Username must be at least 3 characters long!");
        return false;
    }
    else {
        localStorage.setItem('user_' + username, password);
        localStorage.setItem('email_' + username, email);

        alert("Registration successful! Please login with your credentials.");
        window.location.href = "login.html";
        return false;
    }
}

function checkExistingUsers() {
    if(!localStorage.getItem('user_admin123')) {
        localStorage.setItem('user_admin123', 'anomali2025');
    }
    if(!localStorage.getItem('user_owner')) {
        localStorage.setItem('user_owner', 'owner123');
    }
    if(!localStorage.getItem('user_coowner')) {
        localStorage.setItem('user_coowner', 'coowner123');
    }
}

window.onload = function() {
    checkExistingUsers();
};