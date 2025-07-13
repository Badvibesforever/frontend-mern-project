import React from "react";
import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toaster } from "@/components/ui/toaster";
import { useColorMode } from "@/components/ui/color-mode";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toaster({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      py={4}
      px={6}
      shadow="md"
    >
      <Container maxW="1140px">
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", sm: "row" }}
        >
          <RouterLink to="/">
            <Text
              fontSize={{ base: "2xl", sm: "3xl" }}
              fontWeight="bold"
              textTransform="uppercase"
              bgGradient="to-r"
              gradientFrom="teal.400"
              gradientTo="blue.500"
              bgClip="text"
              textAlign="center"
            >
              MERN Stack App
            </Text>
          </RouterLink>

          <HStack spacing={3} mt={{ base: 4, sm: 0 }}>
            {user && (
              <RouterLink to="/create">
                <Button title="Create product" leftIcon={<CiSquarePlus />}>
                  Create
                </Button>
              </RouterLink>
            )}

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <LuSun size={20} />
              ) : (
                <LuMoon size={20} />
              )}
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
                <RouterLink to="/login">
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </RouterLink>
                <RouterLink to="/register">
                  <Button size="sm" colorScheme="teal">
                    Register
                  </Button>
                </RouterLink>
              </>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;
