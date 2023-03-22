import React, { useEffect, useState } from "react";
//import eventsLocal from "../data/items.json";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Folder } from "../components/Folder";
import { useAxios } from "../context/AxiosContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

export function Home() {
  const { authAxios } = useAxios();
  const [folders, setFolders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/folders/getFolders",
      withCredentials: true,
    };

    authAxios(options)
      .then(({ data }) => {
        console.log(data);
        setFolders(data);
        //setAuthed(true);
        //setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        //setAuthed(false);
        //setLoading(false);
      });
  }, []);

  const createFolder = () => {
    const options = {
      method: "POST",
      data: {
        folder_name: "Second Folder",
      },
      url: "http://localhost:5000/folders/create",
      withCredentials: true,
    };

    authAxios(options)
      .then(({ data }) => {
        console.log(data);
        //setEvents(data);
        //setAuthed(true);
        //setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        //setAuthed(false);
        //setLoading(false);
      });
  };

  const getFolders = () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/folders/getFolders",
      withCredentials: true,
    };

    authAxios(options)
      .then(({ data }) => {
        console.log(data);
        //setEvents(data);
        //setAuthed(true);
        //setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        //setAuthed(false);
        //setLoading(false);
      });
  };

  return (
    <Box m="1rem" mb="50vh">
      <Heading mb="1rem">Home</Heading>
      <Button onClick={() => createFolder()}>Make folder</Button>

      <SimpleGrid columns={[2, null, 4]} spacing="8px" mb="1rem">
        {folders.map((folder) => (
          <Box key={folder.id}>
            <Folder {...folder} />
          </Box>
        ))}
        {/* <Box>
          <Card
            h="100%"
            objectFit="cover"
            bg="red.500"
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <CardHeader
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="700"
              textAlign="center"
              flexDir="column"
              height="245px"
            >
              <FiPlusCircle
                onClick={() => navigate("/createEvent")}
                style={{ width: "80px", height: "80px", paddingBottom: "1rem", cursor: "pointer" }}
              />
              <Button
                variant="link"
                color="white"
                onClick={() => navigate("/createEvent")}
              >
                Create New Event
              </Button>
            </CardHeader>
          </Card>
        </Box> */}
      </SimpleGrid>
    </Box>
  );
}
