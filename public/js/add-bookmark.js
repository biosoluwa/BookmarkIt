const bookmarkForm = document.getElementById('bookmark-form')
let tagText = ''
let isFavorite = false

let tags = document.querySelectorAll('span.tag-type-text')
tags = Array.from(tags)
   tags.forEach((tag)=>{
        tag.addEventListener('click', ()=>{
            tags.forEach((tag)=> tag.parentElement.classList.remove('on'))
            tag.parentElement.classList.add('on')
            tagText = tag.textContent
        })
    })


document.getElementById('fav-toggle').addEventListener('click', function(){
        const star = document.querySelector('.ti-star-filled')
        const favtextStrong = document.getElementById('fav-text-strong')
        star.classList.toggle('show-star')
        isFavorite = !isFavorite
        if(isFavorite){
            favtextStrong.textContent = 'Favorited!'
        }else{
            favtextStrong.textContent = 'Yes, add to favorites'
        }
    })

bookmarkForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const bookmarkFormData = new FormData(bookmarkForm)
    const title = bookmarkFormData.get('title-input')
    const url = bookmarkFormData.get('url-input')
    const tag = tagText
    const favoriteStatus = isFavorite

const bookmarkObj = {
    title: title,
    url: url,
    tag: tag,
    favoriteStatus: favoriteStatus
}

await sendBookmarkData(bookmarkObj)

bookmarkForm.reset()

})

async function sendBookmarkData(bookmarkObj){
    try{
        const res = await fetch('/api/bookmarks/add', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookmarkObj)
        })
        if(!res.ok){
            console.log('Failed to send bookmarks. Please try again')
        }
    }catch(err){
        console.error(err.message)
    }
}

