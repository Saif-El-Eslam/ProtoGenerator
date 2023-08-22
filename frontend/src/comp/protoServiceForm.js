import { Box, FormControl, Input, Text, Flex } from "@chakra-ui/react";

function ProtoServiceForm({ service, setService }) {
  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Box>
      <Text textStyle="htitle3" textAlign={"left"} fontWeight={"bold"} mb={5}>
        Service
      </Text>

      <Flex flexWrap="wrap" justifyContent="space-between">
        <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
          <Input
            placeholder="Service Name"
            label="Service Name"
            id="serviceName"
            type="text"
            value={service.serviceName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
          <Input
            placeholder="RPC Name"
            label="RPC Name"
            id="rpcName"
            type="text"
            value={service.rpcName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
          <Input
            placeholder="Request Type"
            label="Request Type"
            id="requestType"
            type="text"
            value={service.requestType}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
          <Input
            placeholder="Response Type"
            label="Response Type"
            id="responseType"
            type="text"
            value={service.responseType}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>
    </Box>
  );
}

export default ProtoServiceForm;
