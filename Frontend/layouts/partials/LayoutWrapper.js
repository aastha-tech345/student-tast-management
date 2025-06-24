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

  const hideHeaderFooter =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/dashboard";

  useEffect(() => {
    const userToken = Cookies.get("authToken");

    if (!userToken && pathname === "/dashboard") {
      router.push("/login");
    }

    if (userToken && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard");
    }
  }, [pathname, router]);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Providers>{children}</Providers>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
