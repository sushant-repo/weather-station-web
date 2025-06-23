import Container from "@/components/container"
import MapView from "@/components/map-view";
import http from "@/plugins/http";
import { useEffect, useState } from "react";
import australianStates from "@/store/australian-states.js"
import Modal from "@/components/modal";

export default function Home() {
  const [stations, setStations] = useState([]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("All");


  const [filteredStations, setFilteredStations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const filtered = state === "All" ?
      stations :
      stations.filter(s => s.state === state);

      setFilteredStations(filtered);
  }, [state, stations])

  useEffect(() => {
    const states = [...australianStates];
    states.unshift({code: "All", title: "Please select a state."})
      setStates(states)
  }, [])

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

  function handleMarkerClick(){
    setOpen(!open)
  }

  function handleCancel(){
    setOpen(false);
  }

  
  return (
    <Container>
      <h1 className="text-2xl text-center my-4">Welcome to Weather Station!</h1>
      <div className="flex justify-between gap-4">
          {states?.length > 0 && (
            <div className="w-3xs border p-3 rounded border-gray-200 drop-shadow-sm">
              <h2 className="text-lg mb-4">Filter:</h2>
              <label>State:</label>
              <select className="w-full border border-gray-300 rounded p-1"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {states.map(state => (
                  <option value={state.code} key={state.code}>
                    {state.title}
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
      <Modal open={open}  onCancel={handleCancel}/>
    </Container>
  );
}
