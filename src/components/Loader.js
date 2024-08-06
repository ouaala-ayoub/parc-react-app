import { Center, Spinner } from "@chakra-ui/react";

const Loader = ({ size = "xl" }) => {
  return (
    <Center
      align="center"
      justify="center"
      height="100vh" // Full viewport height
      width="100%"
      textAlign="center"
    >
      <Spinner size={size} />
    </Center>
  );
};
export default Loader;
