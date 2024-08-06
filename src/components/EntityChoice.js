import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";

// Custom Grouped Option Component
const GroupedOption = (props) => {
  return (
    <Box>
      <Box textAlign="left">
        <Text fontWeight="bold" textColor="black">
          {props.label}{" "}
        </Text>
      </Box>
      {props.children}
    </Box>
  );
};

// Custom styling for react-select
const customStyles = {
  placeholder: (provided) => ({
    ...provided,
    "padding-left": "8px",
    textAlign: "left", // Left-align the placeholder text
  }),
  singleValue: (provided) => ({
    ...provided,
    textAlign: "left", // Left-align the selected value text
  }),
  input: (provided) => ({
    ...provided,
    textAlign: "left", // Left-align the input text
  }),
  option: (provided) => ({
    ...provided,
    fontSize: 12,
    textAlign: "left", // Left-align the option text
  }),
  groupHeading: (provided) => ({
    ...provided,
    textAlign: "left", // Left-align the group heading text
  }),
};

const EntityChoice = ({ values, handleSitesChange, entities }) => {
  // Flatten entities' sites into a format suitable for react-select
  const options = entities.map((entity) => ({
    label: entity.libelle,
    options: entity.sites.map((site) => ({
      value: site.libelle_site,
      label: site.libelle_site,
    })),
  }));

  // Convert selected values to match the options format
  const selectedOptions = options.flatMap((group) =>
    group.options.filter((option) => values.includes(option.value))
  );

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    handleSitesChange(selectedValues);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      formatGroupLabel={(data) => <GroupedOption label={data.label} />}
      placeholder="CHOISISSEZ LE(S) SITE(S)"
      styles={customStyles}
    />
  );
};

export default EntityChoice;
