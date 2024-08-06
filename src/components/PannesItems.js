import React from "react";
import {
  Spinner,
  AlertIcon,
  Alert,
  Tbody,
  Center,
  Table,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";
import PanneItem from "./PanneItem";

const PannesItems = ({ items, loading, error }) => {
  if (loading) {
    return (
      <Center
        align="center"
        justify="center"
        height="100vh" // Full viewport height
        width="100%"
        textAlign="center"
      >
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  } else {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>N° PARC</Th>
            <Th>ENTITÉ/SITE</Th>
            <Th>RISQUE</Th>
            <Th>ÉTAT</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((panne) => (
            <PanneItem key={panne.id_engine_panne} panne={panne}></PanneItem>
          ))}
        </Tbody>
      </Table>
    );
  }
};
export default PannesItems;
