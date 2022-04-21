import { Box } from "@chakra-ui/react";

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <Box
    position="absolute"
    w="100%"
    h="10px"
    borderRadius="5px"
    left="0"
    top="0"
    zIndex="1"
  >
    <Box
      position="absolute"
      w={`${100 - percentage}%`}
      h="10px"
      bg="#fff"
      left="0"
      top="0"
      zIndex="1"
      shadow={`0 0 10px rgba(0,0,0,0.5)`}
    />
  </Box>
);

export default ProgressBar;
