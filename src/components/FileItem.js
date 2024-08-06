import {
  ListItem,
  HStack,
  Text,
  Button,
  Icon,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const FileItem = ({ file, handleRemoveFile }) => {
  return (
    <ListItem key={file.name}>
      <HStack justifyContent="space-between">
        {/* <FiFile color="orange" size={28} /> */}
        <VStack align={"start"} spacing={0}>
          <Text fontSize={14} fontWeight={"bold"}>
            {file.name}
          </Text>
          <Text fontSize={12}>size: {(file.size * 0.001).toFixed(2)} KB</Text>
        </VStack>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => handleRemoveFile(file.name)}
        >
          <Icon as={MdDelete} />
        </Button>
      </HStack>
    </ListItem>
  );
};
export default FileItem;
