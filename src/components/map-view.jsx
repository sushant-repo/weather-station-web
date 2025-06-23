import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle ={
    height: '100%',
    width: "100%"
}

const defaultCenter = {
    lat: -25.2744,  // Approximate centre of Australia
    lng: 133.7751
}

export default function MapView({stations = [], onMarkerClick}){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    if(loadError) return <div>Error loading map.</div>
    if(!isLoaded) return <div>Loading Map...</div>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={5}
        >
            {stations.map((station) => (
                <Marker key={station.id}
                    position={{ lat: station.latitude, lng: station.longitude }}
                    onClick={() => onMarkerClick(station)}
                />
            ))}
        </GoogleMap>
    );
}