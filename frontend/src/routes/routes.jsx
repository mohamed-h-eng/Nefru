import Welcome from '../pages/Auth/Welcome/Welcome'
import Login from '../pages/Auth/Login/Login'
import Signup from '../pages/Auth/Signup/Signup'
import Home from '../pages/User/Home/Home'
import Trips from '../pages/User/Trips/Trips'
import Saved from '../pages/User/Saved/Saved'
import Profile from '../pages/User/Profile/Profile'
import Book from '../pages/User/Trips/Book/Book'
import Info from '../pages/User/Trips/Info/Info'
import Status from '../pages/User/Trips/Book/Status/Status'
import Guide from '../pages/User/Trips/Guide/Guide'

export const ROUTES = [
  // Public/Auth Routes
  { path: "/", element: Welcome, name: "Welcome" },
  { path: "/auth/login", element: Login, name: "Login" },
  { path: "/auth/signup", element: Signup, name: "Signup" },

  // User Routes
  { path: "/user/home", element: Home, name: "User Home" },
  { path: "/user/trips", element: Trips, name: "My Trips" },
  { path: "/user/trips/info", element: Info, name: "Trip Info" },
  { path: "/user/trips/info/book", element: Book, name: "Book Trip" },
  { path: "/user/trips/info/book/status", element: Status, name: "Booking Status" },
  { path: "/user/trips/info/guide", element: Guide, name: "Tour Guide" },
  { path: "/user/saved", element: Saved, name: "Saved Trips" },
  { path: "/user/profile", element: Profile, name: "Profile" },
];
