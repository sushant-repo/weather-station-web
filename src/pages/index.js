import Container from "@/components/container"
import MapView from "@/components/map-view";
import { useState } from "react";

export default function Home() {
  const [stations, setStations] = useState([]);
  function handleMarkerClick(){}

  return (
    <Container>
      <h1 className="text-2xl text-center my-4">Welcome to Weather Station!</h1>
      <div className="flex">
        <div className="column-1/5">
        filter will go here
        </div>

        <div className="column-4/5 h-200 w-full">
          <MapView stations={stations} onMarkerClick={handleMarkerClick} />
        </div>
      </div>
    </Container>
  );
}
