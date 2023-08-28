import { Box, FormControl, Input, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import RPCInputForm from "./rpcsInputForm";

function ParseProto() {
  const navigate = useNavigate();
  const [fileContent, setFileContent] = useState("");
  const [fillServiceinputs, setFillServiceInputs] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box>
      {(!fillServiceinputs || fileContent === "") && (
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
          <Box
            fontSize={"2rem"}
            fontWeight={"bold"}
            color={"#333"}
            p={"2rem"}
            display={"flex"}
            gap={5}
          >
            <Box
              onClick={() => navigate("/")}
              cursor={"pointer"}
              _hover={{ color: "brand.primary.200" }}
              _active={{ transform: "scale(0.9)" }}
            >
              <ArrowBackIcon />
            </Box>
            Parse Proto File
          </Box>

          {/* field to upload file.proto */}
          <Box
            w={"60%"}
            border={"1px"}
            borderColor={"#e0e0e0"}
            borderRadius={"lg"}
            display={"flex"}
            flexDirection={"column"}
            // justifyContent={"center"}
            // alignItems={"center"}
            p={"2rem"}
            // m={"2rem"}
            scrollBehavior={"smooth"}
          >
            <Text
              textStyle="htitle3"
              textAlign={"left"}
              fontWeight={"bold"}
              mb={5}
            >
              Upload File
            </Text>
            <FormControl>
              <Input
                placeholder="Upload File"
                label="Upload File"
                id="uploadFile"
                type="file"
                onChange={(e) => handleFileChange(e)}
                mb={5}
              />
            </FormControl>

            <Button
              alignSelf={"center"}
              colorScheme="brand.primary"
              variant="outline"
              size="md"
              w={"200px"}
              mt={5}
              _hover={{ backgroundColor: "#333", color: "#fff" }}
              _active={{ transform: "scale(0.98)" }}
              onClick={() => {
                fileContent !== "" && setFillServiceInputs(true);
              }}
            >
              Upload
            </Button>
          </Box>
        </Box>
      )}

      {fillServiceinputs && fileContent !== "" && (
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
          <Box
            fontSize={"2rem"}
            fontWeight={"bold"}
            color={"#333"}
            pt={"1.5rem"}
            pb={"1rem"}
            display={"flex"}
            gap={5}
          >
            Service RPCs
          </Box>
          <Flex>
            <Button
              alignSelf={"center"}
              colorScheme="brand.primary"
              variant="outline"
              size="md"
              w={"200px"}
              mb={5}
              mr={5}
              _hover={{
                backgroundColor: "#333",
                color: "#E0E0E0",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
              onClick={() => {
                navigate("/");
                setFillServiceInputs(false);
                setFileContent("");
              }}
            >
              Main Menu
            </Button>
            <Button
              alignSelf={"center"}
              colorScheme="brand.primary"
              variant="outline"
              size="md"
              w={"200px"}
              mb={5}
              mr={5}
              _hover={{
                backgroundColor: "#333",
                color: "#E0E0E0",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
              onClick={() => {
                setFillServiceInputs(false);
                setFileContent("");
              }}
            >
              Upload Another File
            </Button>
          </Flex>

          {/* 
            <Button
              alignSelf={"center"}
              colorScheme="brand.primary"
              variant="outline"
              size="md"
              w={"200px"}
              mb={5}
              _hover={{
                backgroundColor: "#333",
                color: "#E0E0E0",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
              //   onClick={DownloadFile}
            >
              Submit Inputs
            </Button> */}

          <RPCInputForm fileContent={fileContent} />
        </Box>
      )}
    </Box>
  );
}

export default ParseProto;
