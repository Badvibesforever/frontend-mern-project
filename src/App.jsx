import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "./store/product";
import { Toaster } from "@/components/ui/toaster";
function App() {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box minH="100vh" bg={bg}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
