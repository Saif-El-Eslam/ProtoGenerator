import {
  Box,
  FormControl,
  Input,
  Text,
  Flex,
  Button,
  Center,
  Divider,
} from "@chakra-ui/react";
// import { useState } from "react";

function ProtoMessagesForm({ setMessages, messages, index }) {
  const addMessage = () => {
    setMessages([
      ...messages,
      { name: "", params: [{ paramName: "", paramType: "" }] },
    ]);
  };

  const addParam = () => {
    setMessages(
      messages.map((message, i) => {
        if (i === index) {
          return {
            ...message,
            params: [...message.params, { paramName: "", paramType: "" }],
          };
        }
        return message;
      })
    );
  };

  const handleNameChange = (e) => {
    setMessages(
      messages.map((message, i) => {
        if (i === index) {
          return {
            ...message,
            name: e.target.value,
          };
        }
        return message;
      })
    );
  };

  const handleParamNameChange = (e, paramIndex) => {
    setMessages(
      messages.map((message, i) => {
        if (i === index) {
          return {
            ...message,
            params: message.params.map((param, j) => {
              if (j === paramIndex) {
                return {
                  ...param,
                  paramName: e.target.value,
                };
              }
              return param;
            }),
          };
        }
        return message;
      })
    );
  };

  const handleParamTypeChange = (e, paramIndex) => {
    setMessages(
      messages.map((message, i) => {
        if (i === index) {
          return {
            ...message,
            params: message.params.map((param, j) => {
              if (j === paramIndex) {
                return {
                  ...param,
                  paramType: e.target.value,
                };
              }
              return param;
            }),
          };
        }
        return message;
      })
    );
  };

  return (
    <Box alignItems={"Center"}>
      <Box display={"flex"}>
        <Text textStyle="htitle3" textAlign={"left"} fontWeight={"bold"} mb={5}>
          Messages
        </Text>

        <Button
          alignSelf={"center"}
          colorScheme="brand.primary"
          variant="outline"
          size="sm"
          mb={5}
          ml={"auto"}
          onClick={addMessage}
        >
          Add Message +
        </Button>
      </Box>

      <FormControl mb={5}>
        <Input
          placeholder="Message Name"
          label="Message Name"
          id="messageame"
          type="text"
          value={messages[index].name}
          onChange={handleNameChange}
        />
      </FormControl>

      {messages[index].params.map((param, paramIndex) => (
        <Flex key={paramIndex} flexWrap="wrap" justifyContent="space-between">
          <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
            <Input
              placeholder="Parameter Name"
              label="Parameter Name"
              id="parameterName"
              type="text"
              value={param.paramName}
              onChange={(e) => handleParamNameChange(e, paramIndex)}
            />
          </FormControl>

          <FormControl mb={5} w={{ base: "100%", sm: "48%" }}>
            <Input
              placeholder="Parameter Type"
              label="Parameter Type"
              id="parameterType"
              type="text"
              value={param.paramType}
              onChange={(e) => handleParamTypeChange(e, paramIndex)}
            />
          </FormControl>
        </Flex>
      ))}

      <Center>
        <Button
          colorScheme="brand.primary"
          variant="outline"
          size="xs"
          mb={5}
          onClick={addParam}
        >
          Another Parameter +
        </Button>
      </Center>
      <Divider bgColor="brand.primary.200" mb={5} />
    </Box>
  );
}

export default ProtoMessagesForm;
