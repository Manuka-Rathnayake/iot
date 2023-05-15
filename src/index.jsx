/*import React from "react";
import  ReactDOM  from "react-dom";
import "../src/index.css";
import Singlebox from "./Singlebox";
import fan from "./images/fan.svg";
import light from "./images/light.svg";
import blinds from "./images/blinds.png";
import power from "./images/power.png";
import lamp from "./images/lamp.png";
import Sidebar from "./Components/Sidebar";


const App = function () {
    return (
    <div className="App">
        <div className="header">
            <h1>Smart Home Dashboard</h1>
        </div>
        <div className="all">
            <div className="SideBar">
                <Sidebar/>
            </div>
                <div className="dashboard">
                    <div className="Mainrow">
                        <div className="row1">
                            <Singlebox
                                name = 'Ceiling Fan'
                                image = {fan}
                                //id =  'fan1'
                            />
                            <Singlebox
                                name = 'light'
                                image = {light}
                                //id = 'light'
                            />
                            <Singlebox
                                name = 'Lamp'
                                image = {lamp}
                                //id = 'lamp'
                            />
                        </div>
                        <div className="row2">
                            <Singlebox
                                name = 'Curtain'
                                image = {blinds}
                                //id = 'blinds'
                            />
                            <Singlebox
                                name = 'Outlet'
                                image = {power}
                                //id = 'power1'
                            />
                            <Singlebox
                                name = 'Outlet'
                                image = {power}
                                //id = 'power2'
                            />
                        </div>
                    </div>
                </div>
        </div> 
    </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
*/

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import "../src/index.css";
import Singlebox from "./Singlebox";
import fan from "./images/fan.svg";
import light from "./images/light.svg";
import blinds from "./images/blinds.png";
import power from "./images/power.png";
import lamp from "./images/lamp.png";
import Sidebar from "./Components/Sidebar";

const socket = io("http://localhost:5174"); // connect to the server

const App = function () {
  const [buttonStates, setButtonStates] = useState({
    fan: false,
    light: false,
    lamp: false,
    curtain: false,
    outlet1: false,
    outlet2: false,
  });

  useEffect(() => {
    socket.on("buttonStates", (states) => {
      console.log("updated button states", states);
      setButtonStates(states);
    });
  }, []);

  const handleButtonStateChange = (device, state) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [device]: state,
    }));
    socket.emit("buttonState", { device: device, state: state });
    //socket.emit("buttonState", device, state);
    if (device === "fan") {
      socket.emit("fanState", state);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Smart Home Dashboard</h1>
      </div>
      <div className="all">
        <div className="SideBar">
          <Sidebar />
        </div>
        <div className="dashboard">
          <div className="Mainrow">
            <div className="row1">
              <Singlebox
                name="Ceiling Fan"
                image={fan}
                id="fan"
                state={buttonStates.fan}
                onStateChange={handleButtonStateChange}
                socket = {socket}
                //onStateChange={(state) => handleButtonStateChange("fan", state)}
              />
              <Singlebox
                name="light"
                image={light}
                id="light"
                state={buttonStates.light}
                onStateChange={handleButtonStateChange}
                socket = {socket}
              />
              <Singlebox
                name="Lamp"
                image={lamp}
                id="lamp"
                state={buttonStates.lamp}
                onStateChange={handleButtonStateChange}
                socket = {socket}
              />
            </div>
            <div className="row2">
              <Singlebox
                name="Curtain"
                image={blinds}
                id="curtain"
                state={buttonStates.curtain}
                onStateChange={handleButtonStateChange}
                socket = {socket}
              />
              <Singlebox
                name="Outlet"
                image={power}
                id="outlet1"
                state={buttonStates.outlet1}
                onStateChange={handleButtonStateChange}
                socket = {socket}
              />
              <Singlebox
                name="Outlet"
                image={power}
                id="outlet2"
                state={buttonStates.outlet2}
                onStateChange={handleButtonStateChange}
                socket = {socket}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
