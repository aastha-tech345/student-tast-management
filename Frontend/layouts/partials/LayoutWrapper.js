"use client";

import { usePathname } from "next/navigation";
import Header from "@layouts/partials/Header";
import Footer from "@layouts/partials/Footer";
import Providers from "@layouts/partials/Providers";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideHeaderFooter =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/dashboard";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Providers>{children}</Providers>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
