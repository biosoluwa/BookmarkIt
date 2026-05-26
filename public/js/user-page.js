import { logout } from "./logout.js"
import { returnEmail } from "./returnEmail.js"
import { getFavorites, getArticles, getTools, getVideos, getReference , renderSearch} from "./filterFunctions.js"

const mail = await returnEmail()
const mailP = document.getElementById('user-mail')
mailP.innerHTML = mail

renderBookmarks()
renderStatsCount()

document.getElementById('log-out').addEventListener('click', logout)

async function fetchBookmarks() {
    try{
        const res = await fetch('/api/bookmarks/all')
        if(!res.ok){
            console.warn('Unexpected response', res.status)
            window.location.href = '/'
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.log(err)
    }
    
}

export function renderBookmarks(data){

    let bookmarkHtml = ''

    data.forEach((bookmark)=>{
        let icon

        if(bookmark.tag === 'tool'){
            icon = '<i class="ti ti-tool"></i>'
        }else if(bookmark.tag === 'article'){
            icon = '<i class="ti ti-article"></i>'
        }else if(bookmark.tag === 'video'){
            icon = '<i class="ti ti-video"></i>'
        }else if(bookmark.tag === 'reference'){
            icon = '<i class="ti ti-book"></i>'
        }

        bookmarkHtml += `
                <div class="card">
                    <div class="card-icon">${icon}</div>
                    <div class="card-body">
                        <p class="card-title">${bookmark.title}</p>
                        <div class="card-url">${bookmark.url}</div>
                        <div class="class-meta">
                            <div class="tag">${bookmark.tag}</div>
                            <div class="card-date">${bookmark.created_at}</div>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn"><i class="ti ti-edit"></i></button>
                        <button class="action-btn"><i class="ti ti-external-link"></i></button>
                        <button class="action-btn del"><i class="ti ti-trash"></i></button>
                    </div>
                </div>
            `
    })
    document.getElementById('bookmarks-container').innerHTML = bookmarkHtml
}

async function renderStatsCount(){
    const data = await fetchBookmarks()

    let allCount = document.getElementById('all-count')
    let totalSaved = document.getElementById('total-saved')

    let bluenum = document.getElementById('blue-num')
    let scountArticle = document.getElementById('s-count-article')

    let scountFavorites = document.getElementById('s-count-favorites')

    let purplenum = document.getElementById('purple-num')
    let scountTool = document.getElementById('s-count-tool')

    let scountVideo = document.getElementById('s-count-video')
    let scountReference = document.getElementById('s-count-reference')


    let orangenum = document.getElementById('orange-num')


    totalSaved.innerHTML = data.length
    allCount.innerHTML = data.length

    const article = data.filter((bookmark)=> bookmark.tag === 'article')
    const tools = data.filter((bookmark)=> bookmark.tag === 'tools')
    const video = data.filter((bookmark)=> bookmark.tag === 'video')
    const reference = data.filter((bookmark)=> bookmark.tag === 'reference')

    const favorite = data.filter((bookmark)=> bookmark.is_favorite === 1)

    bluenum.innerHTML = article.length
    scountArticle.textContent = article.length


    purplenum.innerHTML = tools.length
    scountTool.textContent = tools.length

    orangenum.innerHTML = favorite.length
    scountFavorites.textContent = favorite.length

    scountVideo.textContent = video.length
    scountReference = reference.length

}

document.addEventListener('click', async(e)=>{
    if(e.target.id === 'all-items'){
       await renderBookmarks()
    }else if(e.target.id === 'favorite-div'){
       await getFavorites()
    }else if(e.target.id === 'article-div'){
        await getArticles()
    }else if(e.target.id === 'tool-div'){
        await getTools()
    }else if(e.target.id === 'video-div'){
        await getTools()
    }else if(e.target.id === 'reference-div'){
        await getTools()
    }
})

const searchInput = document.getElementById('search-input')

searchInput.addEventListener('input', async()=>{
    await renderSearch(searchInput.value)
})