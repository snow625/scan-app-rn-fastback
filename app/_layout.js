import { Slot } from "expo-router";
import { RootProvider } from "@providers";

export default Layout = () => {
  return (
    <RootProvider>
      <Slot />
    </RootProvider>
  );
};
