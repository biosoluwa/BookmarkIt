import { fetchBookmarks } from "./user-page.js"

async function deleteItem(cardId){
    try{
        const res = await fetch(`/api/bookmark/${cardId}`, {
            method: "DELETE",
            credentials: 'include'
        })

        if(res.status === 204){
            await fetchBookmarks()
        }else{
            console.error('Error removing item:', await res.text())
        }
    }catch(err){
        console.error('error removing item:', err)
    }

}

async function shareURL(link){
    try{
        if(navigator.share){
            await navigator.share(link)
            console.log('Shared succesfully')
        }else{
            alert('Share not supported in this browser')
        }
    }catch(err){
        console.log('Error:' , err)
    }
}

export {deleteItem, shareURL}