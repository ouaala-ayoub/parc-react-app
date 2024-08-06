import { Box, Text, Grid, Stack, HStack, Icon } from "@chakra-ui/react";
import { FiCamera, FiCheckCircle } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { MdOutlineNotInterested } from "react-icons/md";

const FicheStatusResults = ({ checklist, checklistJson }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "green";
      case -1:
        return "red";
      // case 2:
      //   return "gray.200";
      default:
        return "black";
    }
  };
  const getStatusIcon = (status, color) => {
    switch (status) {
      case 1:
        return <FiCheckCircle color={color} />;
      case -1:
        return <GiCancel color={color} />;
      case 2:
        return <MdOutlineNotInterested color={color} />;
      default:
        return <Icon color={color} />;
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="14" fontWeight="bold">
        Fiche renseignée
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2} mt={4}>
        {checklist.map((item, index) => (
          <Box key={index}>
            <Text fontWeight="bold" fontSize="14" mb={2}>
              {item.libelle_fr}
            </Text>
            <Stack spacing={1}>
              {item.entries.map((entry, idx) => {
                const current = checklistJson.find(
                  (item) => item.id == entry.id
                );

                const color = getStatusColor(current ? current.status : 0);
                const icon = getStatusIcon(current ? current.status : 0, color);

                return (
                  <HStack>
                    {icon}
                    <Text key={idx} fontSize="12" textColor={color}>
                      {entry.libelle_fr.trim()}
                    </Text>
                  </HStack>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
export default FicheStatusResults;
