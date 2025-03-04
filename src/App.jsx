import HomePage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SelectionSignUpPage from "./pages/SelectionSignUpPage";
import AdoptionProcess from "./pages/AdoptionProcessPage";
import PersonalForm from "./components/AdoptionProcess/PersonalForm";
import Questionare from "./components/AdoptionProcess/QuestionareForm";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import useFCMNotifications from "./hooks/useFCMNotifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Home Page Routes
import Feed from "./components/Feed/Feed";
import Find from "./components/Find/Find";
import List from "./components/ListAPet/List";
import Explore from "./components/Explore/Explore";
import PostLostAPet from "./components/Find/PostLostPet";
import EventFeed from "./components/EventFeed/Event";

//Shelter Profile Routes
import ShelterProfile from "./components/Profile/ShelterProfile";
import AdopterProfile from "./components/Profile/AdopterProfile";
import Adoptables from "./components/Profile/ProfileContent/Adoptables/Adoptables";
import Events from "./components/Profile/ProfileContent/Events/Events";
import Stories from "./components/Profile/ProfileContent/Story/Stories";
import FullAdopterPage from "./components/Profile/ProfileContent/Adoptables/FullAdopterModal";
import Adopteds from "./components/Profile/ProfileContent/SuccessFulAdoption/Adopteds";

//Adopter Profile Routes
import Overview from "./components/Profile/AdopterProfileContent/Overview/Overview";
import Adopted from "./components/Profile/AdopterProfileContent/Adopted/Adopted";
import Comment from "./components/Profile/AdopterProfileContent/Comment/Comment";
import Like from "./components/Profile/AdopterProfileContent/Like/Like";
import Lost from "./components/Profile/AdopterProfileContent/Lost/Lost";

import AdopterProfilePreview from "./components/ProfilePreview/AdopterProfile";

//Adopter Preview
import UserProfilePreview from "./components/ProfilePreview/UserProfilePreview";
import AdoptedPreview from "./components/ProfilePreview/AdopterProfileContent/Adopted/Adopted";
import LostPreview from "./components/ProfilePreview/AdopterProfileContent/Lost/Lost";
import CommentPreview from "./components/ProfilePreview/AdopterProfileContent/Comment/Comment";
import LikePreview from "./components/ProfilePreview/AdopterProfileContent/Like/Like";
import OverViewPreview from "./components/ProfilePreview/AdopterProfileContent/Overview/Overview";

//Shelter Preview
import AdoptablesPreview from "./components/ProfilePreview/ProfileContent/Adoptables/Adoptables";
import EventPreview from "./components/ProfilePreview/ProfileContent/Events/Events";
import StoryPreview from "./components/ProfilePreview/ProfileContent/Story/Stories";
import AdoptedsPreview from "./components/ProfilePreview/ProfileContent/SuccessFulAdoption/Adopteds";

import ShelterProcess from "./pages/ShelterProcessPage";

//Protected Routes

import ProtectedRoute from "./ProtectedRoute";

//Store routes
import Store from "./components/Store/Store";
import StoreOverview from "./components/Store/StoreContent/Overview/Overview";
import Clothes from "./components/Store/StoreContent/Clothes/Clothes";
import PetFood from "./components/Store/StoreContent/PetFood/PetFood";
import Toys from "./components/Store/StoreContent/Toys/Toys";
import Accessories from "./components/Store/StoreContent/Accessories/Accessories";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Motion Variants (Animations)
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ✅ Motion Wrapper for Routes
const MotionWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Public Routes */}
      <Route index element={<HomePage />} />
      <Route path="/select_signup" element={<SelectionSignUpPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aprocess" element={<AdoptionProcess />} />
      <Route path="/personal" element={<PersonalForm />} />
      <Route path="/questionnaire" element={<Questionare />} />
      <Route path="/shelter-process" element={<ShelterProcess />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Feed />} />
        <Route path="profile" element={<ShelterProfile />}>
          <Route index element={<Navigate to="adoptables" />} />
          <Route path="adoptables" element={<Adoptables />} />
          <Route path="event" element={<Events />} />
          <Route path="story" element={<Stories />} />
          <Route path="successful-adoptions" element={<Adopteds />} />
        </Route>

        {/* 🔹 Main Profile Preview Route (Shelter OR Adopter) */}
        <Route path="profile/:userId" element={<UserProfilePreview />}>
          {/* Adopter */}
          <Route path="overview" element={<OverViewPreview />} />
          <Route path="adopted" element={<AdoptedPreview />} />
          <Route path="lost" element={<LostPreview />} />
          <Route path="comment" element={<CommentPreview />} />
          <Route path="like" element={<LikePreview />} />
          <Route path="successful-adoptions" element={<AdoptedsPreview />} />

          {/* Shelter */}
          <Route path="adoptables" element={<AdoptablesPreview />} />
          <Route path="event" element={<EventPreview />} />
          <Route path="story" element={<StoryPreview />} />
        </Route>

        <Route path="adopter-profile" element={<AdopterProfile />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route path="adopted" element={<Adopted />} />
          <Route path="lost" element={<Lost />} />
          <Route path="comment" element={<Comment />} />
          <Route path="like" element={<Like />} />
        </Route>

        <Route path="store" element={<Store />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<StoreOverview />} />
          <Route path="pet-food" element={<PetFood />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="toys" element={<Toys />} />
          <Route path="clothes" element={<Clothes />} />
        </Route>

        <Route path="find" element={<Find />} />
        <Route path="listAPet" element={<List />} />
        <Route path="lostAPet" element={<PostLostAPet />} />
        <Route path="explore" element={<Explore />} />
        <Route path="event" element={<EventFeed />} />
        <Route path="full-adopter" element={<FullAdopterPage />} />
      </Route>
    </Route>
  )
);

const App = () => {
  useFCMNotifications(); // ✅ Call the hook here to listen for foreground notifications
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer /> {/* ✅ Ensure ToastContainer is included */}
    </>
  );
};

export default App;
