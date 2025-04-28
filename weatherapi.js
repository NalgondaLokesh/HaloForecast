const historyList = document.getElementById('history-list');

// Load history from localStorage when page loads
loadHistory();

function getweather(cityName = "") {
    let city = cityName || cityInput.value.trim(); // If no param, take input

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // Save to search history
    saveToHistory(city);

    fetch(`https://goweather.xyz/weather/${city}`)
    .then(response => response.json())
    .then(data => {
        description.innerText = data.description || "No description available";
        temp.innerText = data.temperature || "No temperature data";
        wind.innerText = data.wind || "No wind data";
    })
    .catch(error => {
        description.innerText = 'Failed to fetch data!';
        temp.innerText = '';
        wind.innerText = '';
        console.error("Error:", error);
    });
}

// Save searched city to localStorage
function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    // Avoid duplicates
    if (!history.includes(city)) {
        history.unshift(city); // Add to beginning
    }

    // Keep only last 5 searches
    history = history.slice(0, 5);

    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderHistory();
}

// Load and display search history
function loadHistory() {
    renderHistory();
}

function renderHistory() {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    // Clear previous history
    historyList.innerHTML = "";

    history.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.classList.add('history-item');
        li.addEventListener('click', () => {
            cityInput.value = city; // Optional: autofill input
            getweather(city); // Fetch weather again
        });
        historyList.appendChild(li);
    });
}
