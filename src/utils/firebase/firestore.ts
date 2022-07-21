import { collection, getDocs, getFirestore } from 'firebase/firestore';

export type Facility = {
    id: string
    name: string
    kind: string
    link: string
    firstRegistered: Date
    lastChanged: Date
    lastChangedBy: string
    lngLatLike: [number, number]
}

export type Comment = {
    id: string
    facility_id: string
    by: string
    lastChanged: Date
}

export async function getFacilities(): Promise<[ Facility[], Comment[] ]>  {
    const facilities = new Array<Facility>()
    const comments = new Array<Comment>()
    
    const db = getFirestore()
    const facilitiesSnapshot = await getDocs(collection(db, '/facility'))
    const commentsSnapshot = await getDocs(collection(db, '/comment'))

    facilitiesSnapshot.forEach((doc) =>{
        const facility = doc.data() as Facility
        facilities.push({ ...facility, id: doc.id})
    })

    commentsSnapshot.forEach((doc) =>{
        const comment = doc.data() as Comment
        comments.push({ ...comment, id: doc.id})
    })

    return { facilities, comments }
}