import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  Text,
  FormControl,
  ModalFooter,
  Button,
  Input,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Loader from "./Loader";
import EntryFormFields from "./EntryFormField";

const CheckListAddForm = ({ isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    libelle: "",
    entries: [
      {
        libelle: "",
        risk: "",
        selectedCheckboxes: [],
        shouldVerify: -1,
        privileges: [], // Add privileges field
        id: Date.now(),
      },
    ],
  });

  const handleInputChange = (index, field, value) => {
    const updatedEntries = formValues.entries.map((entry, idx) =>
      idx === index ? { ...entry, [field]: value } : entry
    );
    setFormValues({ ...formValues, entries: updatedEntries });
  };

  const handleCheckboxChange = (index, checkboxValue) => {
    const updatedEntries = formValues.entries.map((entry, idx) => {
      if (idx === index) {
        const selectedCheckboxes = entry.selectedCheckboxes.includes(
          checkboxValue
        )
          ? entry.selectedCheckboxes.filter((item) => item !== checkboxValue)
          : [...entry.selectedCheckboxes, checkboxValue];
        return { ...entry, selectedCheckboxes };
      }
      return entry;
    });
    setFormValues({ ...formValues, entries: updatedEntries });
  };

  const handlePrivilegesChange = (index, privilegeValue) => {
    const updatedEntries = formValues.entries.map((entry, idx) => {
      if (idx === index) {
        const privileges = entry.privileges.includes(privilegeValue)
          ? entry.privileges.filter((item) => item !== privilegeValue)
          : [...entry.privileges, privilegeValue];
        return { ...entry, privileges };
      }
      return entry;
    });
    setFormValues({ ...formValues, entries: updatedEntries });
  };

  const handleAddEntry = () => {
    setFormValues({
      ...formValues,
      entries: [
        ...formValues.entries,
        {
          libelle: "",
          risk: 1,
          selectedCheckboxes: [],
          shouldVerify: -1,
          privileges: [], // Initialize privileges
          id: Date.now(),
        },
      ],
    });
  };

  const handleRemoveEntry = (index) => {
    setFormValues({
      ...formValues,
      entries: formValues.entries.filter((_, idx) => idx !== index),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formValues.entries.some((entry) => entry.selectedCheckboxes.length === 0)
    ) {
      alert("Veuillez Sélectionner une entrée au minimum.");
      return;
    }
    setLoading(true);
    try {
      const data = {
        libelle: formValues.libelle,
        entries: formValues.entries.map((entry) => {
          return {
            libelle: entry.libelle,
            risk: parseInt(entry.risk),
            frequence: `;${entry.selectedCheckboxes.join(";")};`,
            shouldVerify: parseInt(entry.shouldVerify),
            privileges: `;${entry.privileges.join(";")};`, // Include privileges
          };
        }),
      };
      console.log(data);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/checklist`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.error);
      }
      toast({
        title: "Opération réussie",
        description: `${res.success}`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      toast({
        title: "Une Erreur est survenue lors de l'ajout de données",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setFormValues({
          libelle: "",
          entries: [
            {
              libelle: "",
              risk: "",
              selectedCheckboxes: [],
              shouldVerify: -1,
              privileges: [], // Initialize privileges
              id: Date.now(),
            },
          ],
        });
      }}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={4}>
            <Text fontSize="lg">Ajouter</Text>
            <Text fontWeight="bold" fontSize="lg">
              Nouvelle Catégorie
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired mb={4}>
              <Input
                id="designation-input"
                value={formValues.libelle}
                onChange={(e) =>
                  setFormValues({ ...formValues, libelle: e.target.value })
                }
                placeholder="Category checklist"
              />
            </FormControl>

            <Button
              bg={"cyan.400"}
              color={"white"}
              _hover={{ bg: "cyan.500" }}
              onClick={handleAddEntry}
              mb={4}
            >
              <HStack>
                <FaPlus />
                <Text>Ajouter une valeur</Text>
              </HStack>
            </Button>

            <EntryFormFields
              entries={formValues.entries}
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              handleRemoveEntry={handleRemoveEntry}
              handlePrivilegesChange={handlePrivilegesChange} // Pass privileges change handler
            />
          </ModalBody>

          <ModalFooter>
            <Flex justify="center" w="full">
              <Button
                type="submit"
                bg="cyan.400"
                color="white"
                _hover={{ bg: "cyan.500", color: "white" }}
              >
                {loading ? <Loader size="md" /> : <Text>AJOUTER</Text>}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CheckListAddForm;
