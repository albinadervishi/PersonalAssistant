import dynamic from "next/dynamic";

const Wallet = dynamic(() => import("../components/Wallet"), { ssr: false });
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const PrivateRoute = dynamic(() => import("../components/privateRoute"), {
  ssr: false,
});

export default function Page() {
  return (
    <PrivateRoute>
      <Navbar />
      <Wallet />
    </PrivateRoute>
  );
}
