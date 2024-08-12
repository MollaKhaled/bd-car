import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,GoogleAuthProvider } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const signIn = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut =() =>{
    setLoading(true);
    return signOut(auth);
  }
  const signInWithGoogle =()=>{
    return signInWithPopup(auth, googleAuthProvider)
  }
  useEffect(()=>{
  const unsubscribe =   onAuthStateChanged(auth, currentUser=>{
      console.log("auth state change", currentUser);
      setUser(currentUser);
      setLoading(false);
      if(currentUser && currentUser.email){
        const loggedUser = {
          email:currentUser.email
        }
      
     
      fetch('http://localhost:3000/jwt', {
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(loggedUser)
      })
      .then(res => res.json())
      .then(data => {
        console.log('jwt response',data);
        //warning local is is not best.this is the second best to access token
        localStorage.setItem('car-access-token', data.token);
        
      })
    }
    else{
      localStorage.removeItem('car-access-token')
    }
      
     });
    return ()=>{
      unsubscribe();
    }
  },[])
  const authInfo ={
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;