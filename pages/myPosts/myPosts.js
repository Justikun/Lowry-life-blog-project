// Auto adjusting the height of text boxes while the users type
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

//html additions
allPostsContainer.innerHTML = ''
allPostsContainer.innerHTML += `<h3>Yours Posts</h3>`
allPostsContainer.innerHTML += `<div class="loader-wrapper"><span class="loader"><span class="loader-inner"></span></span></div>`
const postButton = document.querySelector("#post_button")

const postInternalId = []

const makePostCard = (res) => {
  let {post_title, post_date, post_id} = res
  post_date = moment(post_date).startOf('second').fromNow();

  postInternalId.push(post_id)

  return `
    <div class="your_post__container" data-internalid=${post_id}>
      <div class="post-info__container">
        <h5 class="post_title">${post_title}</h5>
        <h5 class="post_date">${post_date}</h5>
      </div>
      <h5 class="edit_button" data-internalid=${post_id}>Edit</h5>
      <img class="trash_button" src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" data-internalid=${post_id}/>
    </div>
  `
}

const renderYourPosts = (res) => {

allPostsContainer.innerHTML = ''
allPostsContainer.innerHTML += `<h3>Yours Posts</h3>`

  for (let i = 0; i < res.data.length; i++) {
      allPostsContainer.innerHTML += makePostCard(res.data[i])
  }
  // $(".loader-wrapper").fadeOut("slow");
}

const deletePost = async id => {
  if (confirm("Are you sure you want to delete this post?")) {
    await axios.delete(`http://localhost:9870/deletePost/${id}`)
    .then(() => {
      window.location.reload()
    })
    .catch(err => console.log(err))
  }
}

const updatePost = async body => {
  await axios.post(`http://localhost:9870/updatePost`, body)
  .then(
    window.location.reload()
  )
  .catch(err => console.log(err))
}

const postBlogPost = body => {
  axios.post("http://localhost:9870/postBlogPost", body)
  .then(window.location.reload())
  .catch(err => console.log(err))
}

const postHandler = () => {
  let postTitle = document.getElementById("post-title__editor")
  let postText = document.getElementById("post-text__editor")

  console.log()
  let bodyObj = {
    postTitle: postTitle.value,
    postText: postText.value
  }

  if (postButton.classList.contains('update-post')) {
    bodyObj.postId = document.querySelector('#post_button').getAttribute('data-internalid')
    updatePost(bodyObj)
  } else {
    postBlogPost(bodyObj) 
  }
  
    postTitle.value = ''
    postText.value = ''  
}

const getYourPosts = async () => {
  await axios.get("http://localhost:9870/myPosts/yourPosts")
  .then(res => {
    renderYourPosts(res)

    const deleteButtons = document.querySelectorAll('.trash_button')
    const editButtons = document.querySelectorAll('.edit_button')
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', () => deletePost(deleteButtons[i].getAttribute('data-internalid')))
      editButtons[i].addEventListener('click', () => editPost(editButtons[i].getAttribute('data-internalid')))  
    }
  })
  .catch(err => console.log(err))
}

const movePostToEditor = id => {
  const {post_title, post_text} = id
  let postTitleEditor = document.getElementById('post-title__editor')
  let postTextEditor = document.getElementById('post-text__editor')

  postTitleEditor.innerHTML = post_title
  postTextEditor.innerHTML = post_text
  postButton.innerHTML = "Update Post"
  postButton.classList.add("update-post")
  

  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }
}

const editPost = async id => {
  await axios.get(`http://localhost:9870/editPost/${id}`)
  .then(res => {
    document.querySelector('#post_button').setAttribute('data-internalid', id)
    movePostToEditor(res.data[0])
    // window.location.reload()
  })
  .catch(err => console.log(err))
}

getYourPosts()

postButton.addEventListener('click', () => postHandler())