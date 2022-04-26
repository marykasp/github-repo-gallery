// *********** Selectors ***********
// select div with class of overview to display github data
const overview = document.querySelector(".overview");
// select the unorderd list to display public repos
const repoList = document.querySelector(".repo-list")

// github username
const userName = 'marykasp'

// *********** Functions ***********
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

  const data = await response.json();

  // pass the array of object data to the function that will display the repos on the page
  displayRepos(data)
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
