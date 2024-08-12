import { useContext } from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AuthContext } from '../../providers/AuthProvider';

const SocialLogin = () => {
  const {signInWithGoogle} = useContext(AuthContext);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch(error => console.log(error))
  }
  return (
    <div>
      <div className='divider'>OR</div>
      <button onClick={handleGoogleSignIn} className="btn btn-circle mr-6">
                <h3><FaGoogle /> </h3>
              </button>
              <button onClick={handleGoogleSignIn} className="btn btn-circle">
                <h3><FaFacebook /> </h3>
              </button>
    </div>
  );
};

export default SocialLogin;