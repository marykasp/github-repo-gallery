// Selectors
// select div with class of overview to display github data
const overview = document.querySelector(".overview");
// github username
const userName = 'marykasp'

// Functions
const fetchData = async function() {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const data = await response.json();

  // pass the data to the displayInfo function
  displayInfo(data);
}


// create a new div that displays github profile information
const displayInfo = function (data) {
  const div = document.createElement('div');
  div.classList.add('user-info')
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
}


fetchData()
