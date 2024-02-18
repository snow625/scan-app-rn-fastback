import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";

import { WebSiteList } from "@components";
import { getUser } from "@redux/auth/authSelector";
import { moc } from "@api";

const MainScreen = () => {
    const { email: user_id } = useSelector(getUser);
    const [state, setState] = useState({
        loading: false,
        data: [],
    });

    const getItems = useCallback(async () => {
        setState((p) => ({ ...p, loading: true }));
        const res = await moc.getWebSites();
        setState((p) => ({ ...p, loading: false, data: res ? res : [] }));
    }, [setState]);

    useEffect(() => {
        getItems();
    }, []);

    const { loading, data } = state;
    return (
        <View style={{ flex: 1 }}>
            <Text
                style={{ marginVertical: 10, marginRight: "auto", marginLeft: "auto" }}
                variant="titleMedium"
            >
                Hello, {user_id}
            </Text>
            <WebSiteList loading={loading} items={data} />
        </View>
    );
};

export default MainScreen;
