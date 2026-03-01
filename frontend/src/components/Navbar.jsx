import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X, User, LogOut, Heart, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  // GSAP Animation on Load
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 glass px-6 py-4 flex justify-between items-center transition-all duration-300"
    >
      {/* LOGO */}
      <h1
        className="text-3xl font-extrabold tracking-tight cursor-pointer text-gradient"
        onClick={() => navigate("/")}
      >
        HOPE
      </h1>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <Link to="/" className="hover:text-orange-600 transition-colors">
          Home
        </Link>
        <Link to="/donate" className="hover:text-orange-600 transition-colors">
          Donate
        </Link>
        <Link to="/order" className="hover:text-orange-600 transition-colors">
          Order
        </Link>

        {/* LOGIN BUTTON (If not logged in) */}
        {!user && (
          <Link
            to="/login"
            className="bg-orange-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
          >
            Login
          </Link>
        )}

        {/* USER DROPDOWN */}
        {user && (
          <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <div className="flex items-center gap-3 cursor-pointer group">
              {user.avatar ? (
                <img
                  src={`http://localhost:5000/uploads/${user.avatar}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-500 transition-all"
                />
              ) : (
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold border-2 border-orange-200 group-hover:border-orange-500 transition-all">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* DROPDOWN MENU */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    <User size={16} /> My Profile
                  </button>
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    <ShoppingBag size={16} /> My Orders
                  </button>
                </div>

                <div className="border-t border-gray-100 mt-2 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU TOGGLE (Simple placeholder for now) */}
      <div className="md:hidden text-gray-700">
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
