import { Flex, Image, Stack, Text } from "@chakra-ui/react";

const EngineInfo = ({ engine }) => {
  return (
    <Flex align="center">
      <Image
        fallbackSrc="http://parcv1.arma.ma/uploads/images/engines/2977-khWXGyIY.png"
        src={`http://parcv1.arma.ma/uploads/images/engines/${engine.pic_engine}.png`}
        boxSize={20}
        mr={4}
      />
      <Stack direction="column" spacing={2}>
        <Text color="cyan.400" fontSize="14" fontWeight="bold">
          {engine.num_parc_engine}
        </Text>
        <Text fontSize="12">{engine.designation_engine}</Text>
      </Stack>
    </Flex>
  );
};
export default EngineInfo;
