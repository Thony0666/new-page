import { Box, Grid, Hidden, Pagination, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderBack from "./HeaderBack";
import HeaderBackXS from "./HeaderBackXS";
import axios from "axios";
import ContentCardBack from "./ContentCards";
import Waiter from "./Waiter";
import { useParams } from "react-router-dom";
import { siteUrlApi } from "../../util/api_base";

function GestionPub() {
  const { idArticle } = useParams();
  const [datas, setMyDatas] = useState([]);
  const [page, setPage] = useState([]);
  const [isLoad, setload] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationVariant, setNotificationVariant] = useState("success");

  const handlePageChange = (event, value) => {
    setPageNumber(value);
    setload(true);
  };
  useEffect(() => {
    axios
      .get(siteUrlApi(`article/all?page=${pageNumber}`))
      .then((response) => {
        setMyDatas(response.data.articles);
        setPage(response.data.pagination);
        console.log("Données des articles récupérées avec succès.");
        console.log(response);
        setload(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données des articles."
        );
        console.error(error);
      });
  }, [pageNumber, isLoad, datas]);
  const deleteArticle = () => {
    setload(true);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: siteUrlApi(`article/delete/${idArticle}`),
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setload(false);
        console.log(JSON.stringify(response.data));
        setNotificationMessage(`L'article a été supprimé avec succès !`);
        setNotificationVariant("success");
        setNotificationOpen(true);
      })
      .catch((error) => {
        setload(false);
        console.error(error);
        setNotificationMessage(
          "Une erreur s'est produite lors de la suppression de l'article. Veuillez réessayer plus tard."
        );
        setNotificationVariant("error");
        setNotificationOpen(true);
      });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
        variant={notificationVariant}
      />
      <Waiter loadingState={isLoad} />
      <Grid>
        <Box position={"fixed"} width={"100%"} zIndex={222}>
          <Hidden mdDown>
            <HeaderBack />
          </Hidden>
          <Hidden mdUp>
            <HeaderBackXS />
          </Hidden>
          <Hidden xsUp>
            <HeaderBackXS />
          </Hidden>
        </Box>
      </Grid>
      <Box>
        <Hidden mdDown>
          <HeaderBack />
        </Hidden>
        <Hidden mdUp>
          <HeaderBackXS />
        </Hidden>
        <Hidden xsUp>
          <HeaderBackXS />
        </Hidden>
      </Box>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"75vh"}
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
                <ContentCardBack datas={e} click={deleteArticle} />
              </Grid>
            </Box>
          ))}
      </Grid>
      {datas.length > 0 && (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          p={2}
          sx={{
            backdropFilter: "blur(1px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Pagination
            showFirstButton
            showLastButton
            size="large"
            shape="rounded"
            sx={{ bgcolor: "white", p: 1, borderRadius: 3 }}
            count={page.last_page}
            onChange={handlePageChange}
          />
        </Grid>
      )}
    </>
  );
}

export default GestionPub;
