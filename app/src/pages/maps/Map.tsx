import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import Leaflet from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const ICONS = {
  "smoke": new Leaflet.Icon({
    iconUrl: "../../../assets/csgo_smoke.webp",
    iconSize: [70, 50]
  }),
  "flash": new Leaflet.Icon({
    iconUrl: "../../../assets/csgo_flash.webp",
    iconSize: [65, 45]
  }),
  "nade": new Leaflet.Icon({
    iconUrl: "../../../assets/csgo_nade.webp",
    iconSize: [85, 60]
  })
}

type Nade = {
  map: string;
  location: string;
  destination: string;
  type: string;
  embed: string;
}

function MiniMap({ map, mapping }: { map: string; mapping: { [key: string]: number[] } }) {
  const [state, flipState] = React.useState<boolean>(false);
  const [destination, setDestination] = React.useState<string>("");
  const [type, setType] = React.useState<string>("smoke");
  const [markers, setMarkers] = React.useState([]);
  const [showInfo, setInfo] = React.useState<boolean>(false);
  const [nades, setNades] = React.useState<Nade[]>([]);
  const buckets = React.useRef<{ [key: string]: Nade[] }>({});
  const baseUrl: string = "http://localhost:1236";

  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${baseUrl}/nades?map=${map}&type=${type}`).then(res => res.json());
      setMarkers(data);
    }
    fetchData();
    flipState(false);
  }, [type, map]);

  function createBuckets() {
    const list = state ? markers.filter((el: { destination: string }) => el.destination === destination) : markers;
    buckets.current = list.reduce((acc: { [key: string]: Nade[] }, curr: Nade) => {
      if (!(curr.destination in acc)) {
        acc[curr.destination] = [];
      }
      acc[curr.destination].push(curr);
      return acc;
    }, {});
  }

  function Video({ keynum, embed }: { keynum: number, embed: string }) {
    const [play, setPlay] = React.useState<boolean>(false);
    const re = /^.*\?/;
    return play ? (
      <iframe
        src={`https://www.youtube.com/embed/${embed}?mute=1&showinfo=0?rel=0&modestbranding=1&autohide=1&autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="nade-vid"
        onMouseLeave={() => setPlay(false)}
        key={keynum}
      />
    ) : (
      <img
        className="nade-vid"
        key={keynum}
        onMouseOver={() => setPlay(true)}
        src={`https://img.youtube.com/vi/${embed.match(re)?.toString().slice(0, -1)}/maxresdefault.jpg`}
      />
    );
  }
  
  function renderBucket(nades: Nade[]) {
    let counter = 0;
    const bucket = nades.map((el: Nade) => {
      return state ? (
        <Video keynum={counter++} embed={el.embed} />
      ) : (
        <div key={counter++}></div>
      );
    });
    return bucket;
  }

  function renderMarkers() {
    let counter = 0,
      positions;
    createBuckets();
    return Object.entries(buckets.current).map(
      ([, nades]: [string, Nade[]]) => {
        positions = mapping[state ? nades[0].location as keyof typeof mapping : nades[0].destination as keyof typeof mapping];
        return (
          <div key={counter++}>
             <Marker
              position={[positions[0], positions[1]]}
              icon={!state ? ICONS[nades[0].type as keyof typeof ICONS] : new Leaflet.Icon.Default()}
              eventHandlers={{
                click: () => {
                  if (!state) {
                    setDestination(nades[0].destination);
                    flipState(!state);
                  } else {
                    setNades(nades);
                    setInfo(true);
                  }
                }
              }}
            >
            </Marker>
          </div>
        )
      }
    );
  }

  const corner1 = Leaflet.latLng(-90, -170)
  const corner2 = Leaflet.latLng(90, 170)
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  
  return (
    <div className="map">
      {showInfo ? (
        <div className="map-bucket-container">
          <div className="bucket-nav">
            <button id="bucket-exit" onClick={() => {setInfo(false); setNades([])}}>
              <img src="../../../icons/x.png" alt="exit" />
            </button>
          </div>
          <div className="bucket">
            {renderBucket(nades)}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="filters">
        <div className="nade-filters">
          <img
            src="../../../assets/csgo_flash.webp"
            alt="flash"
            onClick={() => setType("flash")}
          />
          <img
            src="../../../assets/csgo_nade.webp"
            alt="nade"
            onClick={() => setType("nade")}
          />
          <img
            src="../../../assets/csgo_smoke.webp"
            alt="smoke"
            onClick={() => setType("smoke")}
          />
        </div>
      </div>
      <MapContainer
        className="minimap"
        center={[0, 0]}
        zoom={1.78}
        zoomSnap={0.15}
        scrollWheelZoom={false}
        zoomControl={false}
        touchZoom={false}
        doubleClickZoom={false}
        maxBounds={bounds}
        boundsOptions={{ padding: [50, 50] }}
        maxBoundsViscosity={1.0}
        dragging={false}
      >
        <TileLayer
          attribution="&copy; Valve"
          url={`../../../${map}/{z}/{x}/{y}.png`}
        />
        {renderMarkers()}
      </MapContainer>
      {state ? (
        <div className="map-return" onClick={() => flipState(!state)}>
          <img src="../../../icons/exit.png" alt="exit" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Map({ map, mapping }: {map: string, mapping: { [key: string]: number[] }}) {
  return (
    <MiniMap map={map} mapping={mapping} />
  );
}

export default Map;