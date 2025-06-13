import useMediaQuery from "@/hooks/useMediaQuery";
import SidenavDesktop from "./sidenav-desktop";
import SidenavMobile from "./sidenav-mobile";

// const SidenavDesktop = lazy(() => import("./sidenav-desktop"));
// const SidenavMobile = lazy(() => import("./sidenav-mobile"));

export const Sidenav = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? <SidenavDesktop /> : <SidenavMobile />;
  // return (
  //   <Suspense fallback={<SidenavDesktopShimmer />}>
  //     {isDesktop ? <SidenavDesktop /> : <SidenavMobile />}
  //   </Suspense>
  // );
};
