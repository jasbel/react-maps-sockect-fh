import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useContext, useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";
import { IMap } from "../interfaces/mapInterfaces";
import { SocketContext } from "../states/SocketContext";

mapboxgl.accessToken = "pk.eyJ1IjoiamFzYmVsIiwiYSI6ImNsM2Y0dnF6azBmOHczcW80aXlvZmg1cDAifQ.wtXIerPnq3A0r8fF6EHpUw";

const puntoInicial = { lng: 5, lat: 34, zoom: 6 };

const MapsPage = () => {
  const { coords, setRef, newMarker$, moveMarker$, addMarker, updatePosition} = useMapbox(puntoInicial);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("markers-actives", (markers: { [key in string]: IMap }) => {
      for (const key of Object.keys(markers)) {
        addMarker(markers[key], key);
      }
    });
  }, [socket, addMarker]);

  useEffect(() => {
    newMarker$.subscribe((markerNew) => {
      socket.emit("marker-new", markerNew);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    moveMarker$.subscribe((markerMove) => {
      socket.emit("marker-move", markerMove);
    });
  }, [socket, moveMarker$]);

  useEffect(() => {
    socket.on("marker-move", (markerNew: IMap) => {
      updatePosition(markerNew);
    });
  }, [socket])

  useEffect(() => {
    socket.on("marker-new", (markerNew: any) => {
      addMarker(markerNew, markerNew.id);
    });
  }, [socket, addMarker]);

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
