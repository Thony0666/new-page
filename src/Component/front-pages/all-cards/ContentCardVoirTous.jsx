import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Backthumb from "../../../assets/image/typeMedia/BgImage/BGCity4.jpg";
import Button from "@mui/material/Button";
import { Box, CardActionArea, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const ContentCardVoirTous = (props) => {
  const data = props.data;
  console.log("ito ny data Content Card Front");
  console.log(data);
  let imageSrc;
  let IconImage;
  if (data.image !== null) {
    imageSrc = data.image;
    IconImage = AddShoppingCartIcon;
  } else {
    imageSrc = Backthumb;
    IconImage = AddShoppingCartIcon;
  }
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Card
        sx={{
          p: 1,
          maxWidth: {
            xs: 600,
            md: 345,
          },
          minWidth: {
            xs: 600,
            md: 260,
          },
          maxHeight: 325,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 5px 0.001px rgba(0,0,0,0.75)",
        }}
      >
        <CardActionArea
          onClick={handleScroll}
          component={Link}
          to={`produit/${data.id}`}
        >
          <Box>
            <CardMedia
              component="img"
              height="180"
              image={imageSrc}
              alt="Image"
            />
          </Box>

          <CardContent>
            <Box
              style={{
                width: "auto",
                height: "auto",
                padding: "5px",
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                justifyContent: "center",
                aligndata: "center",
                borderRadius: "50%",
                backgroundColor: "#EBCC24",
                zIndex: 1,
              }}
            >
              <IconImage size={25} style={{ color: "#000", zIndex: 1 }} />
            </Box>

            <Grid
              container
              direction={"column"}
              justifyContent={"flex-start"}
              aligndata={"flex-start"}
              borderRadius={2}
              p={1}
              sx={{
                backgroundImage:
                  "linear-gradient(120deg, #EBCC24 50%, #95c732 50%)",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {data.name}
              </Typography>
              <Typography variant="h6">
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <AttachMoneyIcon /> :
                  <span style={{ fontSize: "14px", color: "blue" }}>
                    {data.unit_price}
                    ,00MGA
                  </span>
                </Grid>
              </Typography>
            </Grid>
            <Grid container justifyContent={"flex-end"}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#EBCC24", marginTop: 1 }}
              >
                Acheter
                <MonetizationOnIcon />
              </Button>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ContentCardVoirTous;
