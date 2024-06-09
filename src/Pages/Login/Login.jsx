import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import logoLogin from "../../../src/assets/images/login.png";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/login1.svg";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const Login = () => {
  const { signIn, googleSignIn, githubSignIn } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosCommon = useAxiosCommon();

  const handleGoogleLogin = async () => {
    try {
      // 1. Google sign in from firebase
      const result = await googleSignIn();
      console.log(result.user);

      // 2. Prepare user info
      const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          photo: result?.user?.photoURL,
          role: 'user',
      };

      // 3. Update user info on the server
      const res = await axiosCommon.put('/users', userInfo);
      console.log(res.data);

      // 4. Show success message
      Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500
      });

      // 5. Navigate to the appropriate location
      navigate(location?.state ? location.state : "/");
  } catch (error) {
      console.log(error);

      // 6. Show error message
      Swal.fire({
          title: 'Error!',
          text: 'Invalid email or password',
          icon: 'error',
          confirmButtonText: 'Ok'
      });
  }
};
            // googleSignIn()
            // .then(result => {
            //     const userInfo = {
            //         email: result?.user?.email,
            //         name: result?.user?.displayName,
            //         photo: result?.user?.photoURL,
            //         role: 'user',
            //     }
            //     axiosCommon.put('/users', userInfo)
            //         .then(res => {
            //             console.log(res.data);
            //             Swal.fire({
            //                 position: "top",
            //                 icon: "success",
            //                 title: "Login successfully",
            //                 showConfirmButton: false,
            //                 timer: 1500
            //             });
            //             // navigate 
            //             navigate(location?.state ? location.state : "/");

            //         })
            //     console.log(result.user);

            // })
            // .catch(error => {
            //     console.log(error)
            //     Swal.fire({
            //         title: 'Error!',
            //         text: 'Invalid email or password',
            //         icon: 'error',
            //         confirmButtonText: 'ok'
            //     });
            // }
            
  

  const handleGithubLogin = async () => {
    try {
      // 1. Google sign in from firebase
      const result = await githubSignIn();
      console.log(result.user);

      // 2. Prepare user info
      const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          photo: result?.user?.photoURL,
          role: 'user',
      };

      // 3. Update user info on the server
      const res = await axiosCommon.put('/users', userInfo);
      console.log(res.data);

      // 4. Show success message
      Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500
      });

      // 5. Navigate to the appropriate location
      navigate(location?.state ? location.state : "/");
  } catch (error) {
      console.log(error);

      // 6. Show error message
      Swal.fire({
          title: 'Error!',
          text: 'Invalid email or password',
          icon: 'error',
          confirmButtonText: 'Ok'
      });
  }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      console.log(result.user);

      // navigate
      navigate(location?.state ? location.state : "/");
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
      className="min-h-screen px-4 bg-gray-600 rounded-xl flex flex-col items-center justify-center py-12 mt-6 md:mt-0 sm:px-6 lg:px-8 mb-24 md:mb-0"
    >
      <Helmet>
        <link rel="shortcut icon" href={logoLogin} type="image/x-icon" />
        <title>SurveySeeker || Login</title>
      </Helmet>

      <div className="w-full max-w-md p-8 space-y-3 rounded-xl text-gray-100">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              autoComplete="email"
              name="email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>

          <div className="mt-4 relative">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <span
              className="absolute bottom-[10px] right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoIosEyeOff className="text-2xl text-black" />
              ) : (
                <IoIosEye className="text-2xl text-black" />
              )}{" "}
            </span>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform text-lg bg-orange-600 border-0 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-white"></div>
          <p className="px-3 text-sm">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-white"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <FaGoogle className="text-2xl" />
          </button>

          <button
            onClick={handleGithubLogin}
            aria-label="Log in with GitHub"
            className="p-3 rounded-sm"
          >
            <FaGithub className="text-2xl" />
          </button>
        </div>
        <p className="text-xs text-center sm:px-6">
          Do not have an account?
          <Link
            to="/signup"
            rel="noopener noreferrer"
            className="underline pl-1 text-orange-500"
          >
            SignUp now
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;


// import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { Helmet } from "react-helmet";


// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const axiosPublic = useAxiosPublic();
//     const from = location.state?.from?.pathname || '/';

//     const { signIn, signInWithGoogle } = useAuth();

//     const handleLogin = event => {
//         event.preventDefault();
//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value
//         console.log(email, password);


//         signIn(email, password)
//             .then(result => {
//                 const user = result.user;
//                 console.log(user)
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: "Login successfully",
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//                 navigate(from, { replace: true });
//             })
//     }

//     const handleSocialLogin = () => {

//         signInWithGoogle()
//             .then(result => {
//                 const userInfo = {
//                     email: result?.user?.email,
//                     name: result?.user?.displayName,
//                     photo: result?.user?.photoURL,
//                     role: 'user',
//                 }
//                 axiosPublic.put('/users', userInfo)
//                     .then(res => {
//                         console.log(res.data);
//                         Swal.fire({
//                             position: "top-end",
//                             icon: "success",
//                             title: "Login successfully",
//                             showConfirmButton: false,
//                             timer: 1500
//                         });
//                         // navigate 
//                         navigate(location?.state ? location.state : '/');
//                     })
//                 console.log(result.user);

//             })
//             .catch(error => {
//                 console.log(error)
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'Invalid email or password',
//                     icon: 'error',
//                     confirmButtonText: 'ok'
//                 });
//             }
//             )
//     }
//     return (
//         <div>
//             <Helmet>
//                 <title>Login | Surveyz</title>
//             </Helmet>
//             <div className="flex justify-center items-center pt-24">
//                 <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
//                     <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
//                     <p className="text-sm text-center dark:text-gray-600">Dont have account?
//                         <Link to={'/register'} rel="noopener noreferrer" className="focus:underline hover:underline text-blue-500 ml-2">Sign up</Link>
//                     </p>
//                     <div className="my-6 space-y-4">
//                         <button onClick={handleSocialLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
//                                 <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
//                             </svg>
//                             <p>Login with Google</p>
//                         </button>

//                     </div>
//                     <div className="flex items-center w-full my-4">
//                         <hr className="w-full dark:text-gray-600" />
//                         <p className="px-3 dark:text-gray-600">OR</p>
//                         <hr className="w-full dark:text-gray-600" />
//                     </div>
//                     <form onSubmit={handleLogin} className="space-y-8">
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <label htmlFor="email" className="block text-sm">Email address</label>
//                                 <input type="email" name="email" id="email" placeholder="example@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
//                             </div>
//                             <div className="space-y-2 relative">
//                                 <div className="flex justify-between">
//                                     <label htmlFor="password" className="text-sm">Password</label>
//                                     <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
//                                 </div>
//                                 <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="***" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
//                                 <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="form-control mt-6">
//                             <input className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50" type="submit" value="Login" />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
