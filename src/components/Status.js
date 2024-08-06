import { STATUS } from "../enums/constants";
import { Text, Flex } from "@chakra-ui/react";

const Status = ({ status, ml }) => {
  const getStatusIndex = () => status - 1; // Adjust for index starting from 0

  const getStatus = () => {
    const index = getStatusIndex();
    if (index < 0 || index >= STATUS.length) return null; // Handle invalid index
    return STATUS[index];
  };

  const getStatusColor = () => {
    const status = getStatus();
    return status?.color || "gray.400"; // Default grey
  };

  const getLightColor = () => {
    const status = getStatus();
    return status?.lightColor || "gray.200"; // Default lighter grey
  };

  return (
    <Flex gap={4}>
      <Text
        fontSize="12"
        bg={getLightColor()}
        color={getStatusColor()}
        p={2}
        borderRadius="md"
        ml={ml}
      >
        {getStatus()?.libelle}
      </Text>
    </Flex>
  );
};
export default Status;
