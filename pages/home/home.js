const mainContentContainer = document.querySelector('.main-content__container')
const homeButton = document.querySelector('#home-btn')

const makePostCard = (postData) => {
    let {post_title, post_text, post_date, first_name, post_pic, last_name, profile_pic} = postData

    if (post_title.length > 55) { // 63 char max
        post_title = post_title.substring(0,55) + "..."
    }

    if (post_text.length > 216) {
        post_text = post_text.substring(0,216) + "..."
    }

    let now = moment(post_date).startOf('second').fromNow();

    return `
        <div class='post-snip__container'>
        <div class='post-snip__right-content'>
            <div class='post-title__container'>
                <img src="${profile_pic}" alt="profile-pic">
                <h4>${post_title}</h4>
            </div>
            <div class='post-snip__preview-text'>
                <h5>
                    ${post_text}
                </h5>
            </div>
                <div class='post-snip__sub-info'>
                    <h6>${first_name} ${last_name}</h6>
                    <h6>${now}</h6>
                </div>
            </div>
            <div class='post-snip__photo'>
                <img src="${post_pic}" alt="">
            </div>
        </div>
    `
}

const renderHomePosts = (res) => {
    mainContentContainer.innerHTML = ''
    for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i])
        mainContentContainer.innerHTML += makePostCard(res.data[i])
    }
}

function getHomePosts () {
    axios.get('http://localhost:9870/home')
    .then(res => {
        renderHomePosts(res)
    })
    .catch(err => console.log(err))
}

getHomePosts()