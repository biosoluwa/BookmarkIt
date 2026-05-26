import { renderBookmarks } from "./user-page.js"

 async function getFavorites(){
    try{
        const res = await fetch('/api/bookmarks/filter?is_favorite=1')
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
        const res = await fetch('/api/bookmarks/filter?tag=article')
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
        const res = await fetch('/api/bookmarks/filter?tag=tool')
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
        const res = await fetch('/api/bookmarks/filter?tag=video')
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
        const res = await fetch('/api/bookmarks/filter?tag=reference')
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
        const res = await fetch(`/api/bookmarks/filter?search=${searchInput}`)
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