import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";

mapboxgl.accessToken = "pk.eyJ1IjoiamFzYmVsIiwiYSI6ImNsM2Y0dnF6azBmOHczcW80aXlvZmg1cDAifQ.wtXIerPnq3A0r8fF6EHpUw";

const puntoInicial = { lng: 5, lat: 34, zoom: 6 };


const MapsPage = () => {
  const {coords, setRef, newMarker$, moveMarker$} = useMapbox(puntoInicial)

  useEffect(() => {
    newMarker$.subscribe(markerNew => {
      console.log(markerNew)
    })
  }, [newMarker$])

  useEffect(() => {
    moveMarker$.subscribe(markerMove => {
      console.log(markerMove)
    })
  }, [moveMarker$])
  
  
  return (
    <>
      <div className="info">
        Lng: {coords.lng.toFixed(4)} | Lat: {coords.lat.toFixed(4)} | Zoom: {coords.zoom}
      </div>
      <div className="mapContainer" ref={setRef} />
    </>
  );
};

export default MapsPage;
