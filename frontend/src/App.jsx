import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Language */
import { LanguageProvider } from "./context/LanguageContext";

/* Pages */
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Donate Dashboard & Forms */
import DonateDashboard from "./donate/DonateDashboard";
import AddVeg from "./donate/AddVeg";
import AddNonVeg from "./donate/AddNonVeg";
import AddDrinks from "./donate/AddDrinks";
import AddSnacks from "./donate/AddSnacks";
import InviteCelebration from "./donate/InviteCelebration";

/* Order Category Pages */
import VegFood from "./order/VegFood";
import NonVegFood from "./order/NonVegFood";
import Drinks from "./order/Drinks";
import Snacks from "./order/Snacks";
import Celebration from "./order/Celebration";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* MAIN ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<DonateDashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* DONATE SUB-ROUTES */}
          <Route path="/donate/veg" element={<AddVeg />} />
          <Route path="/donate/nonveg" element={<AddNonVeg />} />
          <Route path="/donate/drinks" element={<AddDrinks />} />
          <Route path="/donate/snacks" element={<AddSnacks />} />
          <Route
            path="/donate/celebration"
            element={<InviteCelebration />}
          />

          {/* ORDER CATEGORY ROUTES */}
          <Route path="/order/veg" element={<VegFood />} />
          <Route path="/order/nonveg" element={<NonVegFood />} />
          <Route path="/order/drinks" element={<Drinks />} />
          <Route path="/order/snacks" element={<Snacks />} />
          <Route path="/order/celebration" element={<Celebration />} />
        </Routes>

        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;

