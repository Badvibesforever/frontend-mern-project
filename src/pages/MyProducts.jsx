import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  Box,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

export default function MyProducts() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/my`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading your products...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="900px" mx="auto" mt={6}>
      <Heading size="lg" mb={4}>
        My Products
      </Heading>

      {products.length === 0 ? (
        <Text>No products posted yet.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {products.map((p) => (
            <Box
              key={p._id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              boxShadow="sm"
              bg="white"
            >
              <Heading size="md" mb={2}>
                {p.name}
              </Heading>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  height: "150px",
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: "6px",
                }}
              />
              <Text mt={2}>${p.price}</Text>
              <Button size="sm" mt={2}>
                Edit
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
