import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Badge, TextField } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCartItemsLength } from "../redux/slices/cartItemsLength";

import AvatarFace from "../assets/images/Avatar1.jpg";
import SadFace from "../assets/images/sad-face.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const pages = [];
const settings = [
  {
    name: "Profile",
    path: "/profile",
    showOnAuth: true,
  },
  {
    name: "My Orders",
    path: "/orders",
    showOnAuth: true,
  },
  {
    name: "Address",
    path: "/address",
    showOnAuth: true,
  },
  {
    name: "Login",
    path: "/login",
    showOnAuth: false,
  },
  {
    name: "Sign Up",
    path: "/signup",
    showOnAuth: false,
  },
  {
    name: "Logout",
    showOnAuth: true,
  },
];


const clothingSuggestions = [
  { title: "Shirts" },
  { title: "Shorts" },
  { title: "Jeans" },
  { title: "Trousers" },
];

import { Link } from "react-router-dom";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isAuthenticated = localStorage.getItem("token") ? true : false;
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    if (localStorage.getItem("token") === null) {
      return;
    }
    try {
      // setLoading(true);
      const response = await axios.get(
        `https://backend-sigma-ecru.vercel.app/api/cart/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setCartItemsLength(response.data.products.length));
    } catch (error) {
      console.log(error);
    }
  };

  const cartItemsLength = useSelector((state) => state.cartItemsLength.value);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="sm:w-11/12 w-full mx-auto ">
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", borderRadius: "10px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/" className="text-black">
                TrendMingle
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/" className="text-black">
                TrendMingle
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1,
               display:{ xs: "none", md: "flex" },justifyContent:'end'
                }}>
              <Stack spacing={1} sx={{ width: '50%' }} padding={1}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={clothingSuggestions.map((option) => option.title)}
                  onInputChange={(event, newInputValue) => {
                    setSearch(newInputValue);
                  }}
                  onChange={(event, newValue) => {
                    setSearch(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        boxShadow: "0 1px 1px rgba(0,0,0,0.075) inset",
                        "&:hover": {
                          borderColor: "#ccc",
                        },
                        "&:focus": {
                          borderColor: "#ccc",
                        },
                      }}
                    />
                  )}
                />
              </Stack>
              <IconButton size="large" aria-label="search" color="inherit">
                <SearchOutlinedIcon
                  onClick={() => {
                    navigate(`/products/${search}`);
                  }}
                />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open wishlist">
                <Link to="/wishlist" className="text-black">
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: "2rem", marginX: "1px" }}
                  />
                </Link>
              </Tooltip>
              <Tooltip title="Open cart">
                <Link to="/cart" className="text-black">
                  <Badge
                    badgeContent={cartItemsLength}
                    color="primary"
                    sx={{
                      marginX: "10px",
                    }}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                  </Badge>
                </Link>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={isAuthenticated ? AvatarFace : SadFace}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
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
                {settings.map(
                  (setting) =>
                    isAuthenticated === setting.showOnAuth && (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        {setting.name === "Logout" ? (
                          <Typography
                            onClick={() => {
                              localStorage.removeItem("token");
                              navigate("/login");
                            }}
                            className="text-black"
                          >
                            {setting.name}
                          </Typography>
                        ) : (
                          <Link to={setting?.path} className="text-black">
                            {setting.name}
                          </Link>
                        )}
                      </MenuItem>
                    )
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Header;
