// const homeMainContainer = document.querySelector('#main-content__container')

// const makePostCard = () => {
//     const postElem = 
//     `<div class='post-snip__container'>
//         <div class='post-snip__right-content'>
//             <div class='post-title__container'>
//                 <img src="https://s2.qwant.com/thumbr/0x380/d/f/f2510d30b57d4a8ec4e8f47fe9c527aaad19e7f0deb5cc78386fbe463e3b15/Blake-profile-photo-square.jpg?u=http%3A%2F%2Fsunrift.com%2Fwp-content%2Fuploads%2F2014%2F12%2FBlake-profile-photo-square.jpg&q=0&b=1&p=0&a=0" alt="profile-pic">
//                 <h4>Post Title. Will have a max of 62 chars</h4>
//             </div>
//             <div class='post-snip__preview-text'>
//                 <h5>
//                     This sample text will have a max of 196 chars
//                 </h5>
//             </div>
//             <div class='post-snip__sub-info'>
//                 <h6>Author</h6>
//                 <h6>1 day ago</h6>
//             </div>
//         </div>
//         <div class='post-snip__photo'>
//             <img src="https://s2.qwant.com/thumbr/0x380/e/4/457582c7dba271337b0e6fed50cd6e9a34f0fb0282d52510054a0f3e189aba/384429-nature-lake-mountains-reflection-digital_art-trees-water-landscape-HDR.jpg?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F06%2F23%2F384429-nature-lake-mountains-reflection-digital_art-trees-water-landscape-HDR.jpg&q=0&b=1&p=0&a=0" alt="">
//         </div>
//     </div>
//     `
// return postElem
// }

function getHomePosts () {
    axios.get('http://localhost:9870/home')
    .then(res => {
        console.log("RES DATA: " + res.data)
    })
    .catch(err => console.log("______ERROR______" + err))
}

// getHomePosts()