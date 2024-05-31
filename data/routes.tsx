import { FaMapLocationDot } from "react-icons/fa6";
import { FaCar, FaRoad, FaChartPie, FaHistory } from "react-icons/fa";
import { FaPersonBiking } from "react-icons/fa6";

const routes = [
  {
    name: "Đơn hàng",
    layout: "/dashboard",
    path: "tasks",
    icon: <FaMapLocationDot className="h-5 w-5 ml-0.5" />,
  },
  {
    name: "Lịch sử",
    layout: "/dashboard",
    path: "history",
    icon: <FaHistory className="h-5 w-5 ml-0.5" />,
  },
];

export default routes;
