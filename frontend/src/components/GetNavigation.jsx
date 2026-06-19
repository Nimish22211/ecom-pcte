import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SellIcon from "@mui/icons-material/Sell";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubble";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const GetNavigation = () => [
  {
    segment: "student",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },

  {
    segment: "student/collections",
    title: "Collections",
    icon: <StorefrontIcon />,
  },
  {
    segment: "student/wishlist",
    title: "Wishlist",
    icon: <FavoriteBorderIcon />,
  },
  {
    segment: "student/sell",
    title: "Sell",
    icon: <SellIcon />,
  },
  {
    segment: "student/my-listing",
    title: "My Listing",
    icon: <Inventory2Icon />,
  },
  {
    segment: "student/chats",
    title: "Chats",
    icon: <ChatBubbleOutlineIcon />,
  },
  {
    segment: "student/cart",
    title: "Cart",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "student/my-profile",
    title: "My Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "student/logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];
