import { useEffect, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import useAuth from "../../hook/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/"
  const { createUser, updateUserProfile, signInWithGoogle, signInWithGithub, user, setUser, loading } = useAuth();
  // console.log(createUser)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const user = { name, email, password, photo }
    // console.log(user)
    try {
      const result = await createUser(email, password);
      await updateUserProfile(name,photo);
      setUser({
        ...result?.user,
        displayName: name,
        photoURL: photo,
      })
      const { data } = await axios.post('https://b9a11-server-red.vercel.app/jwt', { email: result?.user?.email }, );
      // console.log("data", data);
      Swal.fire("User created successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: `${error?.message}`,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }


  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { data } = await axios.post('https://b9a11-server-red.vercel.app/jwt', { email: result?.user?.email }, );
      // console.log("data", data);
      Swal.fire("Login successfully!");
      navigate(from, { replace: true });
    }

    catch (error) {
      console.error(error)
      Swal.fire({
        title: `${error?.message}`,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/public/error.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }

  }

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithGithub();
      const { data } = await axios.post('https://b9a11-server-red.vercel.app/jwt', { email: result?.user?.email }, );
      // console.log("data", data);
      Swal.fire("Login successfully!");
      navigate(from, { replace: true });
    }

    catch (error) {
      console.error(error)
      Swal.fire({
        title: `${error?.message}`,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/public/error.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }

  }
  if (user || loading) return;

  return (
    <div className="mb-20 ">
      <div className="flex-col hero-content ">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative flex ">
                <input
                  type={showPassword ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  className="w-full input input-bordered"
                />
                <button
                  className="absolute mt-5 ml-60"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <FaEye />}
                </button>
              </div>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="mt-6 form-control">
              <button className="submit btn btn-primary">Register</button>

            </div>
          </form>
          <div className="flex justify-center m-8">
            <button onClick={handleGoogleSignIn} className="mr-5 btn">Google</button>
            <button onClick={handleGithubSignIn} className="mr-5 btn">Github</button>
          </div>
          <p className="text-3xl text-center">
            Don't have an Account please

            <Link to="/Login">
              <span className="m-4 text-sky-800">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
