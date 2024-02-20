import {
  Box,
  Button,
  Grid,
  Hidden,
  Input,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as yup from "yup";
import styled from "@emotion/styled";
import HeaderBack from "./HeaderBack";
import axios from "axios";
import HeaderBackXS from "./HeaderBackXS";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import StateNotification from "../front-pages/all-actions/Notification";
import { useParams } from "react-router-dom";
import { siteUrlApi } from "../../util/api_base";

const validationSchema = yup.object({
  nameMateriel: yup.string("Veuillez entrer votre nom de materiel"),
  descri: yup.string("Veuillez entrer votre description"),
  categories: yup.number("Veuillez entrer  categorie "),
  price: yup.number("Veuillez entrer votre prix"),
  quantity: yup.number("Veuillez entrer votre qualité"),
});
const validationSchemaCat = yup.object({
  newCat: yup.string("Veuillez entrer votre categorie"),
});
function UpdateAricle() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedImageRecto, setSelectedImageRecto] = useState();
  const [showTextField, setShowTextField] = useState(false);
  const [newCatValue, setNewCatValue] = useState(""); // State pour stocker la valeur saisie
  const [categorie, setCategories] = useState([]);
  const [article, setArticle] = useState([]);

  const { idartcl } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/article/category/${idartcl}`)
      .then((response) => {
        setArticle(response.data.article);
        console.log("okey azo articles be");
        console.log(response);
      })
      .catch((error) => {
        console.error("tsy mandeha url articles");
        console.error(error);
      });
  }, [idartcl]);
  useEffect(() => {
    axios
      .get(siteUrlApi("category/all"))
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
  const handleValidation2 = () => {
    setShowTextField(false);
    setNewCatValue(formikForValidationButton.values.newCat);
    formikForValidationButton.handleSubmit();
    console.log(newCatValue);
  };

  const handleAddNewCategory = () => {
    setShowTextField(true);
  };
  const handlecloseAddNewCategory = () => {
    setShowTextField(false);
  };
  const formik = useFormik({
    initialValues: {
      recto: article.image,
      nameMateriel: article.name,
      descri: article.new_column,
      categories: article.category_id,
      price: article.unit_price,
      quantity: article.quantity,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitFormData(values);
      setOpen(true);

      console.log(JSON.stringify(values, null, 2));
    },
  });
  const submitFormDataCat = async (values) => {
    console.log("Submitting form data model");
    const formData = new FormData();

    formData.append("name", values.newCat);

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    console.log(JSON.stringify(object));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: siteUrlApi(`category/crup/${idartcl}`),
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log("Tafiditra ny new cat");
        console.log(response);
        setShowSuccessDialog(true);
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Tsy tafiditra ny new cat");
        console.error(error);
        setOpen(false);
        setShowErrorDialog(true);
      });
  };
  const submitFormData = async (values) => {
    console.log("Submitting form data model");
    const formData = new FormData();

    formData.append("image", values.recto);
    formData.append("new_column", values.descri);
    formData.append("name", values.nameMateriel);
    formData.append("unit_price", values.price);
    formData.append("quantity_stock", values.quantity);
    formData.append("category_id", values.categories);
    console.log(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: siteUrlApi(`article/crup/${idartcl}/`),
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Tafiditra");
        console.log(response);
        setOpen(false);
        setShowSuccessDialog(true);
      })
      .catch((error) => {
        console.log(siteUrlApi(`article/crup/${idartcl}`));
        console.error(error);
        setOpen(false);

        setShowErrorDialog(true);
      });
  };
  const formikForValidationButton = useFormik({
    initialValues: {
      newCat: "",
    },
    validationSchemaCat: validationSchemaCat,
    onSubmit: (values) => {
      submitFormDataCat(values);
      console.log(JSON.stringify(values, null, 2));
      setOpen(true);
    },
  });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
  };
  return (
    <>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            textAlign: "center",
            height: "80vh",
          }}
        >
          <Grid
            sx={{
              border: "solid white 5px",
              boxShadow: "5px 7px 10px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 4,
              textAlign: "center",
              justifyContent: "center",
              bgcolor: "#95c732",
              overflow: "hidden",
              width: {
                xs: "98%",
                sm: "70%",
                md: "50%",
              },
              marginTop: {
                xs: "10vh",
                md: 2,
              },
            }}
          >
            <Typography
              variant="h2"
              fontFamily={"monospace "}
              style={{ fontStyle: "italic" }}
            >
              Modification Publication
            </Typography>
            <Grid
              container
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              sx={{
                padding: 3,
                width: "100%",
                borderRadius: 4,
                bgcolor: "white",
              }}
            >
              <Grid
                container
                direction={"row"}
                justifyContent={"space-around"}
                alignItems={"flex-start"}
              >
                <Grid
                  md={5}
                  container
                  direction={"column"}
                  sx={{
                    mr: 1,
                    p: 1,
                    border: "2px dotted grey",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handlecloseAddNewCategory}
                >
                  {selectedImageRecto && (
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      overflow={"hidden"}
                      sx={{
                        mb: 1,
                        width: "100%",
                        height: "23vh",
                        textAlign: "center",
                        borderRadius: 5,
                      }}
                    >
                      <img
                        src={selectedImageRecto}
                        alt="Uploaded"
                        style={{ maxHeight: "23vh", borderRadius: "10px" }}
                      />
                    </Grid>
                  )}
                  {selectedImageRecto ? null : (
                    <Grid>
                      <Typography
                        textAlign={"center"}
                        variant="h4"
                        color={"#95c732"}
                        mt={2}
                      >
                        UpLoad Photo
                      </Typography>
                      <img
                        src={article.image}
                        alt="Uploaded"
                        style={{ maxHeight: "23vh", borderRadius: "10px" }}
                      />
                    </Grid>
                  )}

                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="recto-upload"
                    name="recto"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSelectedImageRecto(reader.result);
                        };
                        reader.readAsDataURL(file);
                        formik.setFieldValue("recto", file);
                      }
                    }}
                  />

                  <label htmlFor="recto-upload">
                    <Button
                      component="span"
                      style={{ color: "#EBCC24" }}
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                    >
                      {selectedImageRecto ? "Changer" : "Parcourir"}
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </label>
                </Grid>
                <Grid container md={6} direction={"row"}>
                  <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    id="descri"
                    name="descri"
                    label="Description"
                    multiline
                    rows={8}
                    value={formik.values.descri}
                    onClick={handlecloseAddNewCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.descri && Boolean(formik.errors.descri)
                    }
                    helperText={formik.touched.descri && formik.errors.descri}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction={"column"}
                sx={{
                  mx: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="outlined-select-currency"
                  name="categories"
                  label="Categorie"
                  select
                  value={formik.values.categories}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.region && Boolean(formik.errors.region)}
                  helperText={formik.touched.region && formik.errors.region}
                >
                  {categorie &&
                    categorie.map((option) => (
                      <MenuItem
                        onClick={handlecloseAddNewCategory}
                        key={option.id}
                        value={option.id}
                      >
                        {option.name.charAt(0).toUpperCase() +
                          option.name.slice(1)}
                      </MenuItem>
                    ))}

                  <MenuItem
                    style={{
                      border: "2px solid #EBCC24",
                      justifyContent: "center",
                      width: "55%",
                      margin: "auto",
                      borderRadius: 5,
                      color: "#EBCC24",
                      backgroundColor: "white",
                    }}
                    onClick={handleAddNewCategory}
                  >
                    <AddIcon />
                    Add New categorie
                  </MenuItem>
                </TextField>
                {showTextField && (
                  <form onSubmit={formikForValidationButton.handleSubmit}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={2}
                      sx={{
                        width: "100%",
                        height: "5vh",
                      }}
                    >
                      <ClearIcon
                        onClick={handlecloseAddNewCategory}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            fontSize: "2rem",
                          },
                        }}
                      />
                      <Input
                        id="newCat"
                        fullWidth
                        name="newCat"
                        placeholder="Nom de Nouvelle categorie"
                        value={formikForValidationButton.values.newCat}
                        onChange={formikForValidationButton.handleChange}
                        onBlur={formikForValidationButton.handleBlur}
                        error={
                          formikForValidationButton.touched.newCat &&
                          Boolean(formikForValidationButton.errors.newCat)
                        }
                        helperText={
                          formikForValidationButton.touched.newCat &&
                          formikForValidationButton.errors.newCat
                        }
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          maxHeight: "7vh",
                          bgcolor: "#EBCC24",
                        }}
                        onClick={handleValidation2}
                      >
                        Valider
                      </Button>
                      <StateNotification
                        showSuccessDialog={showSuccessDialog}
                        showErrorDialog={showErrorDialog}
                        handleCloseSuccessDialog={handleCloseSuccessDialog}
                        successMessage="Votre nouveau categorie a été créée avec succès!"
                        handleCloseErrorDialog={handleCloseErrorDialog}
                        errorMessage="Erreur : Veuillez vérifier le champ New cat"
                      />
                    </Stack>
                  </form>
                )}
                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="nameMateriel"
                  name="nameMateriel"
                  label="Nom de materiel"
                  value={formik.values.nameMateriel}
                  onChange={formik.handleChange}
                  onClick={handlecloseAddNewCategory}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nameMateriel &&
                    Boolean(formik.errors.nameMateriel)
                  }
                  helperText={
                    formik.touched.nameMateriel && formik.errors.nameMateriel
                  }
                />
                <Grid
                  container
                  justifyContent={{
                    xs: "center",
                    sm: "center",
                    md: "space-around",
                    lg: "space-around",
                  }}
                  alignItems={"center"}
                >
                  <Grid
                    container
                    justifyContent={"center"}
                    pr={1}
                    item
                    xs={6}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      sx={{ my: 2 }}
                      id="price"
                      name="price"
                      label="Prix unique"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onClick={handlecloseAddNewCategory}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                  <Grid
                    container
                    justifyContent={"center"}
                    pl={1}
                    item
                    xs={6}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      type="number"
                      label="Quantite"
                      sx={{ my: 2 }}
                      name="quantity"
                      variant="outlined"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onClick={handlecloseAddNewCategory}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                      }
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
            >
              <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={handlecloseAddNewCategory}
                sx={{
                  mx: 20,
                  my: 2,
                  backgroundImage:
                    "linear-gradient(120deg, #EBCC24 50%, #95c732 50%)",
                }}
              >
                Publier
              </Button>
            </Grid>
          </Grid>
          <StateNotification
            showSuccessDialog={showSuccessDialog}
            showErrorDialog={showErrorDialog}
            handleCloseSuccessDialog={handleCloseSuccessDialog}
            successMessage="Votre publication a été créée avec succès!"
            handleCloseErrorDialog={handleCloseErrorDialog}
            errorMessage="Erreur : Veuillez vérifier le format"
          />
        </Grid>
      </form>
    </>
  );
}

export default UpdateAricle;
