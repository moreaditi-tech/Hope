import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-orange-500 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">HOPE</h1>

      <div className="flex items-center gap-6 font-medium">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/donate" className="hover:underline">Donate</Link>
        <Link to="/order" className="hover:underline">Order</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
