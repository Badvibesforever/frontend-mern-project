import { useColorModeValue } from "@/components/ui/color-mode";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { Heading, VStack, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Toast Title",
        description: "Toast Description",
        closable: true,
        duration: 6000,
      });
    } else {
      toaster.create({
        title: "Toast Title",
        description: "Toast Description",
        closable: true,
        duration: 6000,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"xl"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorPalette="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
