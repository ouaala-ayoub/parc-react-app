import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Text, Box, Center, VStack, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import * as htmlToImage from "html-to-image";

const EngineQrCode = () => {
  const { id } = useParams();
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const qrRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/engine/${id}`
        );
        if (!response.ok) {
          const resJson = await response.json();
          throw new Error(resJson.error);
        }
        const engine = await response.json();
        setEngine(engine);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // const handleDownload = async () => {
  //   if (qrRef.current) {
  //     const dataUrl = await htmlToImage.toPng(qrRef.current);
  //     const link = document.createElement("a");
  //     link.href = dataUrl;
  //     link.download = `${engine.num_parc_engine}.png`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  if (loading) {
    return <Loader />;
  } else if (error) {
    return <Text color="red">Error: {error}</Text>;
  } else {
    return (
      <Box>
        <Center minHeight="100vh">
          <VStack spacing={10} ref={qrRef}>
            <QRCodeCanvas size={300} value={engine.num_parc_engine} />
            <Text fontWeight={"bold"} fontSize="35">
              {engine.num_parc_engine}
            </Text>
            {/* <Button mt={4} onClick={handleDownload}>
              Telecharger le QR Code
            </Button> */}
          </VStack>
        </Center>
      </Box>
    );
  }
};

export default EngineQrCode;
