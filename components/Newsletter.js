import React, {useEffect, useRef} from "react";
import { Box } from "@chakra-ui/react";

export default function Newsletter() {
  const iframeRef = useRef();

  useEffect(() => {
    const isWidthOver_1024 = window.innerWidth >= 1024;
    if (!isWidthOver_1024) return;

    const controlPosition = () => {
      const current = iframeRef;
      const STYLE = {};
      console.log("current :>> ", current.contentDocument);
    };
    controlPosition();
  }, [iframeRef.current]);


  return (
    <Box w={{ sm: "100%", lg: "300px" }}>
      <Box
        as='iframe'
        id='newletter'
        w='full'
        ref={iframeRef}
        h={{ sm: "305px" }}
        src='https://44f80050.sibforms.com/serve/MUIEAGqWNIsh9eeJt05-FS50W8SlqD1g6AQQd9e-5h9U5RwflmUTh4ShHR5EWh7mbrPzqkatlVaFDdNhVafa5dWf5pGUNZhAryUloOSdmFW0_MfN8MK1ibg-CUSBhx13PixUjuXn3y4AjrhqiuSPw41prG93PthllIevK5VBL9O6j1jUL_Xqg6-RL_e6pE_knwICCNma1pA3hDcr'
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

{/* <iframe
  width='540'
  height='305'
  src='https://44f80050.sibforms.com/serve/MUIEAGqWNIsh9eeJt05-FS50W8SlqD1g6AQQd9e-5h9U5RwflmUTh4ShHR5EWh7mbrPzqkatlVaFDdNhVafa5dWf5pGUNZhAryUloOSdmFW0_MfN8MK1ibg-CUSBhx13PixUjuXn3y4AjrhqiuSPw41prG93PthllIevK5VBL9O6j1jUL_Xqg6-RL_e6pE_knwICCNma1pA3hDcr'
  frameborder='0'
  scrolling='auto'
  allowfullscreen
  style='display: block;margin-left: auto;margin-right: auto;max-width: 100%;'></iframe>; */}
