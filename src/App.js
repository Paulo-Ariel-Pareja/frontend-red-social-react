import React, { useState, useEffect } from 'react';
import SignInSingUp from './page/SignInSingUp'
import { ToastContainer } from 'react-toastify';
import {AuthContext} from './utils/context';
import {isUserLogedApi} from './api/auth'
import Routing from './routes/Routing';

export default function App() {
  const [user, setUser] = useState(null)
  const [loadUser, setloadUser] = useState(false)
  const [refreshCheckLogin, setrefreshCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLogedApi())
    setrefreshCheckLogin(false)
    setloadUser(true)
  }, [refreshCheckLogin])

  if(!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
          <Routing setrefreshCheckLogin={setrefreshCheckLogin}/>
      ) : (
          <SignInSingUp setrefreshCheckLogin={setrefreshCheckLogin}/>
        )}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )

}
