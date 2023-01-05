import Map, {
  FullscreenControl,
  GeolocateControl,
  GeolocateEvent,
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl';
import React from 'react';
import * as process from 'process';
import { Center, Code, Stack } from '@chakra-ui/react';

function LiveMap() {
  const [location, setLocation] = React.useState([{}]);

  const geolocateControlRef = React.useCallback((ref: any) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  console.log(geolocateControlRef);
  return (
    <>
      <Map
        initialViewState={{
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 12,
        }}
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        maxZoom={20}
        minZoom={1}
        style={{ width: '100vw', height: 600 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        terrain={{
          source: 'mapbox-dem',
          exaggeration: 1.5,
        }}
        reuseMaps={true}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        >
          <Layer
            key="hillshading"
            id="hillshading"
            type="hillshade"
            paint={{
              'hillshade-exaggeration': 0.5,
            }}
          />
        </Source>

        <FullscreenControl />
        <GeolocateControl
          ref={geolocateControlRef}
          trackUserLocation={true}
          onGeolocate={(event: GeolocateEvent) => {
            console.log(event);
            // get latitude and longitude from event
            // @ts-ignore
            const { latitude, longitude } = event.coords;
            // append to location array
            setLocation([...location, { latitude, longitude }]);
            console.log(location);
          }}
        />
        <NavigationControl />
        <ScaleControl maxWidth={100} unit="metric" />
      </Map>
      <Stack mt={10}>
        <div>Realtime Tacking Data will be displayed here</div>
        <Code>{JSON.stringify(location, null, 2)}</Code>
      </Stack>
    </>
  );
}

export default LiveMap;
