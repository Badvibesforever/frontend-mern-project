import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/login";
import Register from "./pages/Register";
import PrivateRoute from "./pages/PrivateRoute";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" bg={bg}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-products"
          element={
            <PrivateRoute>
              <MyProducts />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
