import React, { useState } from 'react';
import MapLoadingHolder from '../components/map-loading-holder';
import MapboxMap from "../components/mapbox-map";

import { useCurrentLocation, Location } from "../components/load-location";
import { useAllFacilities } from "../components/load-markers";
import FacilityComponent from '../components/form-facility';

function App() {
  const [loading, setLoading] = useState(true);
  const handleMapLoading = () => setLoading(false);

  const {isLocationLoading, currentLocation, status} = useCurrentLocation()
  const {isLoading, facilities} = useAllFacilities()

  return (
  <>
  <div className="app-container">
    <div className="map-wrapper">
      <MapboxMap 
        onMapLoaded={handleMapLoading}
        currentLocation={currentLocation}
        facilities={facilities}
      />
      <FacilityComponent />
    </div>
      {loading && <MapLoadingHolder className="loading-holder" />}
    </div>
  </>)
}

export default App;