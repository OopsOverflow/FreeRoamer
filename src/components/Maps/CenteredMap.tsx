import process from 'process';
import Map, {
  FullscreenControl,
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl';
import React from 'react';
import * as turf from '@turf/turf';

function CenteredMap({
  geojson,
  width,
  height,
}: {
  geojson: any;
  width?: string;
  height?: string;
}) {
  // Only render the map component if geojson is truthy
  if (geojson) {
    const enclosingArea = turf.envelope(geojson);
    const southWest = [
      enclosingArea.geometry.coordinates[0][0][0],
      enclosingArea.geometry.coordinates[0][0][1],
    ];
    const northEast = [
      enclosingArea.geometry.coordinates[0][2][0],
      enclosingArea.geometry.coordinates[0][2][1],
    ];

    // Calculate the center point of the enclosing area
    const center: number[] = [
      (southWest[0] + northEast[0]) / 2,
      (southWest[1] + northEast[1]) / 2,
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [viewState, setViewState] = React.useState({
      longitude: center[0],
      latitude: center[1],
    });

    console.log('viewState', viewState);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onMove = React.useCallback(({ viewState }: any) => {
      setViewState(viewState);
    }, []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onMoveEnd = React.useCallback((event: any) => {
      setViewState(viewState);
    }, []);

    const mapW = width ? width : '100vw';
    const mapH = height ? height : 600;

    return (
      <Map
        initialViewState={{
          zoom: 12,
        }}
        {...viewState}
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        maxZoom={20}
        minZoom={1}
        style={{ width: mapW, height: mapH }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        terrain={{
          source: 'mapbox-dem',
          exaggeration: 1.5,
        }}
        onMove={onMove}
        onMoveEnd={onMoveEnd}
        reuseMaps={true}
      >
        <Source id="my-data" type="geojson" data={geojson}></Source>
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

        <Layer
          id="route"
          type="line"
          source="my-data"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': '#ee0f0f',
            'line-width': 8,
          }}
        />

        <FullscreenControl />
        <NavigationControl />
        <ScaleControl maxWidth={100} unit="metric" />
      </Map>
    );
  } else {
    return <div>Loading ...</div>;
  }
}

export default CenteredMap;
