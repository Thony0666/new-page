import {
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { siteUrlApi } from "../../util/api_base";
function EditCategorie() {
  const [showTextField, setShowTextField] = useState(false);
  const [categorie, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(siteUrlApi(`category/all`))
      .then((response) => {
        setCategories(response.data.categories);
        console.log("okey azo articles be");
        console.log(response);
      })
      .catch((error) => {
        console.error("tsy mandeha url articles");
        console.error(error);
      });
  }, []);
  const HandelShowTextField = () => {
    setShowTextField(true);
  };

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          maxHeight={"98vh"}
          direction={"column"}
          p={3}
        >
          <Typography p={3} variant="h4">
            Modifier Categorie
          </Typography>
          {categorie &&
            categorie.map((option) => (
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"60%"}
                height={"8vh"}
                position={"relative"}
              >
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  {option.name.charAt(0).toUpperCase() + option.name.slice(1)}{" "}
                </MenuItem>
                {showTextField && (
                  <TextField
                    sx={{
                      my: 1,
                      position: "absolute",
                      bgcolor: "white",
                      width: "100%",
                      zIndex: 555,
                    }}
                    id="outlined-multiline-static"
                    name="descri"
                    label="Description"
                    multiline
                    defaultValue={option.name}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                <Grid>
                  <Link to={`${option.id}`}>
                    <IconButton onClick={HandelShowTextField}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
}

export default EditCategorie;
