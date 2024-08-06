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
  Select,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import { FiDownload, FiFilter, FiSearch, FiUpload } from "react-icons/fi";
import ParcItems from "./ParcItems";
import { RenderPagesNumbers } from "../helpers/functions.js";
import EntityChoice from "./EntityChoice.js";
import Stats from "./Stats.js";
import EngineCreateForm from "./EngineCreateForm.js";
import ImportForm from "./ImportForm.js";

const ParcPage = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [allEngines, setAllEngines] = useState([]);
  const [entities, setEntities] = useState([]);
  const [filteredEngines, setFilteredEngines] = useState([]);
  const [displayedEngines, setDisplayedEngines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(true);
  const [isDateOpen, setIsDateOpen] = useState(true);
  const [isSiteOpen, setIsSiteOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterSites, setFilterSites] = useState([]);
  const [filterStates, setFilterStates] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const fetchEngines = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/engine`);
      if (!response.ok) {
        throw new Error("Network Error");
      }
      const engines = await response.json();
      setAllEngines(engines);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enginesResponse, sitesResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_BASE_URL}/engine`),
          fetch(`${process.env.REACT_APP_BASE_URL}/sites`),
        ]);

        if (!enginesResponse.ok) {
          throw new Error("Network Error");
        }
        const [engines, sites] = await Promise.all([
          enginesResponse.json(),
          sitesResponse.json(),
        ]);
        setAllEngines(engines);
        setEntities(sites);
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
    // Filter items
    let filteredRes = allEngines.filter((engine) =>
      engine.num_parc_engine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterDate && isDateOpen && isFilterOpen) {
      //   filteredRes = filteredRes.filter(
      //     (engine) => engine.date === filterDate
      //   );
    }

    //todo fix consider array
    if (filterSites.length > 0 && isSiteOpen && isFilterOpen) {
      filteredRes = filteredRes.filter((engine) =>
        filterSites.includes(engine.site.libelle)
      );
    }

    if (filterStates && isStateOpen && isFilterOpen) {
      filteredRes = filteredRes.filter(
        (engine) => engine.current_status_engine.toString() === filterStates
      );
    }

    setFilteredEngines(filteredRes);

    // Paginate items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedEngines(filteredRes.slice(startIndex, endIndex));
  }, [
    currentPage,
    allEngines,
    searchQuery,
    filterDate,
    filterSites,
    filterStates,
  ]);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when a search is performed
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
    setCurrentPage(1); // Reset to the first page when a filter is applied
  };

  const handleSitesChange = (newValues) => {
    setFilterSites(newValues);
    setCurrentPage(1); // Reset to the first page when a filter is applied
  };

  const handleStatesChange = (event) => {
    setFilterStates(event.target.value);
    setCurrentPage(1); // Reset to the first page when a filter is applied
  };

  const resetFilters = () => {
    setFilterDate("");
    setFilterSites([]);
    setFilterStates("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredEngines.length / itemsPerPage);

  const renderPagination = () => {
    return RenderPagesNumbers(currentPage, handlePageChange, totalPages);
  };

  return (
    <Box p={30} bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Parc
        </Text>
        <Flex direction="row" align="center" justify="space-between">
          <Stack direction="row" align="center">
            <IconButton
              icon={<FiSearch />}
              bg="none"
              onClick={toggleSearch}
              aria-label="Recherche"
            />
            <IconButton
              onClick={
                !isExporting
                  ? async () => {
                      setIsExporting(true);
                      const queryParams = [];
                      var endpoint = `${process.env.REACT_APP_BASE_URL}/engine/export`;

                      if (searchQuery) {
                        queryParams.push(`q=${searchQuery}`);
                      }

                      if (filterStates) {
                        queryParams.push(`statuses=${filterStates}`);
                      }

                      if (filterSites.length > 0) {
                        const sitesIds = [];
                        entities.forEach((entity) => {
                          entity.sites.forEach((site) => {
                            if (filterSites.includes(site.libelle_site)) {
                              sitesIds.push(site.id_sites);
                            }
                          });
                        });
                        if (sitesIds.length > 0) {
                          queryParams.push(`sites=${sitesIds.join(";")}`);
                        }
                      }
                      if (queryParams.length > 0) {
                        endpoint += `?${queryParams.join("&")}`;
                      }

                      console.log(endpoint);
                      const response = await fetch(endpoint, {
                        method: "GET",
                      });

                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }

                      const blob = await response.blob();

                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `engines:${Date.now()}.xlsx`;
                      document.body.appendChild(a);
                      a.click();
                      a.remove();

                      window.URL.revokeObjectURL(url);
                      setIsExporting(false);
                    }
                  : null
              }
              icon={isExporting ? <Spinner /> : <FiDownload />}
              bg="none"
              aria-label="Télécharger"
            />
            <IconButton
              icon={<FiUpload />}
              bg="none"
              aria-label="Print"
              onClick={() => {
                setIsImportOpen(true);
              }}
            />
            <IconButton
              icon={<FiFilter />}
              bg="none"
              onClick={() => {
                if (isFilterOpen) {
                  resetFilters();
                }
                toggleFilter();
              }}
              aria-label="Filter"
            />
          </Stack>
          <Box width={5} />
          <Button
            _hover={{ bg: "cyan.500", color: "white" }}
            bg="cyan.400"
            alignSelf="center"
            onClick={openModal}
          >
            <Text textColor="white">Nouveau</Text>
          </Button>
        </Flex>
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
      <Box
        display={isFilterOpen ? "block" : "none"}
        transition="all 0.3s ease"
        mb={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box>
            {/* <Flex flex="align-left">
              <Checkbox
                onChange={() => {
                  console.log(isDateOpen);
                  setIsDateOpen(!isDateOpen);
                }}
              >
                Date
              </Checkbox>
            </Flex> */}
            <Input
              display={isDateOpen ? "block" : "none"}
              placeholder="25/07/2024"
              type="date"
              value={filterDate}
              onChange={handleDateChange}
            />
          </Box>
          <Box>
            {/* <Flex flex="align-left">
              <Checkbox
                onChange={() => {
                  setIsStateOpen(!isStateOpen);
                }}
              >
                ÉTAT
              </Checkbox>
            </Flex> */}
            <Select
              display={isStateOpen ? "block" : "none"}
              placeholder="CHOISISSEZ LE(S) ÉTAT(S)"
              value={filterStates}
              onChange={handleStatesChange}
            >
              <option value={1}>Opérationnel</option>
              <option value={2}>En Panne</option>
              <option value={3}>Reserve</option>
              <option value={4}>Accidenté</option>
              <option value={5}>En Maintenance préventive</option>
            </Select>
          </Box>
          <Box>
            {/* <Flex flex="align-left">
              <Checkbox
                onChange={() => {
                  setIsSiteOpen(!isSiteOpen);
                }}
              >
                Site(s)
              </Checkbox>
            </Flex> */}
            {isSiteOpen ? (
              <EntityChoice
                values={filterSites}
                handleSitesChange={handleSitesChange}
                entities={entities}
              />
            ) : null}
          </Box>
        </Grid>
      </Box>
      <Box pb={5}></Box>
      <Stats engines={filteredEngines}></Stats>
      <Box pb={5}></Box>
      <ParcItems items={displayedEngines} loading={loading} error={error} />
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
      <EngineCreateForm
        isOpen={isModalOpen}
        onClose={closeModal}
        entities={entities}
      />
      <ImportForm
        isOpen={isImportOpen}
        onClose={() => {
          setIsImportOpen(false);
        }}
        userId={userId}
        onSuccess={fetchEngines}
      ></ImportForm>
    </Box>
  );
};

export default ParcPage;
