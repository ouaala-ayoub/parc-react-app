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
  useDisclosure,
} from "@chakra-ui/react";
import { FiDownload, FiFilter, FiPrinter, FiSearch } from "react-icons/fi";
import PannesItems from "./PannesItems";
import { RenderPagesNumbers } from "../helpers/functions";
import AgentsItems from "./AgentsItems";
import AgentPrivilegesForm from "./AgentPrivilegesForm";

const Agents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allAgents, setAllAgents] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [displayedAgents, setDisplayedAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [agent, setAgent] = useState();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsResponse, privilegesResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_BASE_URL}/agents`),
          fetch(`${process.env.REACT_APP_BASE_URL}/privileges?type=1`),
        ]);
        if (!agentsResponse.ok) {
          throw new Error("Network Error");
        }
        const [agents, privileges] = await Promise.all([
          agentsResponse.json(),
          privilegesResponse.json(),
        ]);
        setAllAgents(agents);
        setPrivileges(privileges);
        setLoading(false);
      } catch (error) {
        console.log("error is " + error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter items based on search query
    const filteredAgents = allAgents.filter((agent) =>
      agent.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update displayed items with pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedAgents(filteredAgents.slice(startIndex, endIndex));
  }, [currentPage, allAgents, searchQuery]);

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
  const filteredAgents = allAgents.filter((agent) =>
    agent.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  const renderPagination = () => {
    return RenderPagesNumbers(currentPage, handlePageChange, totalPages);
  };

  return (
    <Box p={5} bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Liste des agents
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
          placeholder="Recherche..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <AgentsItems
        items={displayedAgents}
        loading={loading}
        error={error}
        onPrivilegesClicked={(agent) => {
          console.log(agent);
          setAgent(agent);
          setIsOpen(true);
        }}
      />
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

      {agent ? (
        <AgentPrivilegesForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          privileges={privileges}
          agent={agent}
        />
      ) : null}
    </Box>
  );
};

export default Agents;
