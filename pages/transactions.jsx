import dynamic from "next/dynamic";

const Transactions = dynamic(() => import("../components/Transactions"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const PrivateRoute = dynamic(() => import("../components/privateRoute"), {
  ssr: false,
});
export default function Page() {
  return (
    <PrivateRoute>
      <Navbar />
      <Transactions />
    </PrivateRoute>
  );
}
