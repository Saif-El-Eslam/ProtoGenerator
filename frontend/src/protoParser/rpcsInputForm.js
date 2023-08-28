import { Box, Divider, Text, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function RPCInputForm({ fileContent }) {
  // extract the service name
  const serviceName = fileContent.match(/service\s\w*\s{/)[0].split(" ")[1];
  // extract the rpcs and their request/response types for each rpc as an array of objects [{rpcName: "", requestType: "", responseType: ""}]
  const rpcs = fileContent.match(/rpc\s\w+\s\(\w+\)\sreturns\s\(\w+\)/g);
  const rpcsArray = [];
  rpcs.forEach((rpc) => {
    const rpcName = rpc.split(" ")[1];
    const requestType = rpc.split("(")[1].split(")")[0];
    const responseType = rpc.split(")")[1].split("(")[1].split(")")[0];
    rpcsArray.push({ rpcName, requestType, responseType });
  });
  // extract the messages and their params as an array of objects [{messageName: "", params: [{paramName: "", paramType: [""]}]}]
  const messages = fileContent.match(/message\s+(\w+)\s+{[^}]+}/g);

  // array holding messages names and their params
  const messagesArray = [];
  messages &&
    messages.forEach((message) => {
      const messageName = message.split(" ")[1];
      const params = message.match(/(\w+)\s+(\w+)\s+=\s+\d+;/g);
      const paramsArray = [];

      params &&
        params.forEach((param) => {
          const paramName = param.split(" ")[1];
          const paramType = param.split(" ")[0];
          paramsArray.push({ paramName, paramType });
        });

      messagesArray.push({ messageName, paramsArray });
    });

  // Holds the inputs of the rpcs from the form fields
  const [rpcsInputs, setRpcsInputs] = useState([]);
  // To fill the rpcsInputs with the messages inputs
  const fillMessageInputs = (message) => {
    const messagesInputs = [];

    message.paramsArray &&
      message.paramsArray.forEach((param) => {
        const isMessage = messagesArray.find(
          (msg) => msg.messageName === param.paramType
        );

        if (isMessage) {
          const res = {
            paramName: param.paramName,
            isMessage: true,
            paramType: param.paramType,
            paramValue: fillMessageInputs(isMessage),
          };
          messagesInputs.push(res);
        } else {
          const res = {
            paramName: param.paramName,
            isMessage: false,
            paramType: param.paramType,
            paramValue: "",
          };
          messagesInputs.push(res);
        }
      });

    return messagesInputs;
  };

  const fillRpcsInputs = () => {
    const rpcsInputsArray = [];

    rpcsArray.forEach((rpc) => {
      const rpcInputs = {
        rpcName: rpc.rpcName,
        inParams: fillMessageInputs(
          messagesArray.find((msg) => msg.messageName === rpc.requestType)
        ),
      };
      rpcsInputsArray.push(rpcInputs);
    });

    setRpcsInputs(rpcsInputsArray);
  };

  useEffect(() => {
    fillRpcsInputs();
  }, []); // eslint-disable-line

  const handleServiceInputsSubmit = () => {
    console.log(rpcsInputs);
  };

  return (
    <Box
      bg={"#f5f5f5"}
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      //   pb={5}
    >
      <Box
        w={"60%"}
        maxH={"75vh"}
        border={"1px"}
        borderColor={"#e0e0e0"}
        borderRadius={"lg"}
        display={"flex"}
        flexDirection={"column"}
        // justifyContent={"center"}
        // alignItems={"center"}
        p={"2rem"}
        // m={"2rem"}
        overflowY={"scroll"}
        overflowX={"hidden"}
        scrollBehavior={"smooth"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0.5rem",
          },
          "&::-webkit-scrollbar-track": {
            width: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "24px",
          },
        }}
      >
        <Text
          textStyle="htitle3"
          textAlign={"center"}
          fontWeight={"bold"}
          mb={5}
          fontSize={"1.5rem"}
        >
          {serviceName}
        </Text>

        {rpcsArray.map((rpc, rpcindex) => {
          return (
            <Box
              key={rpc.rpcName}
              display={"flex"}
              flexDirection={"column"}
              // alignItems={"center"}
              mb={5}
            >
              <Divider
                bgColor="gray"
                mb={"15px"}
                borderWidth={1}
                borderColor={"#333"}
              />
              <Text
                textStyle="htitle3"
                textAlign={"left"}
                fontWeight={"bold"}
                fontSize={"1.25rem"}
                mb={5}
              >
                {rpc.rpcName} RPC
              </Text>
              <Box>
                <Box>
                  <Box>
                    <Text
                      textStyle="hsubtitle3"
                      textAlign={"left"}
                      mb={5}
                      fontSize={"1.2rem"}
                    >
                      {rpc.requestType}
                    </Text>

                    {
                      // eslint-disable-next-line
                      rpcsInputs.length > 0 &&
                        // eslint-disable-next-line
                        messagesArray.map((message, i) => {
                          if (message.messageName === rpc.requestType) {
                            const thisRPC = rpcsInputs.find(
                              (RPC) => RPC.rpcName === rpc.rpcName
                            );

                            return (
                              <Box key={i}>
                                {renderMessageParams(
                                  thisRPC.inParams,
                                  [],
                                  setRpcsInputs,
                                  rpcsInputs,
                                  rpcindex
                                )}
                              </Box>
                            );
                          }
                        })
                    }
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
        <Divider
          bgColor="gray"
          mb={"20px"}
          borderWidth={1}
          borderColor={"#333"}
        />
        <Button
          alignSelf={"center"}
          colorScheme="brand.primary"
          variant="outline"
          size="lg"
          p={".7rem 4rem"}
          _hover={{
            backgroundColor: "#333",
            color: "#E0E0E0",
          }}
          _active={{
            transform: "scale(0.98)",
          }}
          onClick={handleServiceInputsSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default RPCInputForm;

let level = -1; // eslint-disable-line
const renderMessageParams = (
  inParams,
  parentParamsindexes,
  setRpcsInputs,
  rpcsInputs,
  rpcIndex
) => {
  return (
    <Box>
      {inParams &&
        inParams.map((input, i) => {
          if (input.isMessage) {
            level++;
            const res = (
              <Box key={i}>
                <Text
                  textStyle="hsubtitle3"
                  textAlign={"left"}
                  // mb={5}
                  fontSize={"1.25rem"}
                  ml={`${level * 10}px`}
                >
                  {input.paramName}
                </Text>

                {renderMessageParams(
                  input.paramValue,
                  [...parentParamsindexes, i],
                  setRpcsInputs,
                  rpcsInputs,
                  rpcIndex
                )}
              </Box>
            );
            level--;
            return res;
          } else {
            level++;
            const res = (
              <Box key={i}>
                <Text
                  textStyle="hsubtitle3"
                  textAlign={"left"}
                  // mb={5}
                  fontSize={"1rem"}
                  ml={`${level * 10}px`}
                >
                  {input.paramName}
                </Text>
                <Input
                  placeholder={input.paramType}
                  ml={`${level * 10}px`}
                  mt={"5px"}
                  mb={"5px"}
                  value={input.paramValue}
                  onChange={(e) => {
                    // neInParams equals the old inParams but with the new value
                    const newInParams = [
                      ...inParams.slice(0, i),
                      {
                        ...inParams[i],
                        paramValue: e.target.value,
                      },
                      ...inParams.slice(i + 1),
                    ];

                    // newRpcsInputs equals the old rpcsInputs but with the new inParams
                    const newRpcsInputs = [...rpcsInputs];

                    if (parentParamsindexes.length === 0) {
                      newRpcsInputs[rpcIndex].inParams = newInParams;
                    } else {
                      let temp = newRpcsInputs[rpcIndex].inParams;
                      for (let i = 0; i < parentParamsindexes.length; i++) {
                        temp = temp[parentParamsindexes[i]].paramValue;
                      }
                      temp[i].paramValue = e.target.value;
                    }

                    setRpcsInputs(newRpcsInputs);
                  }}
                />
              </Box>
            );
            level--;
            return res;
          }
        })}
    </Box>
  );
};
