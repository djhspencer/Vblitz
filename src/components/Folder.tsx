import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type FolderProps = {
  id: number;
  folder_name: string;
};

export function Folder({ id, folder_name }: FolderProps) {
  const navigate = useNavigate();

  return (
    <Card h="100%" objectFit="cover" bg="green.400" color="white">
      <CardHeader display="flex" justifyContent="center" fontWeight="700" textAlign="center">
        <Button variant="link" color="white" onClick={() => navigate(`/folder/${id}`)}>{folder_name}</Button>
      </CardHeader>
      <CardBody display="flex" justifyContent="space-between">
      </CardBody>
    </Card>
  );
}
