'use strict';

const backendUrl = 'http://localhost:3000';

document.getElementById("login").addEventListener('submit', async evt => {
    evt.preventDefault();

    const notyf = new Notyf();

    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;

    if (username.length < 4) {
        notyf.alert('Username is incorrect (minimal is 4 characters)');
        return;
    }

    const result = await fetch(`${backendUrl}/api/account/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (result.status == 401) {
        notyf.alert('Username or/and password are incorrect');
        return;
    }

    const data = await result.json();

    const token = data.token;
    localStorage.setItem('token', token);
    window.location.replace(`/links`);
});