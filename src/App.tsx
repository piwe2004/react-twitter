import { useState, useEffect } from 'react';
import Router from 'components/Router';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { app } from 'firebaseApp';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Loader from 'components/loader/Loader';

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  const [init, setInit] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setIsAuthenticated(true)
      }else{
        setIsAuthenticated(false)
      }
      setInit(true)
    })
  }, [auth])
  return (
    <Layout>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  );
}

export default App;
