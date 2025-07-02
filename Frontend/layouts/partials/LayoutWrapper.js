"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Header from "@layouts/partials/Header";
import Footer from "@layouts/partials/Footer";
import Providers from "@layouts/partials/Providers";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const userToken = Cookies.get("authToken");

  if (
    typeof window !== "undefined" &&
    userToken &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    router.push("/dashboard");
    return null;
  }

  const hideHeaderFooter =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/dashboard";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = Cookies.get("authToken");
    console.log("tokentoken", token);
  }, []);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Providers>{children}</Providers>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
