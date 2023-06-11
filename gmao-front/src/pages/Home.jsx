import { useSelector } from "react-redux";
const Home = () => {
  const { userType, mail } = useSelector((state) => state.user);
  return <div>{mail + " " + userType}</div>;
};

export default Home;
