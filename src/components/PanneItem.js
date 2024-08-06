import { Box, Tr, Td, Text, Stack } from "@chakra-ui/react";
import EngineInfo from "./EngineInfo";
import Status from "./Status";
import Risk from "./Risk";

const PanneItem = ({ panne }) => {
  return (
    <Tr _hover={{ bg: "gray.100" }}>
      <Td>
        <EngineInfo engine={panne} />
      </Td>
      <Td>
        <Stack direction="column" spacing={2}>
          <Text fontSize="12">{panne.libelle_site}</Text>
          <Text fontSize="12">{panne.libelle_entite}</Text>
        </Stack>
      </Td>
      <Td>
        <Risk risk={panne.current_risque_engine} ml={0} p={2}></Risk>
      </Td>
      <Td>
        <Status status={panne.current_status_engine} />
      </Td>
    </Tr>
  );
};
export default PanneItem;
