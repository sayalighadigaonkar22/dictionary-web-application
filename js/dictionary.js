const searchWordInput = document.getElementById('searchInput');
const goSearchButton = document.getElementById('goSearch');
const wordDefinition = document.getElementById('wordDefinition');
const partOfSpeech = document.getElementById('partOfSpeech');
const synonymsWords = document.getElementById('synonymsWords');
const antonymsWords = document.getElementById('antonymsWords');
const errorDisplay = document.getElementById('errorDisplay');

goSearchButton.addEventListener("click", () => {
    getDictionaryData();
});

searchWordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getDictionaryData();
    }
});

function isAlphabetic(input) {
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
            return false;
        }
    }
    return true;
}

async function getDictionaryData() {
    const userInput = searchWordInput.value;

    if (isAlphabetic(userInput)) {
        try {
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();

            displayDictionaryData(data);
            
        } catch (error) {
            displayError(error.message);
        }
    } else {
        displayError('Please enter a valid word (only alphabets allowed).');
    }
}

function displayDictionaryData(data) {
    errorDisplay.textContent = '';

    if (data && data.length > 0) {
        const firstDefinition = data[0].meanings[0].definitions[0].definition;
        const wordPartOfSpeech = data[0].meanings[0].partOfSpeech;
        const synonymsWord = data[0].meanings[0].synonyms;
        const antonymsWord = data[0].meanings[0].antonyms;

        wordDefinition.textContent = `Definition: ${firstDefinition}`;
        partOfSpeech.textContent = `Part of Speech: ${wordPartOfSpeech}`;
        synonymsWords.textContent = `Synonyms: ${synonymsWord}`;
        antonymsWords.textContent = `Antonyms: ${antonymsWord}`;

    } else {
        displayError('No definition found for the entered word.');
    }
}

function displayError(errorMessage) {
    wordDefinition.textContent = '';
    partOfSpeech.textContent = '';
    synonymsWords.textContent = '';
    antonymsWords.textContent = ''
    errorDisplay.textContent = `Error: ${errorMessage}`;
}