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
  Table,
  Thead,
  Tr,
  Th,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Loader from "./Loader";
import EntryFormFields from "./EntryFormField";
import { privilegesOptions } from "../enums/constants"; // Assuming the privileges options are exported from this path

const CheckListEditForm = ({ isOpen, onClose, category, onSuccess }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    libelle: category.libelle_fr,
    entries: category.entries.map((entry) => ({
      libelle: entry.libelle_fr,
      risk: entry.risque.id,
      selectedCheckboxes: entry.frequence.map((frequence) => frequence.id),
      shouldVerify: entry.shouldVerify,
      privileges: entry.privileges || [], // Add privileges field
      id: entry.id,
    })),
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
      formValues.entries.some(
        (entry) => entry.selectedCheckboxes.length === 0
      ) ||
      formValues.entries.some((entry) => entry.privileges.length === 0)
    ) {
      alert("Veuillez Sélectionner une entrée au minimum.");
      return;
    }
    // todo: form submission logic
    setLoading(true);
    try {
      const data = {
        id: category.id,
        libelle: formValues.libelle,
        entries: formValues.entries.map((entry) => {
          return {
            id: entry.id,
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
          method: "PUT",
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
      // todo toast
      toast({
        title: "Une Erreur est survenue lors de la modifications des données",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={4}>
            <Text fontSize="lg">Editer</Text>
            <Text fontWeight="bold" fontSize="lg">
              {category.libelle_fr}
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
              variant="ghost"
              _hover={{ bg: "transparent", color: "cyan.400" }}
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
                {loading ? <Loader size="md" /> : <Text>EDITER</Text>}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CheckListEditForm;
