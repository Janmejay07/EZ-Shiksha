import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import img1 from "../../assests/images/unnamed.webp";
import { Contextfirst } from "../..";
import axios from "axios";
import { server } from "../..";
import toast from "react-hot-toast";

const navLinks = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Dive In",
    url: "/divein",
  },
  {
    display: "Study Assistant",
    url: "/study-assistant",
  },
  {
    display: "AI Tools",
    url: "/study-assistant",
  },
  {
    display: "Subscription",
    url: "/subscription",
  },
  {
    display: "Resources",
    url: "/videos",
  }
];

const Header = () => {

  const {authentication,Setauthentication}=useContext(Contextfirst);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggle = () => setIsMenuOpen(!isMenuOpen);

  const Logout=()=>{
    axios.get(`${server}/users/logout`,{
      withCredentials:true,
    }).then((res)=>{
      Setauthentication(false);
      toast.success("Logged Out")
    }).catch((error)=>{
      Setauthentication(true);
    })
  }

  if(!authentication){
    return(
      <Navigate to={"/"}/>
    )
  }

  return (
    <header className="w-full h-20 bg-gradient-to-r from-blue-100">
      <Container>
        <div className="flex items-center justify-between h-full">
          <div className="logo mt-3">
            <h2 className="flex items-center gap-1 text-2xl font-poppins text-secondary">
              <img src={img1} className="w-20 object-contain mr-2" alt="" /> EzShiksha.
            </h2>
          </div>

          <div className="nav flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-5">
              <ul className="flex items-center justify-center gap-5 list-none m-0 p-0">
                {navLinks.map((item, index) => (
                  <li key={index}>
                    <Link to={item.url} className="font-medium text-lg text-secondary no-underline hover:text-primary transition-colors duration-300">
                      {item.display === "Dive In" ? (
                        <Button className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity border-0">
                          {item.display}
                        </Button>
                      ) : (
                        item.display
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              {authentication && (
                <button 
                  className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                  onClick={Logout}
                >
                  Logout
                </button>
              )}
            </div>

            <div className="mobile__menu lg:hidden block">
              <span className="cursor-pointer" onClick={menuToggle}>
                <i className="ri-menu-line text-2xl text-secondary"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="fixed top-0 left-0 w-full h-full bg-[#0a2b1ec2] z-[99] transition-all duration-200 lg:hidden"
            onClick={menuToggle}
          >
            <ul className="absolute top-0 right-0 w-64 h-full bg-white z-[999] flex flex-col items-center pt-20 gap-5 list-none m-0 p-0">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.url} 
                    className="font-medium text-lg text-secondary no-underline hover:text-primary transition-colors duration-300"
                    onClick={menuToggle}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
              {authentication && (
                <button 
                  className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                  onClick={Logout}
                >
                  Logout
                </button>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
