import React from "react";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { LuMoon, LuSun } from "react-icons/lu";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Link to={"/"}>MERN Stack App </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <CiSquarePlus forntsize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuSun size="20" /> : <LuMoon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
