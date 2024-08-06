import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  IconButton,
  Flex,
  Stack,
  Text,
  Button,
  HStack,
  Center,
} from "@chakra-ui/react";
import { FiDownload, FiFilter, FiPrinter, FiSearch } from "react-icons/fi";
import PannesItems from "./PannesItems";
import { RenderPagesNumbers } from "../helpers/functions";

const Pannes = () => {
  const [allPannes, setAllPannes] = useState([]);
  const [displayedPannes, setDisplayedPannes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/pannes`
        );
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const result = await response.json();
        setAllPannes(result);
      } catch (error) {
        console.log("error is " + error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter items based on search query
    const filteredPannes = allPannes.filter((panne) =>
      panne.num_parc_engine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update displayed items with pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedPannes(filteredPannes.slice(startIndex, endIndex));
  }, [currentPage, allPannes, searchQuery]);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  // Calculate total pages based on filtered data
  const filteredPannes = allPannes.filter((panne) =>
    panne.num_parc_engine.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPannes.length / itemsPerPage);

  const renderPagination = () => {
    return RenderPagesNumbers(currentPage, handlePageChange, totalPages);
  };

  return (
    <Box p={5} bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Pannes
        </Text>
        <Stack direction="row" align="center">
          <IconButton
            icon={<FiSearch />}
            size="lg"
            bg={"none"}
            onClick={toggleSearch}
            aria-label="Recherche"
          />
          <IconButton
            icon={<FiDownload />}
            size="lg"
            bg={"none"}
            aria-label="Télécharger"
          />
          <IconButton
            icon={<FiPrinter />}
            size="lg"
            bg={"none"}
            aria-label="Print"
          />
          <IconButton
            icon={<FiFilter />}
            size="lg"
            bg={"none"}
            aria-label="Filter"
          />
        </Stack>
      </Flex>
      <Box
        as="form"
        display={isSearchOpen ? "block" : "none"}
        transition="all 0.3s ease"
        mb={4}
      >
        <Input
          placeholder="Recherche par numéro de parc..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <PannesItems items={displayedPannes} loading={loading} error={error} />
      <Flex justify="center" mt={4}>
        <HStack spacing={2}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            &laquo;
          </Button>
          {renderPagination()}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            &raquo;
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Pannes;
