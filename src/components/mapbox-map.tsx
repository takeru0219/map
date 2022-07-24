import React from "react";
import { useState, useRef, useEffect } from 'react';
import mapboxgl, { LngLat, Popup } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import { CustomMarker } from "./custom-marker";
import { useAllFacilities } from "./load-markers";
import { useCurrentLocation, Location } from "./load-location";

interface MapboxMapProps {
    initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
    onMapLoaded?(map: mapboxgl.Map): void;
    onMapRemoved?(): void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ initialOptions = {}, onMapLoaded }) => {
    const [map, setMap] = useState<mapboxgl.Map>();

    const mapNode = useRef(null);

    // 必要な情報を取ってくる
    const {isLoading, facilities, comments} = useAllFacilities()
    const {isLocationLoading, currentLocation, status} = useCurrentLocation()
    console.log(currentLocation)

    useEffect(() => {
        const node = mapNode.current;

        if (typeof window === 'undefined' || node === null) return;
        
        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [currentLocation.longitude, currentLocation.latitude],
            zoom: 15,
            ...initialOptions,
        });
        
        facilities?.forEach((e) => {
            const location = e.lngLatLike[0].toJSON()
            const marker = new CustomMarker(e)
            // TODO: lat, lng が入ってない時の処理を考える
            .setLngLat([location.longitude, location.latitude])
            .setPopup(new Popup({closeButton: true}).setText(e.name))
            .addTo(mapboxMap)

            marker.getElement().addEventListener('click', () => {
                console.log(marker.getFacilityInfo())
            })
        });

        setMap(mapboxMap);

        if (onMapLoaded) mapboxMap.once('load', onMapLoaded);

        return () => {
            mapboxMap.remove();
            // if (onMapRemoved) onMapRemoved();
        };
    }, [facilities, currentLocation]);

    if(isLoading && isLocationLoading) return <p>Loading.....</p>
    return <div ref={mapNode} style={{width: "100%", height: "100%"}}></div>
}

export default MapboxMap