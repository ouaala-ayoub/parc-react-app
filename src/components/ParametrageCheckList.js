import {
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Box,
  Button,
  VStack,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import CheckListEntry from "./CheckListEntry";
import CheckListEditForm from "./CheckListEditForm";
import CheckListAddForm from "./CheckListAddForm";
import { FiPlus } from "react-icons/fi";
import { CategoryDeleteDialog } from "./CategoryDeleteDialog";

const ParametrageCheckList = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [checkListData, setCheckListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/checklist`
      );

      if (!response.ok) {
        throw new Error("Une erreur de connexion est survenue.");
      }

      const ficheChecklist = await response.json();
      console.log(ficheChecklist);
      setCheckListData(ficheChecklist);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  const handleEditSuccess = () => {
    setIsEditOpen(false);
    setCurrentCategory(null);
    fetchChecklist();
  };

  const handleAddSuccess = () => {
    setIsAddOpen(false);
    fetchChecklist();
  };

  if (loading) {
    return <Loader />;
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  } else if (checkListData.length === 0) {
    return <Text>Pas d'éléments</Text>;
  } else {
    return (
      <Box>
        <VStack>
          <Box w={"100%"} mb={"8px"}>
            <Flex justify={"flex-end"}>
              <Button
                bg="cyan.400"
                color="white"
                _hover={{ bg: "cyan.500", color: "white" }}
                onClick={() => {
                  setIsAddOpen(true);
                }}
              >
                <FiPlus />
                AJOUTER UNE CATEGORIE
              </Button>
            </Flex>
          </Box>

          <Table variant="simple" bg={"white"}>
            <Thead>
              <Tr>
                <Th>Catégorie</Th>
                <Th>Checklist</Th>
              </Tr>
            </Thead>
            <Tbody>
              {checkListData.map((category) => (
                <CheckListEntry
                  key={category.id} // Make sure each entry has a unique key
                  category={category}
                  onEditClicked={() => {
                    setCurrentCategory(category);
                    setIsEditOpen(true);
                  }}
                  onDeleteClicked={() => {
                    setIsDeleteOpen(true);
                    setToDelete(category);
                  }}
                />
              ))}
            </Tbody>
          </Table>
        </VStack>
        {currentCategory && (
          <CheckListEditForm
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setCurrentCategory(null);
            }}
            category={currentCategory}
            onSuccess={handleEditSuccess}
          />
        )}
        <CheckListAddForm
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSuccess={handleAddSuccess}
        />
        {toDelete && (
          <CategoryDeleteDialog
            isOpen={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
              setToDelete(null);
            }}
            onDelete={() => {
              setIsDeleteOpen(false);
              setToDelete(null);
              fetchChecklist();
            }}
            category={toDelete}
          />
        )}
      </Box>
    );
  }
};

export default ParametrageCheckList;
