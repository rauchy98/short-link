'use strict';

const backendUrl = 'http://localhost:3000';

console.log('READY!');
console.log('READY!');

// const validateEmail = (email) => {
//     const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return regex.test(String(email).toLowerCase());
// }

document.getElementById("register").addEventListener('submit', async evt => {
    evt.preventDefault();

    debugger;

    const email = document.getElementById("email-input").value;
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const confirmPassword = document.getElementById("password-confirm-input").value;
    
    const notyf = new Notyf();

    // if (!validateEmail(email)) {
    //     notyf.alert('E-mail is not vaild');
    //     return;
    // }

    if (username.length < 4) {
        notyf.alert('Username too short (minimal is 4 characters)');
        return;
    }

    if (password !== confirmPassword) {
        notyf.alert('Passwords are not equal');
        return;
    }

    const result = await fetch(`${backendUrl}/api/account/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            passwordConf: confirmPassword
        })
    });

    const data = await result.json();

    if (result.status == 400) {
        notyf.alert(data.error);
        return;
    }

    const token = data.token;
    localStorage.setItem('token', token);
    window.location.replace(`/links`);
});