import {
  Box,
  Grid,
  Td,
  Text,
  Tr,
  Wrap,
  Image,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import { FiChevronDown } from "react-icons/fi";

const Agent = ({ agent, onPrivilegesClicked }) => {
  return (
    <Tr _hover={{ bg: "gray.100" }}>
      <Td>
        <HStack>
          <Image
            fallbackSrc="http://parcv1.arma.ma/uploads/images/agents/902-h5mIoeUh.png"
            src={`http://parcv1.arma.ma/uploads/images/agents/${agent.pic}.png`}
            boxSize="30px"
          />
          <Text
            textColor={"cyan.400"}
            fontWeight={"bold"}
            whiteSpace="nowrap"
            // overflow="elipsis"
            fontSize={15}
          >
            {agent.fullname}
          </Text>
        </HStack>
      </Td>
      <Td>
        <Wrap spacing={0.5}>
          {agent.sites.map((site) => (
            <Text
              key={site.id_sites}
              bg={"gray.600"}
              textColor={"white"}
              borderRadius={5}
              pl={2}
              pr={2}
              fontSize={11}
            >
              {site.libelle_site}
            </Text>
          ))}
        </Wrap>
      </Td>
      <Td>
        <Text
          bg={"green.100"}
          textColor={"green"}
          borderRadius={5}
          pl={2}
          pr={2}
          fontSize={11}
          textAlign={"center"}
          fontWeight={"400"}
        >
          {agent.appVersion ? agent.appVersion + ".0.0" : ""}
        </Text>
      </Td>
      <Td>
        <Box
          borderLeft="2px"
          borderColor="gray.200"
          height="40px" // Adjust height as needed
        />
      </Td>

      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiChevronDown />}
            aria-label="Options"
          />
          <MenuList>
            <MenuItem>Editer l'agent</MenuItem>
            <MenuItem onClick={() => onPrivilegesClicked()}>
              Liste des privilèges
            </MenuItem>
            <MenuItem>Envoyer une notif</MenuItem>
            <MenuItem>Supprimer l'agent</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default Agent;
