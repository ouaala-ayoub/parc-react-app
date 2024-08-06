import React, { useState } from "react";
import {
  Text,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import FicheStatusItem from "./FicheStatusItem";

const FicheStatus = ({ ficheStatuses, checkList, site }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(ficheStatuses.length / itemsPerPage);

  // Calculate the items to display based on the current page
  const currentItems = ficheStatuses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (ficheStatuses.length === 0) {
    return (
      <Center
        align="center"
        justify="center"
        height="50vh" // Full viewport height
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          Pas de données
        </Text>
      </Center>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // Always show the first page button
    buttons.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        isDisabled={currentPage === 1}
      >
        1
      </Button>
    );

    // Show dots if there are more than 2 pages between the first page and the current page
    if (currentPage > 3) {
      buttons.push(<Text key="dots-start">...</Text>);
    }

    // Show the previous page, current page, and next page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          isDisabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }

    // Show dots if there are more than 2 pages between the last page and the current page
    if (currentPage < totalPages - 2) {
      buttons.push(<Text key="dots-end">...</Text>);
    }

    // Always show the last page button
    if (totalPages != 1) {
      buttons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          isDisabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Box>
      <Table bg="white" variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Site</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((item) => {
            return (
              <FicheStatusItem
                key={item.id}
                ficheStatus={item}
                checklist={checkList}
                site={site}
              />
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="center" align="center" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Précédent
        </Button>
        {renderPaginationButtons()}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </Flex>
    </Box>
  );
};

export default FicheStatus;
