import React, { useState } from "react";
import { Link, Navigate } from "react-router";
import { useUser } from "~/contexts/UserContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">
              Projekta darbs
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to={"/"}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-950"
            >
              Sākums
            </Link>
            <Link
              to={"/vesture_proj_darbs.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-950"
            >
              Projekta darbs
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <g id="Interface / External_Link">
                    <path
                      id="Vector"
                      d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                      stroke="#FFFFFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </span>
            </Link>
            <Link
              to={"/tests"}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-950"
            >
              Testi
            </Link>
            <Link
              to={"/about"}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-950"
            >
              Par projektu
            </Link>
            {user ? (
              <>
                <Link
                  to={"/logout"}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-800 hover:bg-red-950"
                >
                  Izrakstīties
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/auth"}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-950"
                >
                  Autentificēties
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Side menu for mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-800 w-64 shadow-lg z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            About
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Services
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Contact
          </a>
        </nav>
      </div>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
