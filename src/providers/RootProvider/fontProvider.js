import { useFonts } from "expo-font";

export default function FontProvider(props) {
  const [loaded] = useFonts({
    mainRegular: require("@assets/fonts/Inter-Regular.ttf"),
    mainBold: require("@assets/fonts/Inter-Bold.ttf"),
    mainExtraBold: require("@assets/fonts/Inter-ExtraBold.ttf"),
    mainSemiBold: require("@assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <>{props.children}</>;
}
