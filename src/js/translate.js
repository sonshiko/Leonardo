

function initTranslate() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './src/transliterate.json', true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        setLanguagesAndStart(xhr.status,  xhr.response)
    };
    xhr.send();
}

function setLanguagesAndStart(status, response) {
    let languagesSet = {};
    let language = 'uk';
    if (status === 200) {
        languagesSet = response;
        initTranslateButtons();
        translate();
    } else {
        showModal('modal');
    }

    function initTranslateButtons() {
        const switchLanguageButtons = document.getElementsByClassName('language');
        for( let i =0; i< switchLanguageButtons.length; i++) {
            switchLanguageButtons[i].addEventListener('change', function(event) {
                console.log('change');
                if (language === 'uk') {
                    language = 'en';
                } else {
                    language = 'uk';
                }
                translate();
            })
        }
    }

    function translate() {
        const langSet = languagesSet;
        // inner text translation
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach( element => {
            const translationKey = element.getAttribute('data-translate');
            element.innerHTML = langSet[translationKey][language];
        });
        // title attribute translation
        const titlesToTranslate = document.querySelectorAll('[data-title-translate]');
        titlesToTranslate.forEach( element => {
            const translationKey = element.getAttribute('data-title-translate');
            element.setAttribute('title', langSet[translationKey][language]);
        });

    }
}

