import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Waiter from "./Waiter";
import HeaderXS from "../Header/HeaderXS";
import HeaderXL from "../Header/HeaderXL";
import { useParams } from "react-router-dom";
import ContentCardVoirTous from "../all-cards/ContentCardVoirTous";
import { siteUrlApi } from "../../../util/api_base";

function VoirTous() {
  const [datas, setMyDatas] = useState([]);
  const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);
  const [isLoad, setload] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(siteUrlApi(`category/article/${id}`))
      .then((response) => {
        setMyDatas(response.data.category.articles);
        console.log("Données des articles récupérées avec succèsfasdfasd.");
        console.log(response);
        setload(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données des articles."
        );
        console.error(error);
      });
  }, [isLoad, id]);

  useEffect(() => {
    const handleResize = () => {
      setLargeurEcran(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Waiter loadingState={isLoad} />
      <Box>
        {largeurEcran < 900.99 ? (
          <Box sx={{ display: "none" }}>
            <HeaderXS />
          </Box>
        ) : (
          <Box>
            <HeaderXL />
          </Box>
        )}
        {largeurEcran > 900.99 ? (
          <Box sx={{ display: "none" }}>
            <HeaderXL />
          </Box>
        ) : (
          <Box>
            <HeaderXS />
          </Box>
        )}
      </Box>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        borderTop={"black solid 10vh"}
        minHeight={"75vh"}
        p={3}
      >
        {datas &&
          datas.map((e) => (
            <Box key={e.id}>
              <Grid
                container
                justifyContent={"center"}
                sx={{
                  minWidth: { xs: 300, sm: 300 },
                  p: { xs: 1, sm: 2 },
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <ContentCardVoirTous data={e} />
              </Grid>
            </Box>
          ))}
      </Grid>
    </>
  );
}

export default VoirTous;
