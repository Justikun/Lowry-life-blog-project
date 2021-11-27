const { default: axios } = require("axios");

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}


const allPostsContainer = document.getElementById("all-posts__container")
allPostsContainer.innerHTML = ''
allPostsContainer.innerHTML += `<h3>Yours Posts</h3>`


const makePostCard = (res) => {
  let {post_title, post_date} = res

  post_date = moment(post_date).startOf('hour').fromNow();
  return `
    <div class="your_post__container">
      <div class="post-info__container"
        <h5 class="post_title">${post_title}</h5>
        <h5 class="post_date">${post_date}</h5>
      </div>
      <h5 class="edit_button">Edit</h5>
      <img class="trash_button" src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"/>
    </div>
  `
}

const renderYourPosts = (res) => {
  for (let i = 0; i < res.data.length; i++) {
      console.log(res.data[i])
      allPostsContainer.innerHTML += makePostCard(res.data[i])
  }
}

const getYourPosts = () => {
  axios.get("http://localhost:9870/createPost/yourPosts")
  .then(res => {
    renderYourPosts(res)
  })
  .catch(err => console.log(err))
}


const createPost = () => {
  axios.get("http://localhost:9870/createPost/")
  .then(res => {

  })
}
getYourPosts()