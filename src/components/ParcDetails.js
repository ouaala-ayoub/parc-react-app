import {
  Box,
  Text,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Image,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import FicheStatus from "./FicheStatus";
import Status from "./Status";

const ParcDetails = ({ user }) => {
  const { numParc } = useParams();
  const { state } = useLocation();
  const engine = state?.engine;

  const [checklist, setChecklist] = useState({});
  const [ficheList, setFicheList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!engine) return;

    const fetchEngine = async () => {
      try {
        //todo change the route
        const [checklistResponse, ficheStatusResponse] = await Promise.all([
          fetch(
            `${process.env.REACT_APP_BASE_URL}/engine/search?q=${numParc}&login=${user.login}`
          ),
          fetch(
            `${process.env.REACT_APP_BASE_URL}/fiche-status?idEngine=${engine.id_engine}`
          ),
        ]);
        if (!checklistResponse.ok || !ficheStatusResponse.ok) {
          throw new Error("Network Error");
        }

        const [engineRes, ficheStatusRes] = await Promise.all([
          checklistResponse.json(),
          ficheStatusResponse.json(),
        ]);
        setFicheList(ficheStatusRes);
        setChecklist(engineRes.checklist);
      } catch (error) {
        console.log("error is " + error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEngine();
  }, [numParc, engine, user.login]);

  if (loading) {
    return (
      <Center
        align="center"
        justify="center"
        height="100vh" // Full viewport height
        width="100%"
        textAlign="center"
      >
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }
  return (
    <Stack direction="column" spacing={0}>
      <Box bg={"white"} borderTopRadius="md" p={2}>
        <Center>
          <Flex align="center">
            <Image
              fallbackSrc="http://parcv1.arma.ma/uploads/images/engines/2977-khWXGyIY.png"
              src={`http://parcv1.arma.ma/uploads/images/engines/${engine.pic_engine}.png`}
              boxSize={20}
              m={10}
            />
            <Stack direction="column" spacing={2}>
              <Text color="cyan.400" fontSize="xl" fontWeight="bold">
                {engine.num_parc_engine}
              </Text>
              <Text>{engine.designation_engine}</Text>
            </Stack>

            <Stack direction="column" spacing={2}>
              <Flex align="center" ml={50}>
                <Text fontSize="xl">Status</Text>
              </Flex>
              <Status ml={50} status={engine.current_status_engine}></Status>
            </Stack>
          </Flex>
        </Center>
      </Box>
      <hr
        style={{
          color: "black",
          height: 1,
        }}
      ></hr>
      <Box bg={"white"} p={4}>
        <Text color="cyan.400" fontSize="xl" fontWeight="bold">
          Historique
        </Text>
      </Box>
      <hr
        style={{
          color: "black",
          height: 1,
        }}
      ></hr>
      <FicheStatus
        ficheStatuses={ficheList}
        checkList={checklist}
        site={engine.site.libelle}
      ></FicheStatus>
    </Stack>
  );
};

export default ParcDetails;
