import Navbar from "../components/Navbar";
import Kanban from "@/components/Kanban";
import PrivateRoute from "../components/privateRoute";
export default function Page() {
  return (
    <PrivateRoute>
      <Navbar />
      <Kanban />
    </PrivateRoute>
  );
}