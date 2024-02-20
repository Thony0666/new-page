/* eslint-disable jsx-a11y/img-redundant-alt */
// import Footer from "../footer/Footer";
import Footer from "../footer/Footer";
import bannerImage from "../../../assets/image/typeMedia/BgImage/BGCity1.jpg";
import bannerImage2 from "../../../assets/image/CasqueBuilding.jpg";
import imgDesc1 from "../../../assets/image/typeMedia/BgImage/2206_w039_n003_272b_p1_272.jpg";
import imgDesc2 from "../../../assets/image/typeMedia/BgImage/Multitasking (1).gif";
import imgDesc3 from "../../../assets/image/typeMedia/BgImage/BGCity2.jpg";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import HeaderXS from "../Header/HeaderXS";
import HeaderXL from "../Header/HeaderXL";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import RobotoRegular from "../../../assets/fonts/Nunito-Italic-VariableFont_wght.ttf";
import BoltIcon from "@mui/icons-material/Bolt";
import CardAcceuil from "../all-cards/CardAcceul";
import { siteUrlApi } from "../../../util/api_base";

function Contenu() {
  // const [animatedText, setAnimatedText] = useState("");
  const [showFullText, setShowFullText] = useState(false);
  const [datas, setMyDatas] = useState([]);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const parallaxRef = useRef(null);
  const parallaxRef2 = useRef(null);
  const parallaxRef3 = useRef(null);

  useEffect(() => {
    const parallaxEffect = () => {
      const scrolled = window.scrollY;
      const parallaxValue = scrolled * 0.7; // Ajustez cette valeur pour contrôler l'effet de parallaxe
      parallaxRef.current.style.backgroundPositionY = `${parallaxValue}px`;
      parallaxRef2.current.style.backgroundPositionY = `${parallaxValue}px`; // Ajoutez les références manquantes
      parallaxRef3.current.style.backgroundPositionY = `${parallaxValue}px`; // Ajoutez les références manquantes
    };

    window.addEventListener("scroll", parallaxEffect);

    return () => {
      window.removeEventListener("scroll", parallaxEffect);
    };
  }, []);
  // const textToAnimate = `
  // Bienvenue  chez <br />
  // Lowe's <br />
  // `;

  // useEffect(() => {
  //   let index = 0;
  //   const intervalId = setInterval(() => {
  //     setAnimatedText((prevText) => {
  //       const newText = textToAnimate.substring(0, index);
  //       const spanTag = `<span style="font-size: 100px; color: #EBCC24; font-family: 'RobotoRegular', sans-serif;">Lowe's</span>`;
  //       return newText.replace(/Lowe's/, spanTag);
  //     });
  //     index++;

  //     if (index > textToAnimate.length) {
  //       clearInterval(intervalId);
  //     }
  //   }, 50);

  //   return () => clearInterval(intervalId);
  // }, []);
  useEffect(() => {
    axios
      .get(siteUrlApi("article/all"))
      .then((response) => {
        setMyDatas(response.data.articles);
        console.log("okey azo articles");
        console.log(response);
      })
      .catch((error) => {
        console.error("tsy mandeha url articles");
        console.error(error);
      });
  }, []);

  let maxWords;
  if (isXs) {
    maxWords = 30;
  } else if (isSm) {
    maxWords = 40;
  } else if (isMd) {
    maxWords = 50;
  } else if (isLg) {
    maxWords = 80;
  } else {
    maxWords = 40; // Valeur par défaut pour les autres tailles d'écran
  }

  const text = `Imagine une plateforme de gestion de magasin innovante, conçue pour
    simplifier et optimiser toutes les facettes de la gestion
    commerciale. Notre site offre une interface conviviale permettant de
    gérer les stocks, suivre les ventes, et gérer les employés en toute
    efficacité. Grâce à des fonctionnalités avancées, comme la gestion
    des commandes fournisseurs, la génération de rapports en temps réel
    et la facilité d'intégration avec les systèmes de paiement, notre
    solution améliore la productivité des commerces. Que ce soit pour
    les petites boutiques ou les grandes enseignes, notre site est
    l'outil complet pour maximiser l'efficacité et stimuler la
    croissance du commerce.`;

  const trimmedText = showFullText
    ? text
    : text.split(" ").slice(0, maxWords).join(" ");
  const showMoreText = !showFullText && text.split(" ").length > maxWords;

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };
  const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);

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
        overflow={"hidden"}
        width={"100%"}
      >
        <Box
          ref={parallaxRef}
          sx={{
            textAlign: "center",
            width: "100%",
            height: {
              xs: "72vh",
              md: "100vh",
            },
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            boxShadow: " inset 0px 65px 30px -7px rgba(0,0,0,0.51);",
            overflow: "hidden",
          }}
        >
          <Grid
            height={"100%"}
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              backdropFilter: "blur(1px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Stack direction={"column"} justifyContent={"center"}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "7vw",
                    md: "3vw",
                  },
                  textAlign: {
                    xs: "center",
                    md: "lef",
                  },
                }}
                color={"white"}
                variant="h8"
                fontFamily={"monospace"}
                fontWeight={"bold"}
                fontStyle={"italic"}
              >
                Bienvenue chez <br />
                <span
                  style={{
                    fontFamily: "sans-serif",
                    fontStyle: "normal",
                    fontSize: "120px",
                    color: "#EBCC24",
                  }}
                >
                  Lowe's
                </span>
              </Typography>
              <Grid container justifyContent={"center"}>
                <Button
                  variant="contained"
                  style={{
                    justifyContent: "center",
                    width: "30%",
                    margin: "auto",
                    borderRadius: 8,
                    color: "#95c732",
                    backgroundColor: "white",
                  }}
                >
                  Découvre
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Box>

        <Grid
          sx={{
            height: {
              xs: "100%",
              md: "80vh",
            },
            my: {
              xs: 5,
              sm: 3,
            },
          }}
          container
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          justifyContent={{
            xs: "center",
            sm: "center",
            md: "center",
            lg: "space-around",
          }}
          alignItems={{ xs: "center", md: "center", lg: "center" }}
        >
          <Grid
            container
            textAlign={"center"}
            alignItems={"center"}
            justifyItems={"center"}
            sx={{
              width: {
                xs: "70%",
                sm: "50%",
                md: "40%",
              },
              height: {
                xs: "20%",
                md: "24vw",
              },
              borderRadius: {
                xs: 0,
                sm: 3,
              },
              overflow: "hidden",
            }}
          >
            <img
              src={imgDesc3}
              alt="photoDesc"
              style={{ borderRadius: 10, width: "100%" }}
            />
          </Grid>

          <Grid
            container
            item
            xs={4}
            sm={6}
            md={6}
            direction={"column"}
            justifyContent={"center"}
            sx={{
              width: {
                xs: "95%",
                sm: "80%",
                md: "50%",
              },
            }}
          >
            <Typography
              variant="h3"
              fontFamily={"monospace"}
              fontStyle={"italic"}
              textAlign={"center"}
            >
              Description
            </Typography>
            <Grid container justifyContent={"center"}>
              <Divider sx={{ width: "50%" }}>
                <BoltIcon />
              </Divider>
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              p={3}
            >
              <Typography
                variant="h6"
                fontFamily={RobotoRegular}
                textAlign={"left"}
                sx={{
                  width: {
                    xs: "100%",

                    md: "100%",
                  },
                }}
              >
                {trimmedText}
                {showMoreText && (
                  <span
                    onClick={toggleShowMore}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    ...voir plus
                  </span>
                )}
                {showFullText && (
                  <span
                    onClick={toggleShowMore}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    ...voir moins
                  </span>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          ref={parallaxRef3}
          container
          height={"70vh"}
          sx={{
            backgroundImage: `url(${bannerImage2})`,
            backgroundSize: "cover",
          }}
        >
          <Grid
            sx={{
              backdropFilter: "blur(1px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            container
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              fontFamily={"monospace"}
            >
              <span
                style={{
                  fontSize: "6vh",
                  fontStyle: "italic",
                  color: "#EBCC24",
                }}
              >
                Lowe's
              </span>
              <br />
              <span
                style={{ fontWeight: "bold", fontSize: "8vh", color: "white" }}
              >
                Excellence sans compromis.
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Box
          display={"flex"}
          flexDirection={"column"}
          pt={3}
          sx={{
            width: "100%",
          }}
        >
          <Box>
            <Grid
              container
              direction={{
                xs: "column-reverse",
                sm: "row",
                md: "row",
                lg: "row",
              }}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Grid
                borderRadius={5}
                container
                textAlign={"center"}
                alignItems={"center"}
                justifyItems={"center"}
                sx={{
                  width: {
                    xs: "100%",
                    md: "30vw",
                  },
                  height: {
                    xs: "100%",
                    md: "30vw",
                  },
                  overflow: "hidden",
                }}
                sm={5}
                md={4}
                lg={4}
              >
                <img src={imgDesc1} alt="photoDesc" style={{ width: "100%" }} />
              </Grid>
              <Grid
                padding={{ xs: 2, md: 3, lg: 3 }}
                margin={{ xs: 2, sm: "2vh 0", md: 1, lg: 1 }}
                alignItems={"center"}
                width={{ xs: "100", md: "100%", lg: "50%" }}
                sx={{ borderRadius: 5, bgcolor: "#EBCC24" }}
                item
                sm={6.5}
                md={7}
                lg={7}
              >
                <Typography
                  variant="h4"
                  fontFamily={"monospace"}
                  fontStyle={"italic"}
                  textAlign={"center"}
                  sx={{
                    fontSize: {
                      sm: "3.5vh",
                      md: "5vh",
                    },
                  }}
                >
                  Explorez la Complétude <br />
                  chez Lowe's
                </Typography>
                <Typography
                  textAlign={"left"}
                  variant="h6"
                  fontFamily={RobotoRegular}
                  sx={{
                    textAlign: {
                      xs: "justify",
                      sm: "left",
                      md: "left",
                    },
                    fontSize: {
                      xs: "2.8vh",
                      sm: "2vh",
                      md: "2.7vh",
                    },
                  }}
                >
                  Chez Lowe's, nous sommes fiers de vous offrir une gamme
                  complète de produits et de services pour répondre à tous vos
                  besoins. Que vous recherchiez des produits de haute qualité,
                  un service client exceptionnel ou une expérience d'achat
                  pratique, nous avons tout ce qu'il vous faut, et plus encore.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box pb={6}>
            <Grid
              container
              direction={{
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
              }}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Grid
                padding={{ xs: 2, md: 3, lg: 3 }}
                margin={{ xs: 2, sm: "2vh 0", md: 1, lg: 1 }}
                alignItems={"center"}
                width={{ xs: "100", md: "100%", lg: "50%" }}
                sx={{ borderRadius: 5, bgcolor: "#95c732" }}
                item
                sm={6.5}
                md={7}
                lg={7}
              >
                <Typography
                  variant="h4"
                  fontFamily={"monospace"}
                  fontStyle={"italic"}
                  textAlign={"center"}
                  sx={{
                    fontSize: {
                      sm: "3.5vh",
                      md: "5vh",
                    },
                  }}
                >
                  Lowe's est là pour vous, toujours à vos côtés
                </Typography>
                <Typography
                  textAlign={"left"}
                  variant="h6"
                  fontFamily={RobotoRegular}
                  sx={{
                    textAlign: {
                      xs: "justify",
                      sm: "left",
                      md: "left",
                    },
                    fontSize: {
                      xs: "2.8vh",
                      sm: "2vh",
                      md: "2.7vh",
                    },
                  }}
                >
                  Bienvenue chez Lowe's - Votre Solution de Gestion de Magasin
                  Disponible à Tout Moment ! Chez Lowe's, nous comprenons que le
                  monde du commerce ne dort jamais. C'est pourquoi nous sommes
                  fiers de vous offrir une solution de gestion de magasin
                  disponible 24 heures sur 24, 7 jours sur 7. Que vous soyez un
                  propriétaire de petite boutique ou une grande enseigne, nous
                  sommes là pour vous accompagner à chaque étape de votre
                  parcours commercial.
                </Typography>
              </Grid>
              <Grid
                borderRadius={5}
                container
                textAlign={"center"}
                alignItems={"center"}
                justifyItems={"center"}
                sx={{
                  width: {
                    xs: "100%",
                    md: "30vw",
                  },
                  height: {
                    xs: "100%",
                    md: "30vw",
                  },
                  overflow: "hidden",
                }}
                sm={5}
                md={4}
                lg={4}
              >
                <img src={imgDesc2} alt="photoDesc" style={{ width: "100%" }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Grid
          ref={parallaxRef2}
          container
          height={"70vh"}
          sx={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
          }}
        >
          <Grid
            sx={{
              backdropFilter: "blur(1px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            container
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              fontFamily={"monospace"}
            >
              <span
                style={{
                  fontSize: "6vh",
                  fontStyle: "italic",
                  color: "#EBCC24",
                }}
              >
                Lowe's
              </span>
              <br />
              <span
                style={{ fontWeight: "bold", fontSize: "8vh", color: "white" }}
              >
                Excellence sans compromis.
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Box
          py={3}
          boxShadow={10}
          sx={{
            width: "100%",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              textAlign: {
                xs: "center",
              },
            }}
            variant="h2"
            color={"#95c732"}
            paddingX={6}
          >
            Arrivage
          </Typography>
          <Stack direction="row" alignItems="center">
            <Box
              display={"flex"}
              margin="auto"
              flexDirection={"row"}
              width={"100%"}
              px={2}
              sx={{
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                  width: 0,
                },
              }}
            >
              <Tabs variant="scrollable">
                {datas &&
                  datas.map((e) => (
                    <Box key={e.id}>
                      <Box
                        sx={{
                          minWidth: { xs: 300, sm: 350 },
                          p: { xs: 1, sm: 2 },
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <CardAcceuil data={e} id={datas.id} />
                      </Box>
                    </Box>
                  ))}
              </Tabs>
            </Box>
          </Stack>
        </Box>

        <Footer />
      </Grid>
    </>
  );
}

export default Contenu;
