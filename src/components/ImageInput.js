import React, { useState } from "react";
import { Box, Button, Image, Input, VStack, Flex } from "@chakra-ui/react";

const ImageInput = ({ onImageChange, defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        if (onImageChange) {
          onImageChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(defaultImage);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        textAlign="center"
        w="full"
        maxW="300px"
      >
        <Image
          src={selectedImage}
          alt="Selected"
          borderRadius="md"
          boxSize="150px"
          objectFit="cover"
          mb={4}
          mx="auto"
          fallbackSrc={defaultImage}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          display="none"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            as={"span"}
            bg="cyan.400"
            color="white"
            _hover={{ bg: "cyan.500" }}
            size="sm"
            mb={2}
            borderRadius="md"
            boxShadow="sm"
            display="block"
            mx="auto"
            textAlign="center"
          >
            <Flex align="center" justify="center" h="100%" w="100%">
              {selectedImage !== defaultImage
                ? "Changer l'image"
                : "Sélectionner une Image"}
            </Flex>
          </Button>
        </label>
        {selectedImage !== defaultImage && (
          <Button
            as={"span"}
            colorScheme="red"
            size="sm"
            onClick={handleImageRemove}
            borderRadius="md"
            boxShadow="sm"
            display="block"
            mx="auto"
            textAlign="center"
          >
            <Flex align="center" justify="center" h="100%" w="100%">
              Annuler
            </Flex>
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default ImageInput;
