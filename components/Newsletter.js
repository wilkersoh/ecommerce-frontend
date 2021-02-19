import { Box } from "@chakra-ui/react";
import React from "react";

export default function Newsletter() {
  return (
    <Box w={{ sm: "100%", lg: "300px" }}>
      <Box
        as='iframe'
        w='full'
        h={{ sm: "380px" }}
        src='https://44f80050.sibforms.com/serve/MUIEAA6qblCYxcmzbEIrL4BYwLk6CWCUMb1ZSoBvtxstR8XtmnY9sdVVfLvX_Q_PmWeNGsF09BREPKRXG9KDDsRKEfKEf1buVsEfnWzAVtl8I2Lmo4-FNpWDYM_9WyDM4ohkqKt-s4quzzP-rimtfuFhyDozFxy44dgrq0VVE_NdWJTdzsOpykdydWsEggxmkrxWSMKz9v7LXqXM'
        frameBorder='0'
        allowFullScreen
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "100%",
        }}></Box>
    </Box>
  );
}
