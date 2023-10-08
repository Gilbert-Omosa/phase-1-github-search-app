// Define constants for API endpoints and headers
const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USER_SEARCH_ENDPOINT = '/search/users';
const GITHUB_USER_REPOS_ENDPOINT = '/users/{username}/repos'; 

// Event listener for the form submission
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the search query from the input field
    const searchTerm = document.getElementById('search-input').value;

    // Call the GitHub User Search API
    searchGitHubUsers(searchTerm);
});

// Function to search GitHub users by name
function searchGitHubUsers(query) {
    const url = `${GITHUB_API_URL}${GITHUB_USER_SEARCH_ENDPOINT}?q=${query}`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json'
    };

    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            displayUserList(data.items);
        })
        .catch(error => {
            console.error('Error searching users:', error);
        });
}

// Function to display a list of GitHub users
function displayUserList(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="100">
            <h2>${user.login}</h2>
            <a href="${user.html_url}" target="_blank">Profile</a>
        `;
        userCard.addEventListener('click', () => {
            getUserRepositories(user.login);
        });

        userList.appendChild(userCard);
    });
}

// Function to get and display repositories for a specific user
function getUserRepositories(username) {
    const url = `${GITHUB_API_URL}${GITHUB_USER_REPOS_ENDPOINT.replace('{username}', username)}`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json'
    };

    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            displayRepositories(data);
        })
        .catch(error => {
            console.error('Error fetching user repositories:', error);
        });
}

// Function to display a list of repositories
function displayRepositories(repositories) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = ''; // Clear previous results

    repositories.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;

        repoList.appendChild(repoCard);
    });
}
