import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { saveToken } from '../redux/actions'

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const dispatch = useDispatch()
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const signIn = async (params, setError) => {
    const { email, password } = params
    try {
      const res = await axios.post('http://localhost:4000/api/users/signin', {
        email,
        password
      })
      const token = res.headers.authorization
      dispatch(saveToken(token))
      const { data } = res
      setUser(data.user)
      setLoggedIn(true);
      Router.push(`/`);
      
    } catch (error) {
      setError(error.response.data.error)
    }
  };

  const signUp = async (params, setErrorObject, errorObject) => {
    const { username, lastName, email, phone, password, document, documentType } = params

    try {
      const res = await axios.post('http://localhost:4000/api/users/signup', {
        user: {
          name: username,
          last_name: lastName,
          email,
          phone: phone,
          password,
          document,
          document_type: documentType,
          type: 'client'
        },
      })
      const token = res.headers.authorization
      dispatch(saveToken(token))
      const { data } = res
      setUser(data.user); 
      setLoggedIn(true);
      Router.push(`/`);
    } catch (err) {
      if(err.response.status === 500) {
        setErrorObject({...errorObject, phone: err.response.data.error})
      }else if (err.response.status === 400) {
        setErrorObject({...errorObject, email: err.response.data.error.email})
      }
    }
  };

  const logOut = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
