const apiKey = 'zHJVbFZSYUDFQSjgFNqsjA==o5pKrhnnQzb5ZRef';

// DOM Elements
const adviceCheckbox = document.getElementById('adviceApi');
const countryCheckbox = document.getElementById('countryFlagApi');
const apiInput = document.getElementById('apiInput');
const resultBox = document.getElementById('result');
const form = document.getElementById('apiForm');


function handleCheckboxChange(changedBox, otherBox) {
    if (changedBox.checked) {
        otherBox.checked = false;
        apiInput.value = '';
        resultBox.textContent = '';
        resultBox.innerHTML = '';

        // Update placeholder text based on selected API
        if (adviceCheckbox.checked) {
            apiInput.placeholder = 'Press Get Response';
        } else if (countryCheckbox.checked) {
            apiInput.placeholder = 'Enter country name (e.g., Australia, Japan)';
        }
    }
}

adviceCheckbox.addEventListener('change', () => handleCheckboxChange(adviceCheckbox, countryCheckbox));
countryCheckbox.addEventListener('change', () => handleCheckboxChange(countryCheckbox, adviceCheckbox));

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    resultBox.textContent = ''; // Clear output

    const query = apiInput.value.trim();
    let url = '';

    if (adviceCheckbox.checked) {
        url = 'https://api.api-ninjas.com/v1/advice';
    } else if (countryCheckbox.checked) {
        if (!query) {
            resultBox.textContent = 'Please enter a country name.';
            return;
        }
        url = `https://api.api-ninjas.com/v1/countryflag?country=${query}`;
    } else {
        resultBox.textContent = 'Please select an API option.';
        return;
    }

    fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey }
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }

            throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        })
        .then(function(result) {
            if (adviceCheckbox.checked && result.advice) {
                resultBox.textContent = result.advice;
            } else if (countryCheckbox.checked && result.square_image_url) {
                resultBox.innerHTML = `<img src="${result.square_image_url}" alt="Flag of ${query}" style="max-width: 200px; border: 1px solid #ccc;">`;
            } else {
                resultBox.textContent = 'No valid data returned from the API.';
            }
        })
        .catch(function(error) {
            resultBox.textContent = error.message || 'An unknown error occurred.';
        });
});