import React from "react";

import mapboxgl from "mapbox-gl";
import { Facility } from "../utils/firebase/firestore";

export class CustomMarker extends mapboxgl.Marker {
    facilityInfo: Facility

    constructor(facility: Facility) {
        super()
        this.facilityInfo = facility
    }

    getFacilityInfo(): Facility {
        return this.facilityInfo
    }
}