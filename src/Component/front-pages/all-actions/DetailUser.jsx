import React, { useEffect, useState } from "react";
import { useAuthTemp } from "../../../util/auth";
import axios from "axios";
import Waiter from "./Waiter";
import bannerImage from "../../../assets/image/banniere.jpg";
import Fab from "@mui/material/Fab";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Box,
  Avatar,
  Grid,
  Button,
  Typography,
  IconButton,
  CardMedia,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { siteUrlApi } from "../../../util/api_base";
function DetailUser() {
  const auth = useAuthTemp();
  const userFront = auth.getUserFront();
  const idUser = userFront ? userFront.id : null;
  const [datas, setUser] = useState([]);
  const [isLoad, setload] = useState(true);
  const [isPhotoEnlarged, setIsPhotoEnlarged] = useState(false);
  const handleOpenPhotoClick = () => {
    setIsPhotoEnlarged(true);
  };
  const handleClosePhotoClick = () => {
    setIsPhotoEnlarged(false);
  };

  useEffect(() => {
    axios
      .get(siteUrlApi(`user/${idUser}`))
      .then((response) => {
        setUser(response.data.user);
        console.log("okey azo user ");
        console.log(response);
        setload(false);
      })
      .catch((error) => {
        console.error("tsy mandeha url get user");
        console.error(error);
      });
  }, [idUser]);
  const StyledFab = styled(Fab)({
    zIndex: 2,
    top: "-50%",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: "0.7vh solid white",
  });
  function formatDate(dateString) {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  }
  return (
    <>
      <Waiter loadingState={isLoad} />
      <>
        {isPhotoEnlarged && (
          <Grid
            height={"100vh"}
            position={"fixed"}
            justifyContent={"center"}
            container
            sx={{
              backdropFilter: "blur(1px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            zIndex={22222}
            py={5}
          >
            <Grid
              border={"white solid 2px"}
              position={"relative"}
              container
              width={"70%"}
              justifyContent={"flex-start"}
              alignContent={"baseline"}
              sx={{
                backdropFilter: "blur(1px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              borderRadius={8}
            >
              <Box
                style={{
                  width: "auto",
                  height: "auto",
                  padding: "5px",
                  position: "absolute",
                  top: 20,
                  right: 20,
                  display: "flex",
                  justifyContent: "center",
                  aligndata: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  zIndex: 1,
                }}
              >
                <IconButton
                  style={{ padding: 0, zIndex: 99999 }}
                  onClick={handleClosePhotoClick}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                overflow={"hidden"}
                sx={{
                  mb: 1,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 5,
                }}
              >
                <img
                  src={datas.image}
                  alt="Uploaded"
                  style={{ maxHeight: "90vh", borderRadius: "10px" }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Stack direction={"row"} p={3}>
          <Stack direction={"column"} sx={{ width: "100%" }}>
            <Box>
              <img
                src={bannerImage}
                alt="sary-fandrakofana"
                style={{ width: "100%", height: "auto", borderRadius: 5 }}
              />
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction={{ xs: "column", sm: "row" }}>
                <Box
                  textAlign={"center"}
                  sx={{
                    width: "20vh",
                    height: "20vh",
                    position: "relative",
                    ml: "8vw",
                    mb: "-8vh",
                  }}
                >
                  <StyledFab aria-label="add" onClick={handleOpenPhotoClick}>
                    <Avatar
                      src={datas.image}
                      sx={{
                        bgcolor: grey[300],
                        color: "white",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </StyledFab>
                </Box>
                <Stack ml={2} direction={"column"}>
                  <Typography variant="h4" fontWeight={"bold"}>
                    {datas.first_name} {datas.last_name}
                  </Typography>
                  <Typography variant="body1">{datas.username}</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Stack>
        </Stack>
        <Box sx={{ my: 4 }}>
          <Grid container justifyContent={"center"}>
            <Grid xs={12} md={4} mb={3}>
              <Grid
                boxShadow={10}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  p: 2,
                  mx: 2,
                }}
              >
                <Typography variant="body1" sx={{ m: 2, textAlign: "left" }}>
                  <span style={{ fontWeight: "bold" }}>Email :</span>{" "}
                  {datas.email}
                </Typography>
                <Typography variant="body1" sx={{ m: 2, textAlign: "left" }}>
                  <span style={{ fontWeight: "bold" }}>Numero :</span>{" "}
                  {datas.phone_number}
                </Typography>
                <Typography variant="body1" sx={{ m: 2, textAlign: "left" }}>
                  <span style={{ fontWeight: "bolder" }}>Membre depuit :</span>{" "}
                  {}
                  {formatDate(datas.created_at)}
                </Typography>
              </Grid>
              <Grid
                boxShadow={10}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  pb: 2,
                  m: 2,
                }}
                justifyContent={"center"}
              >
                <Grid container py={2} justifyContent={"center"} px={3}>
                  <Typography variant="h3">Autre Photo</Typography>
                  <CardMedia
                    component="img"
                    height="180"
                    image={datas.image}
                    alt="Image"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={7} mb={3}>
              <Grid
                boxShadow={10}
                maxHeight={"35vh"}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  p: 2,
                  mx: 2,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "secondary", m: 2, textAlign: "center" }}
                >
                  Address
                </Typography>
                <Typography variant="body1" sx={{ m: 2, textAlign: "left" }}>
                  <span style={{ fontWeight: "bolder" }}>Domicile:</span>{" "}
                  {datas.address}
                </Typography>
                <Typography variant="body1" sx={{ m: 2, textAlign: "left" }}>
                  <span style={{ fontWeight: "bolder" }}>Region :</span> {}
                  {datas.city}
                </Typography>
              </Grid>
              <Grid container justifyContent={"center"} py={3}>
                <Button
                  sx={{ width: "70%" }}
                  variant="contained"
                  color="primary"
                >
                  Modifier votre profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
}

export default DetailUser;
