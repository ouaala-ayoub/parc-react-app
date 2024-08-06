import {
  FormControl,
  Input,
  Select,
  Checkbox,
  HStack,
  VStack,
  Text,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { RISK } from "../enums/constants";

const options = [
  { value: 1, label: "Journalière" },
  { value: 2, label: "Hebdomadaire" },
  { value: 3, label: "Mensuelle" },
];

const verifyOptions = [
  { value: 1, label: "Oui" },
  { value: -1, label: "Non" },
];

const privilegesOptions = [
  { value: 30, label: "check-list ag control" },
  { value: 31, label: "ag de sécurité" },
  { value: 32, label: "check-list après lavage" },
  { value: 33, label: "check-list avant sce" },
];

const EntryFormFields = ({
  entries,
  handleInputChange,
  handleCheckboxChange,
  handleRemoveEntry,
  handlePrivilegesChange,
}) => {
  return (
    <VStack spacing={2}>
      <HStack spacing={4} align="center" w={"100%"}>
        <Text align="center" flex="1.5" fontWeight="bold">
          Libelle
        </Text>
        <Text flex="1" align="center" fontWeight="bold">
          Risque
        </Text>
        <Text flex="1" align="center" fontWeight="bold">
          Fréquences
        </Text>
        <Text flex="1" align="center" fontWeight="bold">
          Vérification requis ?
        </Text>
        <Text flex="1" align="center" fontWeight="bold">
          Privileges
        </Text>
        <Text flex="0.5" align="center" fontWeight="bold"></Text>
      </HStack>
      {entries.map((entry, index) => (
        <VStack key={entry.id} spacing={4} align="start">
          <HStack spacing={4} align="center">
            <FormControl isRequired flex="1.5">
              <Input
                id={`input-libelle-${entry.id}`}
                value={entry.libelle}
                onChange={(e) =>
                  handleInputChange(index, "libelle", e.target.value)
                }
                placeholder="Fiche checklist"
                width="full"
              />
            </FormControl>
            <FormControl isRequired flex="1">
              <Select
                id={`select-risk-${entry.id}`}
                value={entry.risk}
                onChange={(e) =>
                  handleInputChange(index, "risk", e.target.value)
                }
                width="full"
              >
                {Object.keys(RISK)
                  .splice(0, 3)
                  .map((riskKey) => (
                    <option key={riskKey} value={riskKey}>
                      {RISK[riskKey].libelle}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl
              flex="1"
              isInvalid={entries[index].selectedCheckboxes.length === 0}
            >
              <VStack align="start" spacing={0}>
                {options.map((option) => (
                  <Checkbox
                    key={option.value}
                    id={`checkbox-${entry.id}-${option.value}`}
                    isChecked={entry.selectedCheckboxes.includes(option.value)}
                    onChange={() => handleCheckboxChange(index, option.value)}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </VStack>
              {entries[index].selectedCheckboxes.length === 0 && (
                <Text color="red.500" fontSize="sm">
                  Champ requis
                </Text>
              )}
            </FormControl>
            <FormControl isRequired flex="1">
              <Select
                id={`select-verify-${entry.id}`}
                value={entry.shouldVerify}
                onChange={(e) =>
                  handleInputChange(index, "shouldVerify", e.target.value)
                }
                width="full"
              >
                {verifyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* Privileges Section */}
            <FormControl
              flex="1"
              isInvalid={entries[index].privileges.length === 0}
            >
              {privilegesOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  id={`privilege-${entry.id}-${option.value}`}
                  isChecked={entry.privileges.includes(option.value)}
                  onChange={() => handlePrivilegesChange(index, option.value)}
                >
                  {option.label}
                </Checkbox>
              ))}
              {entries[index].privileges.length === 0 && (
                <Text color="red.500" fontSize="sm">
                  Champ requis
                </Text>
              )}
            </FormControl>
            <IconButton
              variant="ghost"
              colorScheme="red"
              onClick={() => handleRemoveEntry(index)}
              aria-label="Remove entry"
            >
              <TiDelete size={"22px"} />
            </IconButton>
          </HStack>

          {index < entries.length - 1 && <Divider />}
        </VStack>
      ))}
    </VStack>
  );
};

export default EntryFormFields;
