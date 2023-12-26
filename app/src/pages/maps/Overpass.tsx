import Map from "./Map.tsx";

const MAPPING = {
}

function Mirage() {
  return (
    <div>
      <Map map="overpass" mapping={MAPPING} />
    </div>
  )
}

export default Mirage;
