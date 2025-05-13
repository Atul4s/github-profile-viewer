

let usersearchinp = document.querySelector(".searchinput")
let searchbtn = document.querySelector(".searchbtn")
let card = document.querySelector(".profilecard")

let repo_card = document.querySelector(".card-repo")
let repo_view = document.querySelector(".repo_view")



function fetchuser(){
   
    function getUserData(username) {

        return fetch(`https://api.github.com/users/${username}`).then(raw => {
            if (!raw.ok) throw Error("User not found");
            return raw.json();
        }) }
   
        let username = usersearchinp.value.trim();
        if (username.length > 0) {
            getUserData(username).then((data) => {
                decoProfile(data);
                
            })
        } else {
           card.classList.add("hidden");
        } if (!username) {
        alert("Please enter a GitHub username");}




    function decoProfile(elem) {
        let data = ` 
              
    <div class="flex items-center space-x-6">
            <img 
              class="w-24 h-24 rounded-full avatar" 
              src="${elem.avatar_url}" 
              alt="User Avatar"
            >
            <div>
              <h2 class="text-2xl font-semibold">${elem.name}</h2>
              <p class="text-gray-400">@${elem.login}</p>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Bio:</strong> <span class="text-gray-300">${elem.bio || 'No bio available'}</span></p>
            <p><strong>Location:</strong> <span class="text-gray-300">${elem.location || 'Location not specified'}</span></p>
            <p><strong>Company:</strong> <span class="text-gray-300">${elem.company || 'Not available'}</span></p>
            <p><strong>Public Repos:</strong> <span class="text-gray-300">${elem.public_repos}</span></p>
            <p><strong>Followers:</strong> <span class="text-gray-300"> ${elem.followers}</span></p>
            <p><strong>Following:</strong> <span class="text-gray-300">${elem.following}</span></p>
            <p><strong>Profile URL:</strong> <a href="${elem.html_url}" class="text-blue-400 hover:underline">${elem.html_url}</a></p>
            <p><strong>Joined:</strong> <span class="text-gray-300"> ${new Date(elem.created_at).toLocaleDateString()}</span></p>
          </div>
            
           `
    
        card.innerHTML = data;
    }

    function getRepoData(username) {

        return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`).then(raw => {
            if (!raw.ok) throw Error("User Repo not found");
            return raw.json();
        })
    }
    
    
    
    getRepoData(username).then((data) => {
        reporecent(data);
        
    })
        
         function reporecent(repo) {
            console.log(repo)
           
            let repoData = "";
            repo.forEach(repo => {
              repoData += `  <div class="repo-card p-4 bg-gray-800 rounded-lg"> 
            <h4 class="text-lg font-semibold text-blue-400">
            <a href="${repo.html_url}" class="hover:underline">${repo.name}</a>
          </h4>
          <p class="text-gray-300">${repo.description || 'No description'}</p>
          <p class="text-sm text-gray-400 mt-2">${repo.stargazers_count} </p>
          <p class="text-sm text-gray-400">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
       
         </div>
       `});
    
       
       repo_card.innerHTML = repoData;

        }


}
















searchbtn.addEventListener("click", function () {
card.classList.remove("hidden");
repo_view.classList.remove("hidden");
    fetchuser()

 
})