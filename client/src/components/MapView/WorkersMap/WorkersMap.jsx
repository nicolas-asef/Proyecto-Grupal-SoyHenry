import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "./WorkerMap.css";

const WorkersMap = (props) => {
  const [users, setUsers] = useState([]);
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
  }, []);

  if (!isLoading) {
    const arr = users
      .filter((u) => u.id !== user.sub)
      .filter((u) => u.Worker !== null);

    return (
      <>
        {arr.map((worker) => (
          <Marker
            key={worker.id}
            position={{
              lat: worker.coordinates[0],
              lng: worker.coordinates[1],
            }}
            icon={props.icon}
          >
            <Link to={`/profile/${worker.id}`}>
              <Popup>
                <div className="leaflet-imgContainer">
                  <img src={worker.img} alt="profileImage" />
                </div>
                <div className="leaflet-text">
                  {worker.name} {worker.lastName}
                  {worker.Worker?.Jobs.map((job) => (
                    <div>{job.name} |</div>
                  ))}
                </div>
              </Popup>
            </Link>
          </Marker>
        ))}
      </>
    );
  }
};

export default WorkersMap;
