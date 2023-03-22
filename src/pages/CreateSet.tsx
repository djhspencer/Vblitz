import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Folder } from "../components/Folder";
import { useAxios } from "../context/AxiosContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

export function CreateSet() {
  const { authAxios } = useAxios();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      data: {
        title: title,
      },
      url: "http://localhost:4000/events/create",
      withCredentials: true,
    };

    await authAxios(options)
      .then(({ data }) => {
        console.log(data);
        navigate("/dash");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box flexDir="column" display="flex" justifyContent="center" alignItems="center" w="100%" mb="50vh">
      <Heading mb="1rem">Create New Set</Heading>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="90%"
        maxW="400px"
        borderRadius="20px"
        bg="red.600"
        p="20px 20px"
        mt="1rem"
      >
        <FormControl onSubmit={handleSubmit}>
          {/* <Heading mb="1rem" color="white">
            
          </Heading> */}
          <Input
            mb="0.5rem"
            backgroundColor="white"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            required
          />

          <Button onClick={handleSubmit}>Create Event</Button>
        </FormControl>
      </Box>
    </Box>
  );
}
