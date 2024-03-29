import React from 'react';
import './Add.css';
import { MIRAGE_MAPPING, INFERNO_MAPPING, OVERPASS_MAPPING } from './pages/maps/mapping';

const MIRAGE = Object.entries(MIRAGE_MAPPING).map((([location,]) => location)).sort();
const INFERNO = Object.entries(INFERNO_MAPPING).map((([location,]) => location)).sort();
const OVERPASS = Object.entries(OVERPASS_MAPPING).map((([location,]) => location)).sort();
const baseUrl: string = "http://localhost:3001";
const MAPS = ["mirage", "inferno", "overpass"];
const TYPES = ["smoke", "nade", "molotov", "flash"];
const MAP_CALLOUTS = {
  "mirage": MIRAGE,
  "inferno": INFERNO,
  "overpass": OVERPASS
}

function Add() {
  const [map, setMap] = React.useState<number>(0);
  const [location, setLocation] = React.useState<number>(0);
  const [type, setType] = React.useState<number>(0);
  const [embed, setEmbed] = React.useState<string>("");
  const [destination, setDestination] = React.useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      "map": MAPS[map],
      "location": MAP_CALLOUTS[MAPS[map] as keyof typeof MAP_CALLOUTS][location],
      "type": TYPES[type],
      "embed": embed,
      "destination": MAP_CALLOUTS[MAPS[map] as keyof typeof MAP_CALLOUTS][destination]
    }
    fetch(`${baseUrl}/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    .then(response => console.log(JSON.stringify(response)));
    e.target.reset();
  }

  return (
    <div className="add">
      <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Add Nade</h1>
        <p>Map & Type</p>
        <div className="form-maps-types">
          <div className="form-choices">
            {MAPS.map((curr, index) => {
              return (
                <div key={index} className={"form-choice" + (index === map ? " form-chosen" : "")} onClick={() => setMap(MAPS.indexOf(curr))}>
                  {curr.charAt(0).toUpperCase() + curr.slice(1)}
                </div>
              )
            })}
          </div>
          <div className="form-choices">
            {TYPES.map((curr, index) => {
              return (
                <div key={index} className={"form-choice" + (index === type ? " form-chosen" : "")} onClick={() => setType(TYPES.indexOf(curr))}>
                  {curr.charAt(0).toUpperCase() + curr.slice(1)}
                </div>
              )
            })}
          </div>
        </div>
        <p>Location</p>
        <div className="form-choices">
          {MAP_CALLOUTS[MAPS[map] as keyof typeof MAP_CALLOUTS].map((curr, index) => {
            return (
              <div key={index} className={"form-choice" + (index === location ? " form-chosen" : "")} onClick={() => setLocation(MAP_CALLOUTS[MAPS[map] as keyof typeof MAP_CALLOUTS].indexOf(curr))}>
                {curr.charAt(0).toUpperCase() + curr.slice(1)}
              </div>
            )
          })}
        </div>
        <p>Destination</p>
        <div className="form-choices">
          {MAP_CALLOUTS[MAPS[map] as keyof typeof MAP_CALLOUTS].map((curr, index) => {
            return (
              <div key={index} className={"form-choice" + (index === destination ? " form-chosen" : "")} onClick={() => setDestination(MAP_CALLOUTS[MAPS[map] as keyof typeof MAP_CALLOUTS].indexOf(curr))}>
                {curr.charAt(0).toUpperCase() + curr.slice(1)}
              </div>
            )
          })}
        </div>
        <input type="text" placeholder="Embed" onChange={(e) => (setEmbed(e.target.value))} />
        <input type="submit" value="Add Nade" />
      </form>
    </div>
  )
}

export default Add;