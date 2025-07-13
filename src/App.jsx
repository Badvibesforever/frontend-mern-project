import { useEffect } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./pages/PrivateRoute";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore"; // ✅ import Zustand store

function App() {
  const bg = useColorModeValue("gray.100", "gray.900");
  const getProfile = useAuthStore((s) => s.getProfile);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bg={bg}>
        <Spinner size="xl" />
      </Center>
    );
  }

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
