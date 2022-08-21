import { collection, GeoPoint, CollectionReference, getDocs, getFirestore, Timestamp } from 'firebase/firestore'

// https://maku.blog/p/m3bjrz7/

export type Facility = {
  id: string
  name: string
  kind: string
  link: string
  firstRegistered: Timestamp
  lastChanged: Timestamp
  lastChangedBy: string
  lngLatLike: GeoPoint
  comment: Comment[]
}

export type Comment = {
  id: string
  facilityId: CollectionReference
  comment: string
  by: string
  firstRegistered: Timestamp
  lastChanged: Timestamp
}

export async function getAllFacilities(): Promise<Facility[]> {
  const facilities = new Array<Facility>()
  const comments = new Array<Comment>()

  const db = getFirestore()
  const facilitiesSnapshot = await getDocs(collection(db, '/facility'))
  const commentsSnapshot = await getDocs(collection(db, '/comment'))

  commentsSnapshot.forEach((doc) => {
    const comment = doc.data()
    comments.push({ ...comment, id: doc.id } as Comment)
  })

  facilitiesSnapshot.forEach((doc) => {
    const facility = doc.data()
    facilities.push({ ...facility, id: doc.id, comment: comments.filter((e) => e.facilityId.id === doc.id)} as Facility)
  })

  return facilities
}

export async function getNearFacilities(): Promise<Facility[] | null> {
  // https://zenn.dev/yskuue/articles/fb433692fa922d
  return null
}
