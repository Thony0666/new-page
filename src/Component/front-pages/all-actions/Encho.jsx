import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import bannierer from "../../../assets/image/typeMedia/BgImage/BGCity2.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chip, Stack } from "@mui/material";
import Waiter from "./Waiter";
import { siteUrlApi } from "../../../util/api_base";

function ResponsiveAppBar(props) {
  const [isLoading, setLoading] = React.useState(false);

  const { userFront, auth } = props.data;
  const idUser = userFront.id;
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/profil");
    setAnchorElUser(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    try {
      auth.logoutUserFront();
      navigate("/login");
      setAnchorElUser(null);
    } catch (err) {
      console.error(err);
      setAnchorElUser(null);
    }
  };
  let imageSrc;
  if (users.image !== null) {
    imageSrc = users.image;
  } else {
    imageSrc = bannierer;
  }
  React.useEffect(() => {
    axios
      .get(siteUrlApi(`user/${idUser}`))
      .then((response) => {
        setUsers(response.data.user);
        console.log("okey azo user");
        console.log(response);
        setLoading(true);
      })
      .catch((error) => {
        console.error("tsy mandeha url user");
        console.error(error);
      });
  }, [idUser]);
  return (
    <>
      <Waiter loadingState={!isLoading} />
      <Box>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}></IconButton>
        <Chip
          sx={{
            bgcolor: "white",
            color: "white",
            height: {
              xs: "6vh",
              md: "6vh",
            },
            border: "#95c732 2px solid",
          }}
          onClick={handleOpenUserMenu}
          avatar={
            <Avatar
              alt={userFront.first_name}
              src={imageSrc}
              style={{ width: "5vh", height: "5vh" }}
            />
          }
          variant="filled"
          label={
            <SettingsIcon
              stroke={1.5}
              size="24px"
              style={{ color: "#95c732" }}
            />
          }
        />

        <Menu
          sx={{ mt: "50px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Stack
            direction={"column"}
            marginX={2}
            justifyContent={"center"}
            textAlign={"center"}
          >
            <Typography
              onClick={handleCloseUserMenu}
              variant="body1"
              fontWeight={"bold"}
            >
              {userFront.username}
            </Typography>

            <Button
              sx={{ color: "#95c732" }}
              onClick={handleProfile}
              startIcon={<AccountCircleIcon />}
            >
              Profile
            </Button>

            <Button
              sx={{ color: "#95c732" }}
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Stack>
        </Menu>
      </Box>
    </>
  );
}
export default ResponsiveAppBar;
