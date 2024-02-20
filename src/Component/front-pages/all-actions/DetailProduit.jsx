import React, { useEffect, useState } from "react";
import Backthumb from "../../../assets/image/typeMedia/BgImage/BgPhone2.jpeg";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import HeaderXS from "../Header/HeaderXS";
import HeaderXL from "../Header/HeaderXL";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StorageIcon from "@mui/icons-material/Storage";
import Footer from "../footer/Footer";
import Annex from "../all-actions/Annex";
import Waiter from "../all-actions/Waiter";
import { siteUrlApi } from "../../../util/api_base";

function DetailProduit() {
  const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);
  const [datas, setMyDatas] = useState([]);
  const [isLoad, setload] = useState(true);
  const [idArticle, setIdArticles] = useState(null);

  const { id } = useParams();
  const { idCat } = useParams();
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      setLargeurEcran(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    axios
      .get(siteUrlApi(`article/category/${id}`))
      .then((response) => {
        setMyDatas(response.data.article);
        setIdArticles(response.data.article.id);
        console.log("okey azo article faffsdfsf");
        console.log(response);
        setload(false);
      })
      .catch((error) => {
        console.error("tsy mandeha url articles");
        console.error(error);
      });
  }, [location.pathname, id]);
  let imageSrc;
  if (datas.image !== null) {
    imageSrc = datas.image;
  } else {
    imageSrc = Backthumb;
  }
  const click = () => {
    setload(true);
  };
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
      <Stack
        direction="row"
        alignItems="center"
        borderTop={"black solid 10vh"}
        p={3}
      >
        <Box
          display={"flex"}
          margin="auto"
          flexDirection={"row"}
          width={"100%"}
          sx={{
            backgroundColor: "white",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: 0,
            },
          }}
        >
          <Grid container justifyContent={"center"} direction={"row"}>
            <Grid container justifyContent={"space-around"}>
              <Typography
                textAlign={"center"}
                variant="h3"
                fontStyle={"italic"}
                fontFamily={"monospace"}
              >
                {datas.name}
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent={"space-around"}
              alignItems={"center"}
              my={2}
            >
              <Grid
                container
                item
                xs={12}
                md={4.5}
                justifyContent={"center"}
                alignItems={"center"}
                overflow={"hidden"}
                sx={{
                  mb: 1,
                  width: "100%",
                  height: "50vh",
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >
                <img
                  src={imageSrc}
                  alt="Uploaded"
                  style={{ maxHeight: "49vh", borderRadius: "10px" }}
                />
              </Grid>
              <Grid
                p={3}
                item
                xs={12}
                md={3.5}
                textAlign={"left"}
                boxShadow={10}
                borderRadius={5}
              >
                <Typography variant="h4" textAlign={"center"}>
                  Details
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt repellat dignissimos sequi, dolorem odio architecto
                  rerum quas accusantium illo consequatur eveniet quia vitae
                  voluptatibus qui deleniti, sint culpa assumenda reiciendis!
                </Typography>
                <Grid>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent={"space-around"}
                    my={2.5}
                  >
                    <Chip
                      label={`${datas.unit_price},00MGA`}
                      icon={<AttachMoneyIcon />}
                    />
                    <Chip
                      label={`Stock = ${datas.quantity_stock}`}
                      variant="outlined"
                      icon={<StorageIcon />}
                    />
                  </Stack>
                  <Grid mt={2} container justifyContent={"center"}>
                    <Button
                      onClick={click}
                      variant="contained"
                      sx={{
                        backgroundColor: "#EBCC24",
                        marginTop: 1,
                        width: "80%",
                      }}
                    >
                      Acheter
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Annex data={idCat} teste={click} dataidArticle={idArticle} />
          </Grid>
        </Box>
      </Stack>
      <Footer />
    </>
  );
}

export default DetailProduit;
