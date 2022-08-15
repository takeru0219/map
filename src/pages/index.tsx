import React, { useState } from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import MapLoadingHolder from '../components/load/map-loading-holder';
import MapboxMap from "../components/mapbox-map";

import { useCurrentLocation, Location } from "../components/load/load-location";
import { useAllFacilities } from "../components/load/load-markers";
import FacilityComponent from '../components/form/form-facility';
import { Facility } from '../utils/firebase/firestore';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const handleMapLoading = () => setLoading(false);

  const {isLocationLoading, currentLocation, status} = useCurrentLocation()
  const {isLoading, facilities} = useAllFacilities()

  return (
  <ChakraProvider>
    <div className="app-container">
      <div className="map-wrapper">
        <MapboxMap 
          onMapLoaded={handleMapLoading}
          onMarkerSelected={(e: Facility) => setSelectedFacility(e)}
          currentLocation={currentLocation}
          facilities={facilities}
        />
        {selectedFacility && 
        (<Flex>
          <Box flex='3'>
            <FacilityComponent 
              facility={selectedFacility}
            />
          </Box>
          <Box flex='2'>
            <FacilityComponent 
              facility={selectedFacility}
            />
          </Box>
        </Flex>)}
    </div>
      {(isLocationLoading || loading) && <MapLoadingHolder className="loading-holder" />}
    </div>
  </ChakraProvider>)
}

export default App;