import React from 'react';
import './Add.css';

function Add() {
  const [map, setMap] = React.useState<number>(0);
  const [location, setLocation] = React.useState<string>("");
  const [type, setType] = React.useState<number>(0);
  const [embed, setEmbed] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");

  const baseUrl: string = "http://localhost:1236";

  const MAPS = ["mirage", "inferno", "overpass"];
  const TYPES = ["smoke", "nade", "molotov"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      "map": MAPS[map],
      "location": location,
      "type": TYPES[type],
      "embed": embed,
      "destination": destination
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
    .then(response => console.log(JSON.stringify(response)))
  }

  return (
    <div className="add">
      <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Add Nade</h1>
        <div className="form-choices">
          {MAPS.map((curr, index) => {
            return (
              <div key={curr} className={"form-choice" + (index === map ? " form-chosen" : "")} onClick={() => setMap(MAPS.indexOf(curr))}>
                {curr.charAt(0).toUpperCase() + curr.slice(1)}
              </div>
            )
          })}
        </div>
        <div className="form-choices">
          {TYPES.map((curr, index) => {
            return (
              <div key={curr} className={"form-choice" + (index === type ? " form-chosen" : "")} onClick={() => setType(TYPES.indexOf(curr))}>
                {curr.charAt(0).toUpperCase() + curr.slice(1)}
              </div>
            )
          })}
        </div>
        <input type="text" placeholder="Location" onChange={(e) => (setLocation(e.target.value))} />
        <input type="text" placeholder="Destination" onChange={(e) => (setDestination(e.target.value))} />
        <input type="text" placeholder="Embed" onChange={(e) => (setEmbed(e.target.value))} />
        <input type="submit" value="Add Nade" />
      </form>
    </div>
  )
}

export default Add;