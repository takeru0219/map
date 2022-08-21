import { Timestamp } from "firebase/firestore";

export const facilityKind = [
    'ラーメン',
    '肉料理',
    '魚料理',
    '居酒屋',
    'パン屋'
]

const timestampToDate = (ts: Timestamp): string => {
    const date = ts.toDate()
    const yyyy = date.getFullYear()
    const MM = `0${date.getMonth() + 1}`.slice(-2)
    const dd = `0${date.getDate()}`.slice(-2)
    return `${yyyy}/${MM}/${dd}`
}

export default timestampToDate