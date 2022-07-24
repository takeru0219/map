import { resolve } from "path";
import React, { useEffect, useState } from "react";

export type Location = {
    latitude: number
    longitude: number
}

export function useCurrentLocation() {
    const [isLocationLoading, setIsLocationLoading] = useState(true)
    const [currentLocation, setCurrentLocation]= useState<Location>({
        latitude: 35.681236,
        longitude: 139.767125
    })
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            setIsLocationLoading(false)
        }, (error) => {
            setStatus(error.message)
            setIsLocationLoading(false)
        }, {
            timeout: 5000
        })
    }, [])

    return { isLocationLoading, currentLocation, status }
}