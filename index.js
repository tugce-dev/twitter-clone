import { tweetsData } from "./data.js";

const feedContainer = document.getElementById('feed')
const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', function(){
    if(tweetInput.value){
        tweetsData.unshift({
            handle : `@tugce-dev`,
            profilePic : `images/avatarwoman.png`,
            likes : 0,
            retweets : 0,
            tweetText : tweetInput.value,
            replies : [],
            isLiked : false,
            isRetweeted : false,
            uuid : self.crypto.randomUUID()
        })
        render()
        tweetInput.value = ''   
        
    }})
    


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
})

function handleReplyClick(tweetId){
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')

    
    }
function handleLikeClick(tweetId){
    const targetTweetObj =  tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
   render()

}
    function handleRetweetClick(tweetId){
    const targetTweetObj =  tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
   render()

}


function getFeedHtml() {
    let feedHtml = ``
    let likeIconClass = ``
    let retweetIconClass = ``
   

   


    tweetsData.forEach(function(tweet) {
       let repliesHTML = `` 
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }else{
            likeIconClass = ''
        }
        if(tweet.isRetweeted){
        retweetIconClass = 'retweeted'
        }else{
        retweetIconClass = ''
        }
         if(tweet.replies.length > 0){
          
        tweet.replies.forEach(function(reply){
             
        repliesHTML += `
        <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                <div> 
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
               </div>
            </div>
        </div>
        `
        })
        }
        feedHtml +=`
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div> 
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
               <div class="tweet-details">
               <span class="tweet-detail">
               <i class="fa-regular fa-comment-dots"
               data-reply="${tweet.uuid}" ></i>
               ${tweet.replies.length}
               </span>
               <span class="tweet-detail">
               <i class="fa-solid fa-heart ${likeIconClass}"
               data-like="${tweet.uuid}" ></i>
               ${tweet.likes}
               </span>
               <span class="tweet-detail">
               <i class="fa-solid fa-retweet ${retweetIconClass}"
               data-retweet="${tweet.uuid}" ></i>
               ${tweet.retweets}
               </span>
               </div>
            </div>
             </div>
            <div class="hidden" id="replies-${tweet.uuid}">
            ${repliesHTML}
            </div>
        </div>
        `
    })
    return feedHtml

}

function render(){
    feedContainer.innerHTML = getFeedHtml()
}

render()
