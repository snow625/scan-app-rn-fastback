import { useIsAuth } from "@hooks";
import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import { Platform } from "react-native";

const replaceFunction = (path) => {
  if (Platform.OS === "ios") {
    setTimeout(() => {
      router.replace(path);
    }, 1);
    return;
  }
  setImmediate(() => {
    router.replace(path);
  });
};

export default function ProtectedRoute(props) {
  const isAuth = useIsAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuth && !inAuthGroup) {
      replaceFunction("/(auth)");
      return;
    }
    if (isAuth && inAuthGroup) {
      replaceFunction("/(main)");
      return;
    }
  }, [isAuth, segments]);

  return <>{props.children}</>;
}
