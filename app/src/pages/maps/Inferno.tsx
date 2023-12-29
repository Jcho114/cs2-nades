import Map from "./Map.tsx";
import { INFERNO_MAPPING as MAPPING } from "./mapping.tsx";

function Mirage() {
  return (
    <div>
      <Map map="inferno" mapping={MAPPING} />
    </div>
  )
}

export default Mirage;
