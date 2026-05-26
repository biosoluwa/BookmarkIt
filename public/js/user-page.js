import { logout } from "./logout.js"
import { returnEmail } from "./returnEmail.js"

const mail = await returnEmail()
const mailP = document.getElementById('user-mail')
mailP.innerHTML = mail

renderBookmarks()

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
        return data
    }catch(err){
        console.log(err)
    }
    
}

async function renderBookmarks(){
    const data = await fetchBookmarks()
    console.log(data)

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
                        <p class="card-title">${bookmark.title}</P
                        <span class="card-url">${bookmark.url}</span>
                        <div class="class-meta">
                            <div class="tag">${bookmark.tag}</div>
                            <span class="card-date">${bookmark.created_at}</span>
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