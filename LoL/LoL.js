const url = 'https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json';
let fetchBtn = document.getElementById('fetch');
let xhrBtn = document.getElementById('xhr');
let clearBtn = document.getElementById('clear');
let contentNode = document.querySelector('.content');


fetchBtn.addEventListener('click', function () {
    contentNode.innerHTML = '';
    fetchGetDataAndCallRenderTheWeb(url);
})

xhrBtn.addEventListener('click', function () {
    contentNode.innerHTML = '';
    xhrGetDataAndCallRenderTheWeb(url);
});

clearBtn.addEventListener('click', function () {
    contentNode.innerHTML = '';
    console.log('clear');
})


function fetchGetDataAndCallRenderTheWeb(url) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let json = result;
            let lolData = json.data;
            renderTheWeb(lolData);
            console.log('fetch');
        })
        .catch(ex => {
            alert(`${ex}`)
        })
        .finally()
}



function xhrGetDataAndCallRenderTheWeb(url) {
    let xhr = new XMLHttpRequest();
    let json = {};

    xhr.onload = function () {
        // try and catch
        if (xhr.readyState == 4 && xhr.status == 200) {
            json = JSON.parse(xhr.responseText);
        } else {
            alert(`發生錯誤，代碼為${xhr.status}`);
        }


        let lolData = json.data;
        renderTheWeb(lolData);
        console.log('xhr')
    }
    xhr.open('GET', url);
    xhr.send();
}




function renderTheWeb(sourceData) {
    // createCards()
    let champArr = Object.values(sourceData);
    createCards(champArr);

    // add eventListener on btn
    let btnGroup = document.querySelectorAll('.card-body > button');
    btnGroup.forEach((btn, index) => btn.addEventListener('click', function () {
        // updateModal()
        updateModal(champArr, btn, index);
    }))


    // functions
    // ------create template
    function createCards(sourceArr) {
        sourceArr.forEach((insideObj, index) => {
            // DOM nodes
            let DOMContent = document.querySelector('.content');
            // template nodes
            let template = document.getElementById('champCard');

            // template's content nodes
            let cloneCard = template.content.cloneNode(true);
            let cardImg = cloneCard.getElementById('card-img');
            let cardTitle = cloneCard.getElementById('card-champ-name');
            let cardText = cloneCard.getElementById('card-champ-story');

            // render
            cardImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${insideObj['id']}_0.jpg`;
            cardTitle.innerHTML = `<span>${index + 1} : </span><span>${insideObj['id']} - ${insideObj['name']}</span>`;
            cardText.innerText = `${insideObj['blurb']}`;

            cardText.setAttribute('title', `${insideObj['blurb']}`); // show the full text when hovering
            DOMContent.appendChild(cloneCard);
        });
    }

    // ------update modal
    function updateModal(sourceArr, targetBtn, indexOfBtn) {
        //card node
        let targetParentNode = targetBtn.parentNode;

        // // modal nodes
        let modalTitle = document.getElementById('modal-champ-name');
        let modalImg = document.getElementById('modal-img');
        let hp = document.getElementById('hp');
        let moveSpeed = document.getElementById('movespeed');
        let armor = document.getElementById('armor');
        let spellBlock = document.getElementById('spellblock');
        let attackRange = document.getElementById('attackrange');

        // set attribute
        let targetTitle = targetParentNode.querySelector('.card-title > span:nth-child(2)').innerText;
        modalTitle.innerText = targetTitle;

        let targetImgSrc = targetParentNode.parentNode.querySelector('img').getAttribute('src');
        modalImg.src = targetImgSrc;

        hp.innerText = `HP : ${sourceArr[indexOfBtn]['stats']['hp']}`;
        moveSpeed.innerText = `Move Speed : ${sourceArr[indexOfBtn]['stats']['movespeed']}`;
        armor.innerText = `Armor : ${sourceArr[indexOfBtn]['stats']['armor']}`;
        spellBlock.innerText = `Spell Block : ${sourceArr[indexOfBtn]['stats']['spellblock']}`;
        attackRange.innerText = `Attack Range : ${sourceArr[indexOfBtn]['stats']['attackrange']}`;
    }
}