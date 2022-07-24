import React, { useState, useEffect } from 'react'

import { getAllFacilities, Facility, Comment } from '../utils/firebase/firestore'

export type UseAllFacilitiesOutput = {
    isLoading: boolean,
    facilities: Facility[],
    comments: Comment[]
}

const DEFAULT: UseAllFacilitiesOutput = {
    isLoading: true,
    facilities: [],
    comments: []
}

export function useAllFacilities(): UseAllFacilitiesOutput {
    const [output, setOutput] = useState<UseAllFacilitiesOutput>(DEFAULT)

    useEffect(() => {
        void (async () => {
            const [f, c] = await getAllFacilities()
            setOutput({
                isLoading: false,
                facilities: f,
                comments: c
            })
        })()
    }, [])

    return output
}


type Marker = {
    name: string,
    kind: string,
    link: string,
    lngLatLike: [number, number],
}

const markers: Marker[] = [
    {
        name: '麺屋 ねむ瑠',
        kind: 'ラーメン',
        link: 'https://goo.gl/maps/YEJCExN5Jy3PbpVi9',
        lngLatLike: [139.75927166804647, 35.70755663027904]
    },
    {
        name: '菩提樹',
        kind: '肉類',
        link: 'https://goo.gl/maps/PkcP7WindYqSqioa8',
        lngLatLike: [139.75527391893493, 35.70391744044689]
    },
    {
        name: '味噌鐡 カギロイ',
        kind: '居酒屋',
        link: 'https://goo.gl/maps/p5rScynrcdczxndw9',
        lngLatLike: [139.76093639020854, 35.69673764483937]
    },
]

export default markers