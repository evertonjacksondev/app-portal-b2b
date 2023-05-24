import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Cart } from "./pages/Cart";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import { ProtectedRoutes, } from "./PrivateRoute";


const App = () => {


  return (
    <Router>
      <Routes>
        {/* Rotas protegidas */}
        <Route element={<ProtectedRoutes />}>
     
            <Route path='/produtos' element={<Products />} />
            <Route path='/pedidos' element={<Orders />} />
            <Route path='/clientes' element={<Customers />} />
            <Route path='/orcamento' element={<Cart />} />
     
        </Route>

        {/* Rotas publicas */}
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </Router >
  );
}

export default App;
