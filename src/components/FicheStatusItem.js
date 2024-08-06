import { Td, Text, Tr, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Status from "./Status";
import { format } from "date-fns";
import FicheStatusResults from "./FicheStatusResults";

const FicheStatusItem = ({ ficheStatus, checklist, site }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Tr
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <Td>
          <Flex align="center">
            <Text fontWeight="bold">
              {formatDate(ficheStatus.date_insertion_status)}
            </Text>
            <IconButton
              icon={expanded ? <FiChevronUp /> : <FiChevronDown />}
              bg={"none"}
              aria-label="Filter"
            />
          </Flex>
        </Td>

        <Td>
          <Text fontSize={12}>{site}</Text>
        </Td>
        <Td>
          <Status status={ficheStatus.value_status}></Status>
        </Td>
      </Tr>
      {expanded && (
        <Tr>
          <Td colSpan={3}>
            <FicheStatusResults
              checklist={checklist}
              checklistJson={ficheStatus.checklist}
            />
          </Td>
        </Tr>
      )}
    </>
  );
};
export default FicheStatusItem;
