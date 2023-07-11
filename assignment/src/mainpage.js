import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});
  const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  const logOut = () => {
    googleLogout();
    setProfile(null);
};

  // ? If we have no User: we can show the signIn button.
  // ? If we have a User: we show the logOut button.


  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
      {profile ? (
      <div id="mainPage">
          {user && (
            <div>
              <img src={user.picture} />
              <h1> {user.name}</h1>
            </div>
          )}
        </div>
        ) : (
        <div id="signInDiv" className="flex h-full w-full">
          <div className="h-full w-[40%] bg-black flex justify-center items-center">
            <h1 className="font-montserrat text-white text-7xl font-bold">
              Board.
            </h1>
          </div>
          <div
            id="SignIn"
            className="w-[60%] h-full flex items-center justify-center flex-col bg-neutral-100"
          >
            <div>
              <h1 className="font-montserrat text-black text-4xl font-bold text-start ">
                Sign In
              </h1>
              <h1 className="font-lato text-black text-base font-normal">
                Sign in to your account
              </h1>
              <div className="flex font-montserrat">
                
                <div className="w-[180px] h-[30px] flex items-center justify-center gap-[10.5px] bg-white rounded-[10px]">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_0_355)">
                      <path
                        d="M6.34516 1.21952C7.27201 0.00716167 8.56055 0.00125122 8.56055 0.00125122C8.56055 0.00125122 8.75222 1.14107 7.83144 2.23908C6.84828 3.41151 5.73078 3.21966 5.73078 3.21966C5.73078 3.21966 5.52094 2.29759 6.34516 1.21952V1.21952ZM5.84866 4.0181C6.32548 4.0181 7.21043 3.36763 8.36232 3.36763C10.3451 3.36763 11.1251 4.76781 11.1251 4.76781C11.1251 4.76781 9.59954 5.54189 9.59954 7.42017C9.59954 9.53904 11.5 10.2693 11.5 10.2693C11.5 10.2693 10.1715 13.9801 8.37708 13.9801C7.55292 13.9801 6.91217 13.4289 6.04378 13.4289C5.15883 13.4289 4.28065 14.0007 3.70868 14.0007C2.0701 14.0007 0 10.4806 0 7.65098C0 4.86704 1.7522 3.40664 3.39569 3.40664C4.46411 3.40664 5.29321 4.0181 5.84866 4.0181V4.0181Z"
                        fill="#999999"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_355">
                        <rect width="11.5" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="text-center text-zinc-500 text-xs">Sign in with Apple</p>
                </div>
              </div>
              <div
                className="w-[385px] h-[317px] p-[30px] font-lato bg-white rounded-[20px]"
                id="input form"
              >
                <div className="text-black text-base font-normal mb-[10px]">
                  Email address
                </div>
                <input
                  className="w-[325px] h-10 bg-neutral-100 rounded-[10px] pl-[15px] focus:ring-0 mb-5"
                  placeholder="johndoe@gmail.com"
                />
                <div className="text-black text-base font-normal mb-[10px]">
                  Password
                </div>
                <input
                  className="w-[325px] h-10 bg-neutral-100 rounded-[10px] pl-[15px] focus:ring-0 mb-5"
                  placeholder="••••••••"
                />

                <div className="text-blue-600 text-base font-normal mb-5">
                  Forgot password?
                </div>
                <div className="w-[325px] h-10 bg-black rounded-[10px] flex justify-center items-center">
                  <div className="w-[101.96px] h-[21.71px] text-center text-white text-base font-bold font-montserrat">
                    Sign In
                  </div>
                </div>
              </div>
              <div className="mt-5 w-full text-center font-lato">
                <span className="text-zinc-500 text-base font-normal">
                  Don’t have an account?{" "}
                </span>
                <span className="text-blue-600 text-base font-normal">
                  Register here
                </span>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
export default App;
