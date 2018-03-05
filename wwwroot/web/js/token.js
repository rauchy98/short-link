export default class {

    constructor(token) {
        localStorage.setItem('token', token);
    }

    set token(newToken) {
        localStorage.setItem('token', newToken);
    }

    get token() {
        localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }
}