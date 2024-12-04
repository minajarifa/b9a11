import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();

  //  Theme Controller start function start
  const [theme, setTheme] = useState('dim');
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);
  const handleToggleLight = (e) => {
    if (e.target.checked) {
      setTheme('winter');
    }
    else {
      setTheme('dim');
    }
  }
  // console.log(theme)
  //  Theme Controller start function end
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto fixed z-50 right-0 left-0 top-0 ">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img
            className="w-auto h-7"
            src="https://i.ibb.co/K7R285N/tutore-Logo.png"
            alt=""
          />
          <span className="font-bold text-2xl">Tutor</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AllServices" className="justify-between"> Services</Link>
          </li>
          {
            user && <>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">Dashboard</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                  <li>
                    <Link to="/Add">Add Service</Link>
                  </li>
                  <li>
                    <Link to="/Manage">Manage Services</Link>
                  </li>
                  <li>
                    <Link to="/Booked">Booked Service</Link>
                  </li>
                  <li>
                    <Link to="/ServiceToDo">Service To Do </Link>
                  </li>
                </ul>
              </div>
            </>
          }

          {!user && (
            <>
              <li>
                <Link to="/Login">Login</Link>
              </li><li>
                <Link to="/Register">Register</Link>
              </li>
            </>
          )

          }
        </ul>
        {/* Theme Controller start*/}
        <label className="grid cursor-pointer place-items-center">
          <input
            onChange={handleToggleLight}
            type="checkbox"

            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />

          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        {/* Theme Controller end */}

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  title={user?.displayName}
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >

              <li>{user?.displayName}</li>
              <li>{user?.email}</li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className=" block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;
