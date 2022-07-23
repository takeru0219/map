import React from "react";
import { useState, useRef, useEffect } from 'react';
import mapboxgl, { LngLat, Popup } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import { useAllFacilities, UseAllFacilitiesOutput } from "./load-markers";
import markers from "./load-markers";

interface MapboxMapProps {
    initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
    onMapLoaded?(map: mapboxgl.Map): void;
    onMapRemoved?(): void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ initialOptions = {}, onMapLoaded }) => {
    const [map, setMap] = useState<mapboxgl.Map>();

    const currentLocation = {
        latitude: 35.681236,
        longitude: 139.767125
    }

    const mapNode = useRef(null);

    const {isLoading, facilities, comments} = useAllFacilities()

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

        facilities?.map((e) => {
            console.log(e.lngLatLike)
            new mapboxgl.Marker()
            .setLngLat([e.lngLatLike.longitude, e.lngLatLike.latitude])
            .setPopup(new Popup({closeButton: true}).setText(e.name))
            .addTo(mapboxMap)
        });

        setMap(mapboxMap);

        if (onMapLoaded) mapboxMap.once('load', onMapLoaded);

        return () => {
            mapboxMap.remove();
            // if (onMapRemoved) onMapRemoved();
        };
    }, []);

    return <div ref={mapNode} style={{width: "100%", height: "100%"}}></div>
}

export default MapboxMap