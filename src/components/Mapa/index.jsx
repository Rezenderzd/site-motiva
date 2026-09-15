import { useContext, useEffect, useRef } from 'react';
import style from './mapa.module.css';
import { MotivaContext } from '../MotivaContextProvider/Provider';

export const Mapa = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const { coordenadas, trechoSelecionado, trechos } = useContext(MotivaContext);

    const latIni = parseFloat(coordenadas?.inicial?.lat || '-23.55052');
    const lngIni = parseFloat(coordenadas?.inicial?.lng || '-46.633308');
    const latFim = parseFloat(coordenadas?.final?.lat || '-23.555');
    const lngFim = parseFloat(coordenadas?.final?.lng || '-46.633308');
    
    const trechoMapa = trechos?.find(t => t.id === trechoSelecionado);

    useEffect(() => {
        if (mapInstanceRef.current) return;
        if (isNaN(latIni) || isNaN(lngIni)) return;

        const map = window.L.map(mapContainerRef.current, {
            attributionControl: false
        }).setView([latIni, lngIni], 7);
        
        mapInstanceRef.current = map;

        window.L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
            maxZoom: 20
        }).addTo(map);

        const status = trechoMapa?.status;
        const corLinha = status === 'Em dia' ? '#2ecc71' : status === 'Alerta' ? '#ba8e23' : '#e74c3c';

        window.L.Routing.control({
            waypoints: [
                window.L.latLng(latIni, lngIni), 
                window.L.latLng(latFim, lngFim)
            ],
            lineOptions: {
                styles: [{ color: corLinha, weight: 6, opacity: 0.8 }]
            },
            createMarker: function() { 
                return null; 
            },
            addWaypoints: false,      
            itineraryClassName: 'hidden-itinerary',
            show: false,              
        }).addTo(map);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [coordenadas, trechoMapa, latIni, lngIni, latFim, lngFim]);

    return (
        <div 
            ref={mapContainerRef} 
            className={style.mapContainer}
            id='map'
        ></div>
    );
};