var repoContainer = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#cityname");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = cityInput.value.trim();

    if (cityname) {
        getCityWeather(cityname);
        cityInput.value = "";
    } else {
        alert("Please enter a city");
    }
}

var getCityWeather = function(city) {
    var apiUrl = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c962694451f88c2f69a40aac9d384464';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, city);
            });
        } else {
            alert("Error: " + response.statusText)
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};


var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No weather found.";
        return;
    }

    repoContainer.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create and append container for each repo
        var repoEl = document.createElement("a")
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}

cityForm.addEventListener("submit", formSubmitHandler);