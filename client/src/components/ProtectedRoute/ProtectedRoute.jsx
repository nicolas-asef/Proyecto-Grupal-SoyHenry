import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUserDetail } from '../../redux/actions/actions'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const ProtectedRoute = ({children}) => {
	const { isAuthenticated, user } = useAuth0();
  const [alreadyOnboard, setAlreadyOnboard] = useState();
  const userDetail = useSelector(state => state.userDetail)
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false)

  React.useEffect( () => {
    if(isAuthenticated) {
     	dispatch(getUserDetail(user.sub))
      .then( user => {
        if(user.onBoarded) {
          return setAlreadyOnboard(false)
        }
      });

      if(alreadyOnboard) return;

      if(userDetail.id) {
        if(!userDetail.onBoarded) {
          setRedirect(true)
        } else {
          setRedirect(false)
        }
      } else if (userDetail.message) {
        dispatch(createUser({
					ID: user.sub,
      		email: user.email,
     			img: user.picture
				}))
				setRedirect(true)
      }
    }
  }, [dispatch, isAuthenticated, userDetail.id, userDetail.message, userDetail.onBoarded])

	if( isAuthenticated && redirect) return <Navigate to="/onboarding" />

	return children;
};

export default ProtectedRoute;
