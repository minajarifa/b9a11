import useAuth from "../../hook/useAuth";
import Banner from "./Header/Banner";
import Popular from "./Popular/Popular";
import Profile from "./Profile/Profile";





const Home = () => {
  const {user}=useAuth();
  return (
    <div>
    <Banner/>
    <Popular/>
    <Profile/>
    </div>
  );
};

export default Home;
