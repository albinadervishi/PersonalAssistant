import React, { useEffect } from "react";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    //check if userId is not available
    if (!userId) {
      //redirect to login page
      router.push("/login");
    }
  }, [router, userId]);

  //render children if userId exists
  return userId ? children : null;
};

export default PrivateRoute;
