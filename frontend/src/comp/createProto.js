import {
  Box,
  FormControl,
  Input,
  Divider,
  Button,
  Flex,
} from "@chakra-ui/react";
import ProtoServiceForm from "./protoServiceForm";
import ProtoMessagesForm from "./protoMessagesForm";
import { useState } from "react";
import axios from "axios";

function CreateProto() {
  const [fileName, setFileName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [service, setService] = useState({
    serviceName: "",
    rpcName: "",
    requestType: "",
    responseType: "",
  });
  const [messages, setMessages] = useState([
    { name: "", params: [{ paramName: "", paramType: "" }] },
  ]);

  const [created, setCreated] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const saveProto = () => {
    const protoFile = {
      fileName: fileName,
      packageName: packageName,
      service: service,
      messages: messages,
    };
    axios
      .post("http://127.0.0.1:3005/api/create-proto", protoFile)
      .then((res) => {
        setCreated(true);

        // get the file content
        axios
          .get(`http://localhost:3005/uploads/${fileName}.proto`)
          .then((res) => {
            setFileContent(res.data);
            console.log(fileContent);
          });

        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const DownloadFile = () => {
    const bolb = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(bolb);
    const link = document.createElement("a");

    link.download = `${fileName}.proto`;
    link.href = url;
    link.click();
  };

  const handleCreateNewFile = () => {
    setCreated(false);
    setFileName("");
    setPackageName("");
    setService({
      serviceName: "",
      rpcName: "",
      requestType: "",
      responseType: "",
    });
    setMessages([{ name: "", params: [{ paramName: "", paramType: "" }] }]);
  };

  return (
    <Box>
      {!created && (
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
          <Box fontSize={"2rem"} fontWeight={"bold"} color={"#333"} p={"2rem"}>
            Create Proto File
          </Box> 
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
            <FormControl>
              <Input
                placeholder="File Name"
                label="File Name"
                id="fileName"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value.replace(" ", "_"))}
                mb={5}
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Package Name"
                label="Package Name"
                id="package-name"
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
            </FormControl>

            <Divider bgColor="brand.primary.200" mb={5} mt={5} />
            <ProtoServiceForm service={service} setService={setService} />

            <Divider bgColor="brand.primary.200" mb={5} mt={5} />
            {messages.map((message, index) => (
              <ProtoMessagesForm
                key={index}
                index={index}
                setMessages={setMessages}
                messages={messages}
              />
            ))}

            <Button
              alignSelf={"center"}
              colorScheme="brand.primary"
              variant="outline"
              size="md"
              w={"200px"}
              onClick={saveProto}
            >
              Save File
            </Button>
          </Box>
        </Box>
      )}

      {created && (
        <Box
          bg={"#f5f5f5"}
          w={"100%"}
          minH={"100vh"}
          h={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box fontSize={"2rem"} fontWeight={"bold"} color={"#333"} p={5}>
            {fileName}.Proto File
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
              onClick={handleCreateNewFile}
            >
              Create New File
            </Button>

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
              onClick={DownloadFile}
            >
              Download File
            </Button>
          </Flex>
          <Box
            w={"60%"}
            h={"75vh"}
            border={"1px"}
            borderColor={"#e0e0e0"}
            p={"2rem"}
            backgroundColor={"#333"}
            color={"#E0E0E0"}
            overflowY={"scroll"}
            scroll={"smooth"}
            // styling the scroll bar
            css={{
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#f5f5f5",
                borderRadius: ".2em",
              },
            }}
            borderRadius={"lg"}
          >
            <pre>{fileContent}</pre>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CreateProto;
