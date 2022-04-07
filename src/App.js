
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);


function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
  console.log('clicked');
  signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.log('error', error);
  })
  }
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      setUser({})
      })
      .catch(error => {
      setUser({});
    })
  }

  const handleGitHubSignIn = () => {
    console.log('clicked')
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
      console.error(error);
    })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
        : <>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGitHubSignIn}>Github Sign In</button>
          </>
      
      }
        

      <h1>Name: {user.displayName}</h1>
      <p>email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
