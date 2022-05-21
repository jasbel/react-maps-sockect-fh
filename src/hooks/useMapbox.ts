import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from 'uuid';

export const useMapbox = (puntoInicial: { lng: number; lat: number; zoom: number }) => {
  const mapDiv = useRef<HTMLDivElement>(null as any);

  const setRef = useCallback((node: any) => {
    mapDiv.current = node;

    return mapDiv.current;
  }, []);

  const mapRef = useRef<mapboxgl.Map>();
  const [coords, setCoords] = useState(puntoInicial);

  useEffect(() => {
    const _map = new mapboxgl.Map({
      container: mapDiv.current as string | HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [puntoInicial.lng, puntoInicial.lat], // starting position [lng, lat]
      zoom: puntoInicial.zoom, // starting zoom
    });

    mapRef.current = _map;
  }, []);

  useEffect(() => {
    mapRef?.current?.on("move", () => {
      const { lng, lat } = mapRef.current!.getCenter();
      setCoords({ lng, lat, zoom: mapRef.current!.getZoom() });
    });

    // return map?.off("move"); // destruye el componente cuando se sale de la pantalla
  }, []);

  // Agregar marcadores al hacer click
  useEffect(() => {
    mapRef?.current?.on("click", (e: any) => {
      const { lng, lat } = e.lngLat;
      
      // const marker = new mapboxgl.Marker({
      // v4
      console.log({lng, lat});
    })
  
  }, [])
  

  return { coords, setRef };
};
