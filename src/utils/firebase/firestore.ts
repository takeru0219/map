import { collection, getDocs, getFirestore } from 'firebase/firestore'

// https://maku.blog/p/m3bjrz7/

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
    facilityId: string
    by: string
    firstRegistered: Date
    lastChanged: Date
}

export async function getAllFacilities(): Promise<[Facility[], Comment[]]>  {
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

export async function getNearFacilities(): Promise<Facility[] | null> {
    // https://zenn.dev/yskuue/articles/fb433692fa922d
    return null
}