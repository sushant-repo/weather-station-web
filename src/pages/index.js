import Container from "@/components/container"
import MapView from "@/components/map-view";
import http from "@/plugins/http";
import { useEffect, useState } from "react";

export default function Home() {
  const [stations, setStations] = useState([]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("All");


  const [filteredStations, setFilteredStations] = useState([]);

  useEffect(() => {
    const filtered = state === "All" ?
      stations :
      stations.filter(s => s.state === state);

      setFilteredStations(filtered);
  }, [state, stations])

  useEffect(() => {
    const uniqueStates = Array.from(new Set(stations.map(s => s.state)));
    if(uniqueStates.length){
      setStates(['All', ...uniqueStates])
    }
  }, [stations])

  useEffect(() => {
    async function getStations(){
      try{
        const {data} = await http().get("stations");
        setStations(data);
      }catch(error){
        console.error(error)
      }
    };

    getStations();
  }, [])
  function handleMarkerClick(){}

  return (
    <Container>
      <h1 className="text-2xl text-center my-4">Welcome to Weather Station!</h1>
      <div className="flex justify-between gap-4">
          {states?.length > 0 && (
            <div className="w-3xs">
              <label for="state">Select State:</label>
              <select className="w-full border border-gray-300 rounded p-1"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {states.map(state => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}

        <div className="flex-auto">
          <div className="h-200 w-full">
            <MapView stations={filteredStations} onMarkerClick={handleMarkerClick} />
          </div>
        </div>
      </div>
    </Container>
  );
}
