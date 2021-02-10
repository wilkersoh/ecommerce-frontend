import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  List,
  ListItem,
} from "@chakra-ui/react";

/**
 *
  messages:
    {
      email: {type: "required", message: ""},
      password: {type: "required", message: ""},
    }

  status	"info" | "warning" | "success" | "error"
 */
export const ClientMessage = ({ status, messages }) => {
  const [errors, setErrors] = useState({});

  return (
    <Alert status={status} mb={4}>
      <AlertIcon />
      <AlertDescription>
        <List>
          {Object.entries(messages).map(([key, valueArray]) => (
            <ListItem key={key[0]}>
              {valueArray["type"] === "required"
                ? `${key.split("_").join(" ")} is required`
                : `${valueArray["message"]}`}
            </ListItem>
          ))}
        </List>
      </AlertDescription>
      {/* <CloseButton
        onClick={onCloseButton}
        position='absolute'
        right='8px'
        top='8px'
      /> */}
    </Alert>
  );
};

export const ServerMessage = ({ messages }) => {
  return (
    <Alert status={"error"} mb={4}>
      <AlertIcon />
      <AlertDescription>
        <List>
          <ListItem>{messages["email"]["message"].message}</ListItem>
        </List>
      </AlertDescription>
    </Alert>
  );
};
