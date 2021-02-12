import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fromImageToUrl } from "../utils/urls";

import { Box, Grid } from "@chakra-ui/react";

export default function GroupProductImage({ images, name }) {
  const [showImage, setShowImage] = useState("");

  useEffect(() => {
    setShowImage(images[0].url);
  }, []);

  const clickedImage = (e) => {
    setShowImage(e.target.src);
  };

  return (
    <ImageComponent showImage={showImage}>
      {images.map((image, i) => (
        <Box key={i} mb={2} cursor='pointer'>
          <Image
            onClick={clickedImage}
            src={fromImageToUrl(image)}
            width={250}
            height={250}
            alt={name}
            layout='responsive'
          />
        </Box>
      ))}
    </ImageComponent>
  );
}

const ImageComponent = ({ children, showImage }) => {
  return (
    <Grid templateColumns='85% 1fr' gridAutoRows='minmax(260px, auto)' gap={2}>
      <Grid gridRow={"1 / -1"}>
        {showImage && <Image src={showImage} width={500} height={500} />}
      </Grid>
      <Box>{children}</Box>
    </Grid>
  );
};
