import { Link, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, StatusBar } from "react-native";
import { headerOptions, colors } from "@styles";
import { getAuthStore } from "@redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default AuthLayout = () => {
  const { token, loading } = useSelector(getAuthStore);
  const { t } = useTranslation();
  const screenOptions = (loading) => ({
    headerRight: () => (
      <Link disabled={loading} href="/(auth)/register">
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontWeight: "bold",
              // backgroundColor: "red",
            }}
          >
            {t("Auth.Login.toRegisterScreen")}
          </Text>
          <AntDesign name="arrowright" size={18} color="white" />
        </View>
      </Link>
    ),
  });

  return (
    <>
      <Stack screenOptions={headerOptions}>
        <Stack.Screen
          name="index"
          options={{
            title: t("Auth.Login.headerTitle"),
            ...screenOptions(loading),
            headerShown: token ? false : true,
          }}
        />
        <Stack.Screen name="register" options={{ title: t("Auth.Register.headerBackButton") }} />
      </Stack>
      <StatusBar barStyle="light-content" />
    </>
  );
};
