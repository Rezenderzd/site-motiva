import { useContext, useEffect, useRef } from 'react';
import style from './mapa.module.css';
import { MotivaContext } from '../MotivaContextProvider/Provider';

export const Mapa = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const {coordenadas} = useContext(MotivaContext);

    const latIni = parseFloat(coordenadas.inicial.lat);
    const lngIni = parseFloat(coordenadas.inicial.lng);
    const latFim = parseFloat(coordenadas.final.lat);
    const lngFim = parseFloat(coordenadas.final.lng);

    useEffect(() => {
        if (!coordenadas || !coordenadas.inicial) return;
        if (mapInstanceRef.current) return;
        if (!coordenadas.inicial.lat || !coordenadas.final.lat) {
            console.warn("Mapa não pôde ser carregado: Coordenadas ausentes.");
            return;
        }
        const latIni = parseFloat(coordenadas.inicial.lat);
        if (isNaN(latIni)) return;

        const map = window.L.map(mapContainerRef.current, {
            attributionControl: false
        }).setView([latIni, lngIni], 15)

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO'
        }).addTo(map);


        L.Routing.control({
            waypoints: [
                L.latLng(latIni, lngIni), 
                L.latLng(latFim, lngFim)
            ],
            lineOptions: {
                styles: [{ color: 'red', weight: 6, opacity: 0.8 }]
            },
            createMarker: function() { 
                return null; // Isso impede a criação de qualquer marcador na rota
            },
            addWaypoints: false,      
            //draggableWaypoints: true,
            itineraryClassName: 'hidden-itinerary',
            show: false,              
        }).addTo(map);
        mapInstanceRef.current = map;

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [coordenadas]);

    return (
            <div 
                ref={mapContainerRef} 
                className={style.mapContainer}
                id='map'
            ></div>
    );
};