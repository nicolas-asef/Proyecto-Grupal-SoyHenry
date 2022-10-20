import React from "react";
import styles from "./styles/Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import personIcon from "./assets/personIcon.png";
import workerIcon from "./assets/workerIcon.png";
import { useSelector } from "react-redux";
import WorkersMap from "../WorkersMap/WorkersMap";
import CircularProgress from "@mui/material/CircularProgress";

const markerIcon = L.icon({
  iconUrl: personIcon,
  iconRetinaUrl: personIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
  popupAnchor: [0, -43],
  className: "leaflet-venue-icon",
});

const markerWorker = L.icon({
  iconUrl: workerIcon,
  iconRetinaUrl: workerIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
  popupAnchor: [0, -43],
  className: "leaflet-venue-icon",
});

const Map = (props) => {
  const { userDetail } = useSelector((state) => state);
  if (!userDetail.coordinates)
    return (
      <div className={styles.loaderContainer}>
        <CircularProgress />
      </div>
    );

  return (
    <MapContainer
      center={{
        lat: userDetail.coordinates[0],
        lng: userDetail.coordinates[1],
      }}
      zoom={13}
      className={styles.leaftleContainer}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={{
          lat: userDetail.coordinates[0],
          lng: userDetail.coordinates[1],
        }}
        icon={markerIcon}
      ></Marker>

      <WorkersMap icon={markerWorker} />
      <Circle
        center={{
          lat: userDetail.coordinates[0],
          lng: userDetail.coordinates[1],
        }}
      ></Circle>
    </MapContainer>
  );
};

export default Map;
