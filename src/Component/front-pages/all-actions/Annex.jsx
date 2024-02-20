import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardAnnex from "../all-cards/CardAnnex";
import axios from "axios";
import Waiter from "./Waiter";
import { siteUrlApi } from "../../../util/api_base";

function Annex(props) {
  const idart = props.dataidArticle;
  const id = props.data;
  const testeclick = props.teste;
  const [isLoad, setload] = useState(false);
  const [annex, setAnnex] = useState([]);
  useEffect(() => {
    axios
      .get(siteUrlApi(`category/article/${id}`))
      .then((response) => {
        setAnnex(response.data.category);
        console.log("okey azo ny  article misy cat");
        // console.log(idCat);
        // console.log(response);
        setload(false);
      })
      .catch((error) => {
        console.error("tsy mandeha article misy cat");
        console.error(error);
      });
  }, [id]);
  const handelLoad = () => {
    testeclick();
    console.log("inty ny id article" + idart);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Waiter loadingState={isLoad} />
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={10}
        borderRadius={5}
        m={1}
      >
        <Grid style={{ display: annex.articles === 0 ? "none" : "block" }}>
          <Typography
            variant="h4"
            fontFamily={"monospace"}
            fontStyle={"italic"}
          >
            Annexes
          </Typography>
        </Grid>

        <Grid
          container
          justifyContent={"center"}
        >
          {annex.articles &&
            annex.articles.map((e) => {
              if (e.id !== idart) {
                return (
                  <Box key={e.id} my={3}>
                    <Box
                      sx={{
                        minWidth: { xs: 255, sm: 250 },
                        p: { xs: 1, sm: 1 },
                        mx: 1.5,
                        width: "5vw",
                        borderRadius: 2,
                      }}
                    >
                      <CardAnnex
                        datas={e}
                        annex={annex.id}
                        click={handelLoad}
                      />
                    </Box>
                  </Box>
                );
              }
              return null; 
            })}
        </Grid>
      </Grid>
    </>
  );
}

export default Annex;
