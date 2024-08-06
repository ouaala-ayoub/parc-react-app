import React from "react";
import {
  AlertIcon,
  Alert,
  Tbody,
  Table,
  Thead,
  Tr,
  Text,
  Th,
} from "@chakra-ui/react";
import ParcItem from "./ParcItem";
import Loader from "./Loader";

const ParcItems = ({ items, loading, error }) => {
  if (loading) {
    return <Loader />;
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  } else if (items.length === 0) {
    return <Text>Pas d'éléments</Text>;
  } else {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>N° PARC</Th>
            <Th>ENTITÉ/SITE</Th>
            <Th>Status</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((engine) => (
            <ParcItem key={engine.id_engine} engine={engine}></ParcItem>
          ))}
        </Tbody>
      </Table>
    );
  }
};
export default ParcItems;
