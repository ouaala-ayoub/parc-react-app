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
import Agent from "./Agent";

const AgentsItems = ({ items, loading, error, onPrivilegesClicked }) => {
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
            <Th>NOM COMPLET</Th>
            <Th>SITE(S)</Th>
            <Th>APP VERSION</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((agent, index) => (
            <Agent
              key={index}
              agent={agent}
              onPrivilegesClicked={() => onPrivilegesClicked(agent)}
            />
          ))}
        </Tbody>
      </Table>
    );
  }
};
export default AgentsItems;
