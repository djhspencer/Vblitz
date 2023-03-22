import { Box, Button, Container, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAxios } from "../context/AxiosContext";

export function Navbar() {
  const { publicAxios } = useAxios();
  const { updateAuthState } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/users/logout",
      withCredentials: true,
    };

    await publicAxios(options)
      .then(({ data }) => {
        console.log(data);
        updateAuthState({
          accessToken: null,
          authenticated: false,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box py="1rem" shadow="base" display="flex" color="white" bg="green.400">
      <Container
        maxW="1100"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Link mx="3" as={NavLink} to="/createSet">
            Create
          </Link>
          <Link mx="3" as={NavLink} to="/home">
            Home
          </Link>
          <Link mx="3" as={NavLink} to="/library">
            Library
          </Link>
        </Box>
        <Box>
          <Button mx="3" variant="link" color="white" onClick={() => logout()}>
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
