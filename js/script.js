// *********** SELECTORS ***********
// select div with class of overview to display github data
const overview = document.querySelector(".overview");
// the unorderd list to display public repos
const repoList = document.querySelector(".repo-list");
// section where repos appear
const allReposSection = document.querySelector(".repos");
// section containing individual repo data
const repoData = document.querySelector(".repo-data");
// back to repo gallery button
const backBtn = document.querySelector(".view-repos");
// filter search input
const filterInput = document.querySelector(".filter-repos");

// github username
const username = 'marykasp'

// *********** FUNCTIONS ***********
// async function to fetch profile information
const fetchProfileInfo = async function() {
  const response = await fetch(`https://api.github.com/users/${username}`);
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
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

  const repos = await response.json();

  // pass the array of object data to the function that will display the repos on the page
  displayRepos(repos)
}

const displayRepos = function(repos) {
  // iterate over the array of repo objects and create a list item for each repo
  repos.forEach(function(repo) {
    // create a list item for each repo
    let listItem = document.createElement("li");
    // add a class name of repo to each list item
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`

    // append list item to unordered list
    repoList.append(listItem);
  })

  // display the filter input
  filterInput.classList.remove("hide")
}

// Function to retrieve information about the repo clicked on
const fetchRepoData = async function(repoName) {
  // get data from specific repo endpoint
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
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
  // display backBtn
  backBtn.classList.remove("hide")

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

// *********** EVENT LISTENERS ***********
repoList.addEventListener("click", function(e) {
  if(e.target.matches("h3")) {
    // store the innerText of the h3 to a variable
    let repoName = e.target.innerText;

    // pass repoName to to fetchRepoData to get specific info about the repo clicked on
    fetchRepoData(repoName)
  }
})

// event listerner for backBtn to return back to repo gallery list
backBtn.addEventListener("click", function() {
  // display the section with the list of repos
  allReposSection.classList.remove("hide");

  // hide the individual repo section
  repoData.classList.add("hide");
  backBtn.classList.add("hide")
})

// event listener for search input
filterInput.addEventListener("input", function(e) {
  const searchInput = e.target.value;
  console.log(searchInput);
  const searchLowercase = searchInput.toLowerCase();

  // returns a NodeList (array) of all the list items
  const repos = document.querySelectorAll(".repo");
  // iterate over the repo list and check if the innerText of the repo matches the search value
  repos.forEach(function(repo) {
    let text = repo.innerText.toLowerCase();
    if(text.includes(searchLowercase)) {
      repo.classList.remove("hide")
    } else {
      repo.classList.add("hide")
    }
  })
})

fetchProfileInfo()
