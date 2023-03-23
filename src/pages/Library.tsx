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
import { CardSet } from "../components/CardSet";

export function Library() {
  const { authAxios } = useAxios();
  const [cardSets, setCardSets] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/card_sets/getCardSets",
      withCredentials: true,
    };

    authAxios(options)
      .then(({ data }) => {
        console.log(data);
        setCardSets(data);
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
    <Box mb="50vh" p="5%">
      <Heading mb="1rem">Home</Heading>
      <Button onClick={() => createFolder()}>Make folder</Button>

      <SimpleGrid columns={[2, null, 4]} spacing="8px" mb="1rem">
        {cardSets.map((cardset) => (
          <Box key={cardset.id}>
            <CardSet {...cardset} />
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
