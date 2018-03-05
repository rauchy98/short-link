'use strict';

    if (localStorage.getItem('token')) { 
        window.location.replace(`/links`); 
    }
    else {
        window.location.replace(`/login`); 
    }