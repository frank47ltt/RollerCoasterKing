import { useState, useEffect, useCallback, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { GOOGLE_MAPS_API_KEY } from '../../utils';
import USMapJson from '../../data/us-map.json';

import './style.css';

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

const defaultCenter = { lat: 39.5, lng: -98.35 };
const defaultZoom = 5;

function MapComponent({ center, zoom }) {
  const ref = useRef();
  const [map, setMap] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickFeature = (e) => {
    const feature = e.feature;
    if (!feature) return;

    map.setCenter({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    console.log(feature.getProperty('name'));
  };

  const loadGeoJson = useCallback(() => {
    if (map) {
      const loadUSMap = () => {
        map.data.addGeoJson(USMapJson);
        const featureStyle = {
          fillColor: '#ddd',
          fillOpacity: 0.1,
          strokeColor: '#222',
          strokeOpacity: 0.5,
          strokeWeight: 1,
        };
        map.data.setStyle(featureStyle);
        map.data.addListener('click', onClickFeature);
      };

      // TODO: load point geojson
      // const loadRollerCoasters = ()  =>{
      //   map.data.addGeoJson(RollerCoastersJson);
      // }

      loadUSMap();
    }
  }, [map, onClickFeature]);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }
  }, [ref, map, zoom, center]);

  useEffect(() => {
    if (map) {
      ['click'].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      loadGeoJson();
    }
  }, [map, loadGeoJson]);

  return <div ref={ref} id="map" />;
}

export function MapWrapper() {
  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
      <MapComponent center={defaultCenter} zoom={defaultZoom} />
    </Wrapper>
  );
}
