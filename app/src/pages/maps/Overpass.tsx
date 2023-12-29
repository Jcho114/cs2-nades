import Map from "./Map.tsx";
import { OVERPASS_MAPPING as MAPPING } from "./mapping.tsx";

function Mirage() {
  return (
    <div>
      <Map map="overpass" mapping={MAPPING} />
    </div>
  )
}

export default Mirage;
