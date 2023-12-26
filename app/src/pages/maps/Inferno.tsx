import Map from "./Map.tsx";

const MAPPING = {
  "market-door": [42,-117.5],
  "apartments": [74,25],
  "triple": [-65,0],
  "window": [17,-37],
  "a-ramp": [-45,73],
  "jungle": [-47,0],
  "palace": [-67,51],
  "market": [23,-94],
  "connector": [0,0],
  "mid-boxes": [14,78],
  "under-palace": [-63,49],
  "top-mid": [30,50],
  "t-spawn": [45,136],
  "ct": [-72,-18],
  "t-ramp": [-20,100]
}

function Mirage() {
  return (
    <div>
      <Map map="inferno" mapping={MAPPING} />
    </div>
  )
}

export default Mirage;
