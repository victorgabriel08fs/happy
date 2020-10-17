import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css'

import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const OrphanagesMap = () => {

    const { goBack } = useHistory();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [initialPosition, setInitialPosition] = useState({ latitude: -16.7502331, longitude: -43.8681855 });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition({ latitude, longitude });
            console.log(initialPosition);
        })
    }, []);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <span>By Victor Gabriel</span>
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size={24} color="#FFF" />
                    </button>
                </footer>
            </aside>

            <Map
                center={[initialPosition.latitude, initialPosition.longitude]}
                zoom={15}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            position={[orphanage.latitude, orphanage.longitude]}
                            icon={mapIcon}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>


            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );
}
export default OrphanagesMap;