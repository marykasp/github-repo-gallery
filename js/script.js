// *********** SELECTORS ***********
// select div with class of overview to display github data
const overview = document.querySelector(".overview");
// select the unorderd list to display public repos
const repoList = document.querySelector(".repo-list");
// select section where repos appear
const allReposSection = document.querySelector(".repos");
// select section containing individual repo data
const repoData = document.querySelector(".repo-data")

// github username
const userName = 'marykasp'

// *********** FUNCTIONS ***********
// async function to fetch profile information
const fetchProfileInfo = async function() {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = await response.json();

  // pass the data to the displayInfo function
  displayInfo(data);
}

// create a new div that displays github profile information
const displayInfo = function (data) {
  // create new div
  const div = document.createElement('div');
  // give div a class name of user-info
  div.classList.add('user-info')
  // add HTML with data from github to div
  div.innerHTML = `
  <figure>
    <img alt="profile photo" src=${data.avatar_url}>
  </figure>
  <div>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Bio:</strong> ${data.bio}</p>
  <p><strong>Location:</strong> ${data.location}</p>
  <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `
  // append div to overview div
  overview.append(div);

  // fetch repo data
  fetchRepos();
}

// async function to fetch public repos
const fetchRepos = async function() {
  const response = await fetch(`https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`);

  const repos = await response.json();

  // pass the array of object data to the function that will display the repos on the page
  displayRepos(repos)
}

const displayRepos = function(repos) {
  repos.forEach(function(repo) {
    // create a list item for each repo
    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`

    // append list item to unordered list
    repoList.append(listItem)
  })
}

fetchProfileInfo()

// *********** EVENT LISTENERS ***********
repoList.addEventListener("click", function(e) {
  if(e.target.matches("h3")) {
    // store the innerText of the h3 to a variable
    let repoName = e.target.innerText;

    // pass repoName to to fetchRepoData to get specific info about the repo clicked on
    fetchRepoData(repoName)
  }
})

// Function to retrieve information about the repo clicked on
const fetchRepoData = async function(repoName) {
  // get data from specific repo endpoint
  const fetchInfo = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
  const repoInfo = await fetchInfo.json();

  // fetch data on languages used in repo
  const fetchLanguages = await fetch(repoInfo.languages_url);
  // returns an object with keys as the languages used
  const languageData = await fetchLanguages.json();

  const languages = []
  // loop over the object and add each key as an element to the languages array
  for(let language in languageData) {
    languages.push(language)
  }

  console.log(repoInfo)
  displayRepoInfo(repoInfo, languages)
}

// function to display the specific repo information
const displayRepoInfo = function(repoInfo, languages) {
  // empty innerHTML of the section containing individual repo data
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allReposSection.classList.add("hide");

  // new div element and add selected repo's information
  const repoDiv = document.createElement("div");
  // add info to the div about the repo
  repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

  // append to repoDiv to repoData section
  repoData.append(repoDiv)
}
