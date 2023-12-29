import Map from "./Map.tsx";
import { MIRAGE_MAPPING as MAPPING } from './mapping';

function Mirage() {
  return (
    <div>
      <Map map="mirage" mapping={MAPPING} />
    </div>
  )
}

export default Mirage;
