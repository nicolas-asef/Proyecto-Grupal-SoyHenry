import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserId } from "../../redux/actions/actions";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getUserId(user.sub));
    }
  }, [dispatch]);

  if (isAuthenticated && userRedux.isAdmin) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedAdmin;
