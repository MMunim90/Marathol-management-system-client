import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { CgBrowse, CgProfile } from "react-icons/cg";
import {
  MdDarkMode,
  MdOutlineSpaceDashboard,
  MdPlaylistAddCircle,
  MdTipsAndUpdates,
} from "react-icons/md";
import { FaHome, FaRunning, FaUserFriends } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";
import { IoMdClose } from "react-icons/io";
import { GoArrowUpLeft } from "react-icons/go";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLogOut = () => {
    // console.log("user trying to logout")
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out Successfully",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        const selected = searchData[selectedItem];
        if (selected && selected._id) {
          window.open(`/marathonDetail/${selected._id}`, "_self");
        }
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    if (search !== "") {
      fetch(`${import.meta.env.VITE_API_URL}/getMarathon`)
        .then((res) => {
          if (!res.ok) throw new Error("Server returned error");
          return res.json();
        })
        .then((data) => {
          const filtered = data.filter((marathon) =>
            marathon.title.toLowerCase().includes(search.toLowerCase())
          );
          setSearchData(filtered);
        })
        .catch((error) => console.error("Fetch error:", error));
    } else {
      setSearchData([]);
    }
  }, [search]);

  return (
    <div className="navbar bg-gray-400 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "border-b-2" : "")}
                to="/"
              >
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "border-b-2" : "")}
                to="/about"
              >
                <FaUserFriends />
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "border-b-2" : "")}
                to="/marathon"
              >
                <FaRunning />
                Marathons
              </NavLink>
            </li>
            {user ? (
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "border-b-2" : "")}
                  to="/dashboard"
                >
                  <MdOutlineSpaceDashboard />
                  Dashboard
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="flex items-center">
          <img
            className="hidden lg:block w-10 rounded-xl"
            src="https://i.ibb.co/PGgVzGs7/logo.png"
            alt=""
          />
          <Link
            to="/"
            className="font-bold text-lg md:text-2xl lg:text-4xl lg:ml-6"
          >
            Runfinity
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden md:flex">
        <section className="search_section">
          <div className="search_input_div">
            <input
              type="text"
              className="search_input"
              placeholder="Search..."
              autoComplete="off"
              onChange={handleChange}
              value={search}
              onKeyDown={handleKeyDown}
            />
            <div className="search_icon text-black">
              {search === "" ? (
                <BsSearch />
              ) : (
                <IoMdClose onClick={handleClose} />
              )}
            </div>
          </div>
          <div className="search_result">
            {searchData.map((data, index) => {
              return (
                <Link
                  key={index}
                  className={
                    selectedItem === index
                      ? "search_suggestion_line active"
                      : "search_suggestion_line"
                  }
                  to={`/marathonDetail/${data._id}`}
                >
                  {
                    data ? <div><GoArrowUpLeft className="inline mr-2"/> {data.show?.title || data.title}</div> : "Nothing match to search input"
                  }
                </Link>
              );
            })}
          </div>
        </section>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
                to="/"
              >
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "border-b-2" : "")}
                to="/about"
              >
                <FaUserFriends />
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
                to="/marathon"
              >
                <FaRunning />
                Marathons
              </NavLink>
            </li>
            {user ? (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-black" : ""
                  }
                  to="/dashboard"
                >
                  <MdOutlineSpaceDashboard />
                  Dashboard
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="flex gap-4 items-center">
          {!user ? (
            <div className="md:text-xl font-bold btn btn-outline border-black rounded-xl cursor-pointer hidden md:block md:pt-0.5">
              <Link to="/register">
                Register
              </Link>
            </div>
          ) : (
            ""
          )}

          {!user ? (
            <div className="md:text-xl font-bold btn border-none rounded-lg cursor-pointer">
              <Link to="/login">
                Login
              </Link>
            </div>
          ) : (
            ""
          )}
          <div className="dropdown dropdown-hover dropdown-end">
            {user ? (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="Tailwind CSS Navbar component"
                    src={`${user && user.photoURL}`}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
            >
              <li>
                <a className="text-2xl font-bold">
                  User : {user && user.displayName}
                </a>
              </li>
              {user ? (
                <NavLink
                  to="/profile"
                  className="btn bg-black text-white cursor-pointer text-xl"
                >
                  <CgProfile />
                  Profile
                </NavLink>
              ) : (
                ""
              )}
              <button className="btn bg-black text-white cursor-pointer">
                <label className="swap swap-rotate">
                  <input type="checkbox" onClick={handleToggle} />
                  <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </button>
            </ul>
          </div>
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn cursor-pointer text-xl pr-2"
            >
              <BiLogOut />
              Log out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
