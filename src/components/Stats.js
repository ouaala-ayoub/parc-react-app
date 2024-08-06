import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Stats = ({ engines }) => {
  const statusLabels = [
    { label: "OPÉRATIONNEL", value: 1 },
    { label: "EN PANNE", value: 2 },
    { label: "RESERVE", value: 3 },
    { label: "ACCIDENTÉ", value: 4 },
    { label: "EN MAINTENANCE PRÉVENTIVE", value: 5 },
    { label: "NON SAISIE", value: -1 },
  ];

  const calculateStatusCounts = () => {
    const counts = statusLabels.reduce((acc, status) => {
      acc[status.label] = 0;
      return acc;
    }, {});

    engines.forEach((engine) => {
      const status = statusLabels.find(
        (status) => status.value === engine.current_status_engine
      );
      if (status) {
        counts[status.label]++;
      }
    });

    return counts;
  };

  const statusCounts = calculateStatusCounts();

  return (
    <Box
      p={10}
      bg="white"
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      width="100%"
    >
      <Flex justify="space-between" align="center">
        {statusLabels.map((status) => (
          <Box key={status.label} textAlign="center">
            <Text fontSize="sm" color="gray.500">
              {status.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="gray.600">
              {statusCounts[status.label]}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Stats;
