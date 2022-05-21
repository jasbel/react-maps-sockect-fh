import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useMapbox } from "../hooks/useMapbox";

mapboxgl.accessToken = "pk.eyJ1IjoiamFzYmVsIiwiYSI6ImNsM2Y0dnF6azBmOHczcW80aXlvZmg1cDAifQ.wtXIerPnq3A0r8fF6EHpUw";

const puntoInicial = { lng: 5, lat: 34, zoom: 2 };


const MapsPage = () => {
  const {coords, setRef} = useMapbox(puntoInicial)
  
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
