import { useCallback } from "react";
import { Stack, Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Feather, AntDesign } from "@expo/vector-icons";
import { StatusBar, Pressable } from "react-native";
import { userLogOut } from "@redux/auth/authOperations";
import { getAllResult } from "@redux/webSites/webSitesSelector";
import { headerOptions } from "@styles";

export default HomeLayout = () => {
    const elements = useSelector(getAllResult);
    const dispatch = useDispatch();

    const headerMainScreenRight = useCallback(() => {
        return (
            <Pressable
                onPress={() => {
                    dispatch(userLogOut());
                }}
                style={{ marginRight: 10 }}
            >
                <Feather name="log-out" size={28} color="white" />
            </Pressable>
        );
    }, [dispatch]);

    const webViewScreenRight = useCallback(
        (name) => {
            const ready = elements[name];
            return (
                <Link
                    disabled={!ready}
                    style={{
                        marginRight: 10,
                        fontSize: 25,
                        fontWeight: "600",
                        alignItems: "baseline",
                        color: ready ? "white" : "grey",
                    }}
                    href={{
                        pathname: `/result`,
                        params: { name },
                    }}
                >
                    Result
                    <AntDesign
                        name="arrowright"
                        size={24}
                        color={ready ? "white" : "grey"}
                    />
                </Link>
            );
        },
        [elements]
    );

    return (
        <>
            <Stack screenOptions={headerOptions}>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: true,
                        title: "Main Screen",
                        headerRight: headerMainScreenRight,
                    }}
                />
                <Stack.Screen
                    name="result"
                    options={{
                        headerShown: true,
                        title: "Results",
                        presentation: "modal",
                    }}
                />
                <Stack.Screen
                    name="[webView]"
                    options={({ route }) => ({
                        title: route.params.name,
                        presentation: "modal",
                        headerShown: true,
                        headerRight: () => webViewScreenRight(route.params.name),
                    })}
                />
            </Stack>
            <StatusBar barStyle="light-content" />
        </>
    );
};
