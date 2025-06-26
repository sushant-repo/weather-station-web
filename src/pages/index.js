import Container from "@/components/container"
import MapView from "@/components/map-view";
import http from "@/plugins/http";
import { useEffect, useState } from "react";
import australianStates from "@/store/australian-states.js"
import Modal from "@/components/modal";
import PreviewItem from "@/components/preview-item";

export default function Home() {
  const cellStyle = {
    border: "1px solid rgba(116, 116, 116, 0.46)",   // border-gray-200
    padding: "0.5rem",             // p-2 (8px)
    fontSize: "0.875rem",          // text-sm
    color: "rgb(78, 78, 78)"      
  }
  const [stations, setStations] = useState([]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("All");


  const [filteredStations, setFilteredStations] = useState([]);
  const [station, setStation] = useState({});
  const [open, setOpen] = useState(false);

  const headers = [
    {title: "Timestamp", key: "timestamp"},
    {title: "Variable Name", key: "variableName"},
    {title: "Measurement", key: "value"},
  ]

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

  async function handleMarkerClick(station){
    const {data} = await http().get(`stations/${station.id}`)
    setStation(data);
    setOpen(!open)
  }

  function handleCancel(){
    setOpen(false);
  }

  return (
    <Container>
      <h1 className="text-2xl text-center my-4">Welcome to Weather Station!</h1>
      <div className="flex justify-between gap-4 flex-col md:flex-row">
          {states?.length > 0 && (
            <div className="w-3xs border p-3 rounded border-gray-200 drop-shadow-sm w-full md:w-auto">
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
      <Modal open={open}  onCancel={handleCancel}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <PreviewItem title="Station Name" value={station.ws_name}/>
            <PreviewItem title="State" value={states.find(x => x.code === station.state)?.title}/>
            <PreviewItem title="Portfolio" value={station.portfolio}/>
            <PreviewItem title="Site" value={station.site}/>
          </div>
          
          <table className="border-collapse w-full">
            <thead>
              <tr>
                {headers.map(h => (
                  <td className="font-bold" style={cellStyle} key={h.key}>{h.title}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {station.measurements?.length > 0 ? (
                station.measurements.map(m => (
                  <tr key={m.id}>
                    <td style={cellStyle}>{m.timestamp}</td>
                    <td style={cellStyle}>{m.variableName}</td>
                    <td style={cellStyle}>{`${m.value} ${m.unit}`}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} class="text-center p-1" style={cellStyle}>
                    No measurements available.
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </Modal>
    </Container>
  );
}
