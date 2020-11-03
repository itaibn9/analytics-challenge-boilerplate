import React,{ useEffect, useState } from 'react'
import { Event } from "../../models"
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { httpClient } from "../../utils/asyncUtils";
import { Props } from "../../containers/DashBoard"
require('dotenv').config();
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
    width: '700px',
    height: '300px'
  };
  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  }

const GoogleMapChart: React.FC<Props> = () => {
  const [allEvents, setAllEvents]: any = useState([]);
  const getAllEvents = async (): Promise<Event[] | string | undefined> => {
    try {
      const { data } = await httpClient.get("http://localhost:3001/events/all");
      setAllEvents(data);
    } catch (error) {
      return error.message;
    }
  }
  useEffect(() => {
    getAllEvents();
    }, [])

    return (
        <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 31.5, lng: 34.5}}
          zoom={1}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <>
          <MarkerClusterer options={options}>
          {(clusterer) =>
          allEvents.map((event: Event) => (
            <Marker key={event.session_id} position={{ lat: event.geolocation.location.lat, lng: event.geolocation.location.lng}} clusterer={clusterer} />
          ))
          }
          </MarkerClusterer>
          </>
        </GoogleMap>
      </LoadScript>
    )
}

export default React.memo(GoogleMapChart)
