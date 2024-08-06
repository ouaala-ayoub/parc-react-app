import { RISK } from "../enums/constants";
import { Text, Flex } from "@chakra-ui/react";
const Risk = ({ risk, ml, libelle, p, pl, pr, fw }) => {
  const getRisk = () => {
    return RISK[risk];
  };

  const getRiskColor = () => {
    const risk = getRisk();
    return risk?.color || "gray.400"; // Default grey
  };

  const getLightColor = () => {
    const risk = getRisk();
    return risk?.lightColor || "gray.200"; // Default lighter grey
  };
  return (
    <Flex gap={4}>
      <Text
        fontSize="12"
        bg={getLightColor()}
        color={getRiskColor()}
        p={p}
        pr={pr}
        pl={pl}
        borderRadius="md"
        ml={ml}
        fontWeight={fw}
      >
        {!libelle ? getRisk()?.libelle ?? "-" : libelle}
      </Text>
    </Flex>
  );
};
export default Risk;
