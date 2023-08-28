import { Box, FormControl, Input, Text, Flex, Select } from "@chakra-ui/react";

function ProtoServiceForm({ service, setService, messageParamsTypes }) {
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
          {/* <Input
            placeholder="Request Type"
            label="Request Type"
            id="requestType"
            type="text"
            value={service.requestType}
            onChange={handleChange}
          /> */}
          <Select
            placeholder="Request Type"
            label="Request Type"
            id="requestType"
            value={service.requestType}
            onChange={handleChange}
            // color={"gray.500"}
          >
            {messageParamsTypes.map((dataType) => (
              <option key={dataType} value={dataType}>
                {dataType}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
          {/* <Input
            placeholder="Response Type"
            label="Response Type"
            id="responseType"
            type="text"
            value={service.responseType}
            onChange={handleChange}
          /> */}
          <Select
            placeholder="Response Type"
            label="Response Type"
            id="responseType"
            value={service.responseType}
            onChange={handleChange}
            // color={"gray.500"}
          >
            {messageParamsTypes.map((dataType) => (
              <option key={dataType} value={dataType}>
                {dataType}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
    </Box>
  );
}

export default ProtoServiceForm;
