import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error("Error loading product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(product),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast({ title: "Product updated", status: "success" });
        navigate("/my-products");
      } else {
        toast({ title: data.message, status: "error" });
      }
    } catch (err) {
      toast({ title: "Update failed", status: "error" });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text>Loading product...</Text>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box mt={10} textAlign="center">
        <Text>Product not found.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="500px" mx="auto" mt={6}>
      <Heading mb={4}>Edit Product</Heading>
      <form onSubmit={handleUpdate}>
        <VStack spacing={4}>
          <Input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product name"
          />
          <Input
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <Input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
          />
          <Button type="submit" colorScheme="blue" w="100%">
            Update Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
