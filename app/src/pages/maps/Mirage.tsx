import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./Mirage.css";
import "leaflet/dist/leaflet.css";

const smoke = new Icon({
  iconUrl: "../../../assets/csgo_smoke.webp",
  iconSize: [70, 50]
});

const flash = new Icon({
  iconUrl: "../../../assets/csgo_flash.webp",
  iconSize: [65, 45]
});

const nade = new Icon({
  iconUrl: "../../../assets/csgo_nade.webp",
  iconSize: [85, 60]
});

// 300x160
function Map() {
  return (
    <>
      <MapContainer
        className="map"
        center={[0, 0]}
        zoom={1.5}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; Valve'
          url={"../../../Mirage/{z}/{x}/{y}.png"}
        />
        <Marker position={[0, 0]} icon={smoke}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[0, 0]} icon={nade}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[0, 0]} icon={flash}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

function Mirage() {
  return (
    <div className="mirage">
      <Map />
    </div>
  );
}

export default Mirage;
