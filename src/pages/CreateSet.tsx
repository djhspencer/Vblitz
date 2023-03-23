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
  Textarea,
} from "@chakra-ui/react";
import { Folder } from "../components/Folder";
import { useAxios } from "../context/AxiosContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import ResizeTextarea from "react-textarea-autosize";

type CardInput = {
  frontText: string;
  backText: string;
};

export function CreateSet() {
  const { authAxios } = useAxios();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useState<CardInput[]>([
    { frontText: "", backText: "" },
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      data: {
        title: title,
        cards: cards,
      },
      url: "http://localhost:5000/card_sets/create",
      withCredentials: true,
    };

    await authAxios(options)
      .then(({ data }) => {
        console.log(data);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (index: number, e: any) => {
    let target = e.target as HTMLInputElement;
    let tName = target.name as keyof CardInput;
    let cardData = [...cards];
    cardData[index][tName] = target.value;
    setCards(cardData);
  };

  const addCard = () => {
    let newCard = { frontText: "", backText: "" };

    setCards([...cards, newCard]);
  };

  //console.log(cards);

  return (
    <Box
      flexDir="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      mb="50vh"
    >
      <Heading mt="4" mb="4">
        Create New Set
      </Heading>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        flexDir="column"
        bg="gray.50"
        p="5%"
        mt="4"
        mb="4"
      >
        <FormControl mb="4" display="flex" flexDir="column" alignItems="center" justifyContent="center">
          <Input
            mb="8"
            backgroundColor="white"
            focusBorderColor="green.400"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            required
          />
          {cards.map((card: CardInput, index: number) => {
            return (
              <Box
                display="flex"
                flexDir="column"
                borderRadius="6px"
                border="1px solid"
                borderColor="gray.200"
                p="8"
                pb="4"
                mb="6"
                w="100%"
                bg="white"
                key={index}
              >
                <Textarea
                  minH="unset"
                  transition="height none"
                  w="100%"
                  resize="none"
                  minRows={1}
                  maxRows={6}
                  as={ResizeTextarea}
                  border="none"
                  borderBottom="3px solid"
                  borderColor="green.400"
                  focusBorderColor="green.400"
                  borderRadius="none"
                  value={card.frontText}
                  onChange={(e) => handleChange(index, e)}
                  bg="white"
                  name="frontText"
                  placeholder="Term"
                  mb="4"
                />
                <Textarea
                  minH="unset"
                  transition="height none"
                  w="100%"
                  resize="none"
                  minRows={1}
                  maxRows={6}
                  as={ResizeTextarea}
                  border="none"
                  borderBottom="3px solid"
                  borderColor="green.400"
                  focusBorderColor="green.400"
                  borderRadius="none"
                  value={card.backText}
                  onChange={(e) => handleChange(index, e)}
                  bg="white"
                  name="backText"
                  placeholder="Definition"
                  mb="8"
                />
                <Box>{index + 1}</Box>
              </Box>
            );
          })}
          <Button mb="16" onClick={addCard}>
            Add Card +
          </Button>
          <Button size="lg" colorScheme="green" bg="green.400" onClick={handleSubmit}>
            Create Set
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
