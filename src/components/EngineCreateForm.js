import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import ImageInput from "./ImageInput";

//todo add logic
const EngineCreateForm = ({ isOpen, onClose, entities }) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const options = entities.map((entity) => ({
    label: entity.libelle,
    options: entity.sites.map((site) => ({
      value: site.libelle_site,
      label: site.libelle_site,
    })),
  }));
  const handleImageChange = (file) => {
    console.log("Selected file:", file);
    // Handle the selected image file here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Image</FormLabel>
            <ImageInput
              onImageChange={handleImageChange}
              defaultImage={
                "http://parcv1.arma.ma/uploads/images/engines/2977-khWXGyIY.png"
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Site</FormLabel>
            <Select
              placeholder="CHOISSISEZ LE SITE"
              value={selectedSite}
              options={options}
            ></Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            <Select placeholder="CHOISSISEZ LE TYPE">
              {/* Add your options here */}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Marque</FormLabel>
            <Select placeholder="NON DÉFINIE">
              {/* Add your options here */}
            </Select>
          </FormControl>
          <Stack direction={"row"}>
            <FormControl mb={4}>
              <FormLabel>Matricule</FormLabel>
              <Input placeholder="Matricule" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>N° WW</FormLabel>
              <Input placeholder="N° WW" />
            </FormControl>
          </Stack>
          <FormControl mb={4}>
            <FormLabel>N° Chassis</FormLabel>
            <Input placeholder="N° Chassis" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>N° Parc</FormLabel>
            <Input placeholder="N° Parc" isRequired />
          </FormControl>
        </ModalBody>
        <ModalFooter mt={0}>
          <Flex justifyContent="center" w="100%">
            <Button
              width={"100vh"}
              _hover={{ bg: "cyan.500" }}
              bg="cyan.400"
              onClick={onClose}
            >
              <Text textColor={"white"}>Ajouter</Text>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EngineCreateForm;
