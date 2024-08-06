import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Box,
  Text,
  Input,
  Icon,
  Button,
  ModalFooter,
  Center,
  List,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import FileItem from "./FileItem";

const ImportForm = ({ isOpen, onClose, userId, onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const toast = useToast();
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    // Reset the input value to allow the same file to be selected again
    event.target.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast({
        title: "Aucun fichier sélectionné.",
        description:
          "Veuillez sélectionner au moins un fichier avant de valider.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const endpoint = `${process.env.REACT_APP_BASE_URL}/engine/import?idCreateur=${userId}`;

    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.error);
        }

        return { file, success: true };
      } catch (error) {
        console.error(error);
        return { file, success: false, error: error.message };
      }
    };

    const results = await Promise.all(files.map(uploadFile));

    results.forEach((result) => {
      if (result.success) {
        toast({
          title: "Import réussi.",
          description: `Le fichier ${result.file.name} a été Importé avec succès.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFiles([]);
        onClose();
        onSuccess();
      } else {
        toast({
          title: "Erreur de téléchargement.",
          description: `Une erreur s'est produite lors d'importation du fichier ${result.file.name}: ${result.error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });

    setIsLoading(false);
    // onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        //remove files on close
        setFiles([]);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Fichier d'Importation</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="center">
            <Box
              w="100%"
              p={6}
              borderWidth={2}
              borderColor="gray.300"
              borderStyle="dashed"
              borderRadius="md"
              textAlign="center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Icon as={FiUpload} w={12} h={12} color="gray.500" />
              <Text mt={2} color="gray.500">
                Glisser-Déposer les fichiers ici
              </Text>
              <Text mt={2} color="gray.500">
                ou
              </Text>
              <Button variant="outline" mt={2}>
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                  Sélectionner des fichiers
                </label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  display="none"
                  ref={inputRef}
                />
              </Button>
            </Box>

            <List spacing={3} width="100%">
              {files.map((file, i) => (
                <FileItem
                  key={i}
                  file={file}
                  handleRemoveFile={handleRemoveFile}
                />
              ))}
            </List>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Center width={"100%"}>
            <Button
              color={"white"}
              bg={"cyan.400"}
              _hover={{ bg: "cyan.500" }}
              mr={3}
              onClick={!loading ? handleSubmit : null}
            >
              {loading ? <Spinner /> : <Text>ENVOYER</Text>}
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportForm;
