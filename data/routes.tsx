import { FaHeadset, FaHistory } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

const routes = [
  {
    name: "Đơn hàng",
    layout: "/dashboard",
    path: "orders",
    icon: <FiPackage className="h-5 w-5" />,
  },
  {
    name: "Lịch sử đơn hàng",
    layout: "/dashboard",
    path: "history",
    icon: <FaHistory className="h-5 w-5" />,
  },
  {
    name: "Hỗ trợ",
    layout: "/dashboard",
    path: "help",
    icon: <FaHeadset className="h-5 w-5" />,
  },
];

export default routes;
