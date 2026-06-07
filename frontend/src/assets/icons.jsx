import { GoHome } from "react-icons/go";
import { HiOutlineUser, HiOutlineHeart } from "react-icons/hi";
import { MdOutlineCardTravel } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineGoogle, AiFillFacebook } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaHourglassHalf } from "react-icons/fa";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { GiPassport } from "react-icons/gi";
import { IoMdCheckbox } from "react-icons/io";
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
  CheckCircle: FaCheckCircle,
  Eye: FaEye,
  EyeSlash: FaEyeSlash,
  Email_fill: BsFillEnvelopeFill,
  HourglassHalf: FaHourglassHalf,
  User: CiUser,
  Lock: CiLock,
  Passport: GiPassport,
  Checkbox: IoMdCheckbox,
  Email: CiMail,
  // Add more icons as needed for the tourist/guide platform
};

export default Icons;
