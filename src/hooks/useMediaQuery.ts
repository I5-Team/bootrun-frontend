import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

const useMediaQuery = () => {
  const theme = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { devices } = theme;
    const desktopQuery = window.matchMedia(devices.desktop);
    const laptopQuery = window.matchMedia(devices.laptop);
    const tabletQuery = window.matchMedia(devices.tablet);
    const mobileQuery = window.matchMedia(devices.mobile);

    const handleChange = () => {
      setIsDesktop(desktopQuery.matches);
      setIsLaptop(laptopQuery.matches);
      setIsTablet(tabletQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    handleChange();

    desktopQuery.addEventListener("change", handleChange);
    laptopQuery.addEventListener("change", handleChange);
    tabletQuery.addEventListener("change", handleChange);
    mobileQuery.addEventListener("change", handleChange);

    return () => {
      desktopQuery.removeEventListener("change", handleChange);
      laptopQuery.removeEventListener("change", handleChange);
      tabletQuery.removeEventListener("change", handleChange);
      mobileQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useMediaQuery;