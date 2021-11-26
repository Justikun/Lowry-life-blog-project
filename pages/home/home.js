const mainContentContainer = document.querySelector('.main-content__container')
const homeButton = document.querySelector('#home-btn')

const makePostCard = (postData) => {
    let {post_id, user_id, post_title, post_text, post_date, first_name, last_name} = postData

    if (post_title.length > 63) { // 63 char max
        post_title = post_title.substring(0,63) + "..."
    }

    if (post_text.length > 216) {
        post_text = post_text.substring(0,216) + "..."
    }

    let now = moment(post_date).startOf('hour').fromNow();

    // console.log(currDate)
    // const formattedPostDate = post_date 

    return `
        <div class='post-snip__container'>
        <div class='post-snip__right-content'>
            <div class='post-title__container'>
                <img src="https://s2.qwant.com/thumbr/0x380/d/f/f2510d30b57d4a8ec4e8f47fe9c527aaad19e7f0deb5cc78386fbe463e3b15/Blake-profile-photo-square.jpg?u=http%3A%2F%2Fsunrift.com%2Fwp-content%2Fuploads%2F2014%2F12%2FBlake-profile-photo-square.jpg&q=0&b=1&p=0&a=0" alt="profile-pic">
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
                <img src="https://i.redd.it/u105ro5rg8o31.jpg" alt="">
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