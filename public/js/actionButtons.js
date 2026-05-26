import { fetchBookmarks } from "./user-page.js"

async function deleteItem(cardId){
    try{
        const res = await fetch(`/api/bookmarks/${cardId}`, {
            method: "DELETE",
            credentials: 'include'
        })

        if(!res.ok){
            console.error('Error removing item:', await res.text())
            return
        }
        await fetchBookmarks()
    }catch(err){
        console.error('error removing item:', err)
    }

}

async function shareURL(link){
    try{
        if(navigator.share){
            await navigator.share({
                url: link
            })
            console.log('Shared succesfully')
        }else{
            alert('Share not supported in this browser')
        }
    }catch(err){
        console.log('Error:' , err)
    }
}

export {deleteItem, shareURL}