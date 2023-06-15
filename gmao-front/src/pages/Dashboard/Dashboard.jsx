import { useSelector } from "react-redux";
const Dashboard = () => {
  const { userType, mail } = useSelector((state) => state.user);
  return <div>{mail + " " + userType}</div>;
};

export default Dashboard;
