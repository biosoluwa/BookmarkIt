import { renderBookmarks } from "./user-page.js"

 async function getFavorites(){
    try{
        const res = await fetch('/api/bookmarks/filter?is_favorite=1', {
            credentials: 'include'
        })
        if(!res.ok){
            console.log('network error')
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.error('Failed to fetch favorites', err)
    }
}

async function getArticles(){
    try{
        const res = await fetch('/api/bookmarks/filter?tag=article', {
            credentials: 'include'
        })
        if(!res.ok){
            console.log('network error')
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.error('Failed to fetch favorites', err)
    }
}

async function getTools(){
    try{
        const res = await fetch('/api/bookmarks/filter?tag=tool', {credentials: 'include'})
        if(!res.ok){
            console.log('network error')
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.error('Failed to fetch favorites', err)
    }
}

async function getVideos(){
    try{
        const res = await fetch('/api/bookmarks/filter?tag=video', {credentials: 'include'})
        if(!res.ok){
            console.log('network error')
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.error('Failed to fetch favorites', err)
    }
}

async function getReference(){
    try{
        const res = await fetch('/api/bookmarks/filter?tag=reference', {credentials: 'include'})
        if(!res.ok){
            console.log('network error')
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.error('Failed to fetch favorites', err)
    }
}

async function renderSearch(searchInput){
    try{
        const res = await fetch(`/api/bookmarks/filter?search=${searchInput}`, {credentials: 'include'})
        if(!res.ok){
            console.log('network error')
            return false
        }
        const data = await res.json()
        renderBookmarks(data)
    }catch(err){
        console.error('Failed to fetch favorites', err)
    }
}

export {getFavorites, getArticles, getTools, getVideos, getReference, renderSearch}