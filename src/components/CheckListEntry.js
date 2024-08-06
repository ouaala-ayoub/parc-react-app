import { Td, Tr, Text, Stack, Wrap, IconButton } from "@chakra-ui/react";
import Risk from "./Risk";
import { FiDelete, FiEdit } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

const CheckListEntry = ({ category, onEditClicked, onDeleteClicked }) => {
  return (
    <Tr _hover={{ bg: "gray.100" }}>
      <Td>
        <Text fontSize={"14"}>{category.libelle_fr}</Text>
      </Td>
      <Td>
        <Wrap>
          {category.entries.map((entry) => (
            <Risk
              risk={entry.risque.id}
              libelle={entry.libelle_fr}
              pl={1}
              pr={1}
              fw={"500"}
            />
          ))}
        </Wrap>
      </Td>
      <Td>
        <IconButton
          icon={<FiEdit size={"22px"} />}
          bg="none"
          aria-label="Print"
          onClick={onEditClicked}
        />
      </Td>
      <Td>
        <IconButton
          icon={<MdCancel size={"22px"} />}
          bg="none"
          color={"red"}
          aria-label="Print"
          onClick={onDeleteClicked}
        />
      </Td>
    </Tr>
  );
};

export default CheckListEntry;
