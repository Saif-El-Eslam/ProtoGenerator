import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home({ service, setService, messageParamsTypes }) {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        bg={"#f5f5f5"}
        w={"100%"}
        minH={"100vh"}
        h={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        pb={5}
      >
        <Box fontSize={"2rem"} fontWeight={"bold"} color={"#333"} p={5}>
          Proto Minig
        </Box>

        <Box
          w={{ base: "100%", sm: "48%" }}
          //   h={"100vh"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          m={"auto"}
        >
          <Button
            alignSelf={"center"}
            colorScheme="brand.primary"
            variant="outline"
            size="md"
            w={"200px"}
            mb={5}
            mr={5}
            _hover={{ backgroundColor: "#333", color: "#fff" }}
            _active={{ transform: "scale(0.98)" }}
            onClick={() => navigate("/parse-proto")}
          >
            Parse Proto
          </Button>

          <Button
            alignSelf={"center"}
            colorScheme="brand.primary"
            variant="outline"
            size="md"
            w={"200px"}
            mb={5}
            mr={5}
            _hover={{ backgroundColor: "#333", color: "#fff" }}
            _active={{ transform: "scale(0.98)" }}
            onClick={() => navigate("/create-proto")}
          >
            Generate Proto
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
