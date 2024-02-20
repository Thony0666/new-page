// import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";

// routes
// import AuthenticationRoutes from './AuthenticationRoutes';
// import LoginRoutes from './LoginRoutes';
// import MainRoutes from './MainRoutes';

// project import
// import Loadable from 'ui-component/Loadable';
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Contenu from "./Component/Acceuil";
import Inscription from "../Component/auth-pages/Inscription";
import Login from "../Component/auth-pages/Login";
import Product from "../Component/front-pages/main-pages/Product";
import Apropos from "../Component/front-pages/main-pages/Apropos";
import ComandeList from "../Component/back-pages/ListeComande";
import DetailProduit from "../Component/front-pages/all-actions/DetailProduit";
// import PreBuildDashBoard from "../Component/teste";
import NewCat from "../Component/back-pages/NewCat";
import GestionPub from "../Component/back-pages/GestionPub";
import Contenu from "../Component/front-pages/main-pages/Acceuil";
import GestionProduction from "../Component/back-pages/GestionProduction";
import VoirTous from "../Component/front-pages/all-actions/VoirTous";
import DeleteArticleButton from "../Component/teste-pages/teste2";
import UpdateAricle from "../Component/back-pages/UpdateArticle";
import EditCategorie from "../Component/back-pages/EditCategorie";
import DetailUser from "../Component/front-pages/all-actions/DetailUser";

// const PagesLanding : Loadable(lazy(() :> import('views/pages/landing')));

// ::============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    { path: "/inscription", element: <Inscription /> },
    { path: "/login", element: <Login /> },
    { path: "/profil", element: <DetailUser /> },
    { path: "/", element: <Contenu /> },
    { path: "/produit", element: <Product /> },
    { path: "/apropos", element: <Apropos /> },
    { path: "/produit/:id", element: <DetailProduit /> },
    { path: "/produit/categorie/:id/:id", element: <DetailProduit /> },
    { path: "/produit/:id/categorie/:idCat", element: <DetailProduit /> },
    {
      path: "/produit/categorie/:idCat/produit/:id",
      element: <DetailProduit />,
    },
    { path: "/produit/categorie/:id", element: <VoirTous /> },
    { path: "/publier", element: <GestionProduction /> },
    { path: "/gestion/publication", element: <GestionPub /> },
    { path: "/gestion/publication/:idArticle", element: <GestionPub /> },
    { path: "/list-commande", element: <ComandeList /> },
    { path: "/gestion/publication/update/:idartcl", element: <UpdateAricle /> },
    { path: "/update/category/", element: <EditCategorie /> },
    { path: "/update/category/:id", element: <EditCategorie /> },
    { path: "/test", element: <NewCat /> },
    { path: "/test2", element: <DeleteArticleButton /> },
    // { path: '/landing', element: <PagesLanding /> }
  ]
  // {
  //     basename: process.env.REACT_APP_BASE_NAME
  // }
);

export default router;
