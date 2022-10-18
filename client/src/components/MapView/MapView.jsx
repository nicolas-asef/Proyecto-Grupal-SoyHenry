import React, { useState } from "react";
import Map from "./Map/Map";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetail, getUsers } from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Preview from "./Preview/Preview";

const MapView = () => {
  // const [userState, setUserState] = useState([]);
  const { user, isLoading, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && user) {
      dispatch(getUserDetail(user.sub));
    }
  }, [dispatch, user]);

  return <div>{!isAuthenticated ? <Preview /> : <Map />}</div>;
};

export default MapView;
