import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  useToast,
  Box,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useRef, useState } from "react";
import Loader from "./Loader";

export const CategoryDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  category,
}) => {
  const initialRef = useRef();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toast = useToast();

  const deleteCategory = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/checklist/${category.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const res = await response.json();
        throw new Error(
          res?.error ??
            "Une erreur est survenue lors de suppression de la categorie"
        );
      }

      const res = await response.json();
      console.log(res);
      toast({
        title: "Opération réussie",
        description: `${res.success}`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      onDelete();
    } catch (error) {
      toast({
        title: "une Erreur de suppression est survenue",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setDeleteLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent borderRadius="md" boxShadow="xl" maxW="md">
        <ModalHeader>
          <HStack spacing={3}>
            <Icon as={FiTrash2} color="red.500" boxSize={6} />
            <Text fontSize="lg" fontWeight="bold">
              Confirmer la Suppression
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody py={6}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="md">
              Vous êtes sur le point de supprimer définitivement la catégorie{" "}
              <Box as="span" fontWeight="bold">
                {category.libelle_fr}
              </Box>
              . Cette action est irréversible.
            </Text>
            <HStack justifyContent="center" spacing={4}>
              <Button
                ref={initialRef}
                variant="solid"
                colorScheme="red"
                onClick={!deleteLoading ? deleteCategory : null}
              >
                {deleteLoading ? (
                  <Loader size="md" />
                ) : (
                  <Text>Oui, Supprimer</Text>
                )}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
