import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Td,
  Tr,
  Stack,
  Image,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
} from "@chakra-ui/react";
import { STATUS } from "../enums/constants";
import { FiChevronDown } from "react-icons/fi";
import Status from "./Status";
import EngineInfo from "./EngineInfo";

const ParcItem = ({ engine }) => {
  return (
    <Tr _hover={{ bg: "gray.100" }}>
      <Td>
        <Link to={`/parc/${engine.num_parc_engine}`} state={{ engine }}>
          <EngineInfo engine={engine} />
        </Link>
      </Td>

      <Td>
        <Link to={`/parc/${engine.num_parc_engine}`} state={{ engine }}>
          <Stack direction="column" spacing={2}>
            <Text fontSize="12">{engine.site.libelle}</Text>
            <Text fontSize="12">{engine.site.entite.libelle}</Text>
          </Stack>
        </Link>
      </Td>

      <Td>
        <Link to={`/parc/${engine.num_parc_engine}`} state={{ engine }}>
          <Status status={engine.current_status_engine}></Status>
        </Link>
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
            <MenuItem>Editer</MenuItem>
            <Link to={`/engine/${engine.id_engine}/qrcode`}>
              <MenuItem>Code Qr</MenuItem>
            </Link>
            <MenuItem>Envoyer une notif</MenuItem>
            <MenuItem>Supprimer</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default ParcItem;
