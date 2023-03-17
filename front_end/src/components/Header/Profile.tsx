import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {

  return (
    <Flex align="center">
      {
        showProfileData && (
          <Box mr="4" textAlign="right">
            <Text></Text>
            <Text color="gray.300" fontSize="small"></Text>
          </Box>
        )
      }
    </Flex>
  )
}
