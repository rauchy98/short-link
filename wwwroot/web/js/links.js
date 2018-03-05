'use strict';

const backendUrl = 'http://localhost:3000';

const tokenHeader = new Headers({
    'x-access-token': localStorage.getItem('token')
});

const postHeader = new Headers({
    'x-access-token': localStorage.getItem('token'),
    'Content-Type': 'application/json'
});

if (!localStorage.getItem('token')) { 
        window.location.replace(`/login`); 
}

const notyf = new Notyf();

document.addEventListener('DOMContentLoaded', async evt => {

    const result = await fetch(`${backendUrl}/api/links`, { method: 'GET', headers: tokenHeader });

    const data = await result.json();
    
    if(data.auth === false) {
        localStorage.removeItem('token');
        window.location.replace(`/login`);
        return;
    }

    data.forEach((element) => { 
        addLinkNew(element);
     }, this);

});

document.getElementById("add-form").addEventListener('submit', async evt => {
    evt.preventDefault();

    const result = await fetch(`${backendUrl}/api/links`, {
            method: "POST",
            headers: postHeader,
            body: JSON.stringify({
                link: document.getElementById("input-url").value,
            })
        });

    const data = await result.json();

    addLinkNew(data);
    document.getElementById("input-url").value = "";

    notyf.confirm('Link successfully added');  

});

document.getElementById("logout").addEventListener('click', evt => {
    localStorage.removeItem('token');
    window.location.replace(`/login`);
});

document.getElementById("cards-id").addEventListener('click', async evt => {

    const target = evt.target;
    let currentCardId;

    if (target.tagName == "BUTTON") {
        currentCardId = target.parentNode.parentNode.parentNode.id;
        await removeCard(currentCardId);
    }

    if (target.tagName == "INPUT") {
        target.select();
        document.execCommand("Copy");

        notyf.confirm(`Link <b>${target.value}</b> copied`);  
    }

    if (typeof currentCardId == "undefined") return;

});

const removeCard = async currentCardId => {
    const result = await fetch(`${backendUrl}/api/links/${currentCardId}`, { method: 'DELETE', headers: tokenHeader});
    const data = await result.json();

    const cardsDiv = document.getElementById('cards-id');
    const currentCardDiv = document.getElementById(currentCardId);

    cardsDiv.removeChild(currentCardDiv);

    notyf.alert(data.message); 
};

const addLinkNew = (element) => {
    const idUrl = element._id;
    const longUrl = element.link;
    const shortUrl = element.shortLink;
    const pageTitle = element.pageTitle;
    const pageDescription = element.pageDescription;
    const pageImage = element.pageImage;
    const clicks = element.clicks;

    const cardDiv = document.createElement('div');
    cardDiv.className = "card";
    cardDiv.id = idUrl;

    const cardHeaderDiv = document.createElement('div');
    cardHeaderDiv.className = "card-header";

    const cardHeaderImgDiv = document.createElement('div');
    cardHeaderImgDiv.className = "card-header-img";
    cardHeaderImgDiv.style.backgroundImage = `url(${pageImage})`;

    const cardHeaderDeleteDiv = document.createElement('div');
    cardHeaderDeleteDiv.className = "card-header-delete";
    const deleteCardButton = document.createElement('button');
    deleteCardButton.className = "delete-card-button";
    deleteCardButton.innerHTML = "Delete";

    const cardHeaderClicksDiv = document.createElement('div');
    cardHeaderClicksDiv.className = "card-header-link-clicks";
    const linkClicksP = document.createElement('p');
    linkClicksP.className = "link-clicks"
    linkClicksP.innerHTML = `Clicks: ${clicks}`;

    const cardHeaderInfoDiv = document.createElement('div');
    cardHeaderInfoDiv.className = "card-header-info";

    const inputUrlContainerDiv = document.createElement('div');
    inputUrlContainerDiv.className = "input-url-container";

    const showFullUrlInput = document.createElement('input');
    showFullUrlInput.type = "text";
    showFullUrlInput.className = "show-full-url";
    showFullUrlInput.value = longUrl;
    showFullUrlInput.readOnly = true;

    const showShortUrlInput = document.createElement('input');
    showShortUrlInput.type = "text";
    showShortUrlInput.className = "show-short-url";
    showShortUrlInput.value = backendUrl + '/' + shortUrl;
    showShortUrlInput.readOnly = true;

    const cardContentDiv = document.createElement('div');
    cardContentDiv.className = "card-content";

    const cardContainerDiv = document.createElement('div');
    cardContainerDiv.className = "card-container";

    const cardTitleH4 = document.createElement('h4');
    cardTitleH4.className = "card-title";
    const cardTitleB = document.createElement('b');
    const cardTitleA = document.createElement('a');
    cardTitleA.href = backendUrl + '/' + shortUrl;
    cardTitleA.innerHTML = pageTitle;
    cardTitleA.target = "_blank";

    const cardDescriptionP = document.createElement('p');
    cardDescriptionP.className = "card-description";
    cardDescriptionP.innerHTML = pageDescription;

    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardContentDiv);

    cardHeaderDiv.appendChild(cardHeaderImgDiv);
    cardHeaderDiv.appendChild(cardHeaderInfoDiv);

    cardHeaderInfoDiv.appendChild(inputUrlContainerDiv);
    inputUrlContainerDiv.appendChild(showFullUrlInput);
    inputUrlContainerDiv.appendChild(showShortUrlInput);

    cardHeaderDiv.appendChild(cardHeaderDeleteDiv);
    cardHeaderDeleteDiv.appendChild(deleteCardButton);

    cardHeaderDiv.appendChild(cardHeaderClicksDiv);
    cardHeaderClicksDiv.appendChild(linkClicksP);

    cardContentDiv.appendChild(cardContainerDiv);
    cardContainerDiv.appendChild(cardTitleH4);
    cardTitleH4.appendChild(cardTitleB);
    cardTitleB.appendChild(cardTitleA);
    cardContainerDiv.appendChild(cardDescriptionP);

    document.getElementById("cards-id").appendChild(cardDiv);
};