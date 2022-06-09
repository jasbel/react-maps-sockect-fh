import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { Subject } from "rxjs";
import { IMap } from "../interfaces/mapInterfaces";

export const useMapbox = (puntoInicial: { lng: number; lat: number; zoom: number }) => {
  const mapDiv = useRef<HTMLDivElement>(null as any);

  const setRef = useCallback((node: any) => {
    mapDiv.current = node;
    return mapDiv.current;
  }, []);

  const markerRef = useRef({} as any);

  const mapRef = useRef<mapboxgl.Map>();
  const [coords, setCoords] = useState(puntoInicial);

  const moveMarker = useRef(new Subject());
  const newMarker = useRef(new Subject());

  // newMarker

  // funcion para agregar marcadores
  const addMarker = useCallback((e: mapboxgl.MapMouseEvent | mapboxgl.EventData | IMap) => {
    const { lng, lat } = (e as mapboxgl.MapMouseEvent | mapboxgl.EventData).lngLat || e;

    const marker = new mapboxgl.Marker() as mapboxgl.Marker & { id: string };
    marker.id = (e as IMap).id ?? v4(); // TODO
    marker.setLngLat([lng, lat]).addTo(mapRef.current!).setDraggable(true);
    markerRef.current[marker.id] = marker;

    if (!marker.id) newMarker.current.next({ id: marker.id, lat, lng });

    marker.on("drag", (ev: any) => {
      const { target } = ev;
      const { id } = target;
      const { lng, lat } = target.getLngLat();

      moveMarker.current.next({ id, lat, lng });
      // TODO: emitirt cambios de marcador
    });
  }, []);

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
    mapRef?.current?.on("click", addMarker);
  }, [addMarker]);

  return { coords, setRef, addMarker, newMarker$: newMarker.current, moveMarker$: moveMarker.current };
};
