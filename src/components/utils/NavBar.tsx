"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-foreground">
          24x7Dental
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center rounded-full border">
                <NavItem label="Home" path="/" />
                <NavItem label="Dashboard" path="/dashboard" />
                <NavItem label="Booking" path="/booking" />
              </div>
              <div className="flex items-center rounded-full border border-foreground/20 px-4">
                <NavItem label="Profile" path="/profile" />

                <NavItem
                  label="Sign Out"
                  path="/"
                  callBack={() => {
                    logout();
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center rounded-full border">
                <NavItem label="Home" path="/" />
              </div>
              <div className="flex items-center rounded-full border border-foreground/20 px-4">
                <NavItem label="Login" path="/login" />
                <NavItem label="Register" path="/register" />
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 top-16 z-50 w-full bg-white p-4 shadow-lg md:hidden">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <MobileNavItem label="Home" path="/" onClick={toggleMenu} />
                  <MobileNavItem
                    label="Dashboard"
                    path="/dashboard"
                    onClick={toggleMenu}
                  />
                  <MobileNavItem
                    label="Booking"
                    path="/booking"
                    onClick={toggleMenu}
                  />
                  <div className="flex flex-col gap-2 pt-4">
                    <MobileNavItem
                      label="Profile"
                      path="/profile"
                      onClick={toggleMenu}
                    />
                    <MobileNavItem
                      path="/"
                      label="Logout"
                      callBack={() => logout()}
                      onClick={toggleMenu}
                    />
                  </div>
                </>
              ) : (
                <>
                  <MobileNavItem label="Home" path="/" onClick={toggleMenu} />

                  <div className="flex flex-col gap-2 pt-4">
                    <MobileNavItem
                      label="Login"
                      path="/login"
                      onClick={toggleMenu}
                    />
                    <MobileNavItem
                      label="Register"
                      path="/register"
                      onClick={toggleMenu}
                    />
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

// Desktop Navigation Item
const NavItem = ({
  label,
  path,
  callBack,
}: {
  label: string;
  path: string;
  callBack?: () => void;
}) => (
  <Link
    to={path}
    onClick={() => {
      if (callBack) {
        callBack();
      }
    }}
    className={`px-6 py-2 text-sm font-medium transition-colors : "text-foreground"
    }`}
  >
    {label}
  </Link>
);

// Mobile Navigation Item
const MobileNavItem = ({
  label,
  path,
  onClick,
  callBack,
}: {
  label: string;
  path: string;
  onClick: () => void;
  callBack?: () => void;
}) => (
  <Link
    to={path}
    onClick={() => {
      onClick();
      if (callBack !== undefined) {
        callBack();
      }
    }}
    className={`block rounded-md px-3 py-2 text-sm font-medium "text-foreground"}`}
  >
    {label}
  </Link>
);
