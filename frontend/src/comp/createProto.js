import { Box, FormControl, Input, Divider, Button } from "@chakra-ui/react";
import ProtoServiceForm from "./protoServiceForm";
import ProtoMessagesForm from "./protoMessagesForm";
import { useState } from "react";

function CreateProto() {
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

  const saveProto = () => {
    console.log({
      packageName,
      service,
      messages,
    });
  };

  return (
    <Box
      bg={"#f5f5f5"}
      w={"100%"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        // style as heading
        fontSize={"2rem"}
        fontWeight={"bold"}
        color={"#333"}
        p={"2rem"}
      >
        Create Proto
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
        m={"2rem"}
        scrollBehavior={"smooth"}
      >
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
          Save Proto
        </Button>
      </Box>
    </Box>
  );
}

export default CreateProto;
