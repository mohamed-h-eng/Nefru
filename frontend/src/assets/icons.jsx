import { GoHome } from "react-icons/go";
import { HiOutlineUser, HiOutlineHeart } from "react-icons/hi";
import { MdOutlineCardTravel } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineGoogle, AiFillFacebook } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
/**
 * Centralized Icon Registry
 * Use these variables throughout the app for consistency.
 */
const Icons = {
  Home: GoHome,
  Profile: HiOutlineUser,
  Trips: MdOutlineCardTravel,
  Saved: HiOutlineHeart,
  ArrowRight: AiOutlineArrowRight,
  Google: AiOutlineGoogle,
  Facebook: AiFillFacebook,
  Twitter: RiTwitterXFill,
  
  // Add more icons as needed for the tourist/guide platform
};

export default Icons;
