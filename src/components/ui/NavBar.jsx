import React from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { CiSquarePlus } from "react-icons/ci";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    await logout();
    toast({ title: "Logged out", status: "info", duration: 3000 });
    navigate("/login");
  };

  return (
    <Container maxW={"1140px"} p={4}>
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip="text"
        >
          <Link to={"/"}>MERN Stack App</Link>
        </Text>

        <HStack spacing={3} alignItems={"center"}>
          <Link to="/create">
            <Button title="Create product">
              <CiSquarePlus />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuSun size="20" /> : <LuMoon />}
          </Button>

          {user ? (
            <>
              <Text fontSize="sm" fontWeight="medium">
                {user.email}
              </Text>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="sm" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" colorScheme="teal">
                  Register
                </Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
