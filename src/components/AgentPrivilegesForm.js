import {
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  VStack,
  Box,
  Heading,
  List,
  ListItem,
  HStack,
  Checkbox,
  Button,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import Loader from "./Loader";

const AgentPrivilegesForm = ({ isOpen, onClose, privileges, agent }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState();
  const [agentPrivileges, setAgentPrivileges] = useState();
  const toast = useToast();

  useEffect(() => {
    setAgentPrivileges(agent.privileges);
  }, [isOpen]);

  const updatePrivileges = async () => {
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BASE_URL}/agents/${agent.id}/privileges?login=${user.login}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ privileges: agentPrivileges }),
      });
      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson.error);
      }
      const res = await response.json();
      agent.privileges = agentPrivileges;
      toast({
        title: "Opération réussie",
        description: `${res.success}`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: `${error.message}`,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        // setAgentPrivileges(agent.privileges);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>Privilèges pour</Text>
            <Text fontWeight={"bold"} fontSize={"23"}>
              {agent.fullname}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {privileges.map((category) => (
              <Box key={category.id_privilege_category} mb={5}>
                <Heading as="h2" size="md" mb={3}>
                  {category.libelle_privilege_category}
                </Heading>
                <List spacing={2}>
                  {category.privileges.map((privilege) => (
                    <ListItem key={privilege.id_privilege}>
                      <HStack>
                        <Checkbox
                          defaultChecked={agent.privileges.includes(
                            privilege.id_privilege
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              const agentPrivs = agentPrivileges;
                              agentPrivs.push(privilege.id_privilege);
                              setAgentPrivileges(agentPrivs);
                            } else {
                              const filtred = agentPrivileges.filter(
                                (id) => id != privilege.id_privilege
                              );
                              setAgentPrivileges(filtred);
                            }
                          }}
                        >
                          <Text>{privilege.libelle_privilege}</Text>
                        </Checkbox>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={"cyan.400"}
            color={"white"}
            _hover={{ color: "white", bg: "cyan.500" }}
            onClick={!loading ? updatePrivileges : null}
          >
            {loading ? <Loader size="md" /> : <Text>SOUMETTRE</Text>}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AgentPrivilegesForm;
