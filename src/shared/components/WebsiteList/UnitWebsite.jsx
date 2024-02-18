import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAllResult } from "@redux/webSites/webSitesSelector";
import { useSelector } from "react-redux";
import { Link } from "expo-router";

const UnitWebsite = (props) => {
    const { item } = props;
    const isInStore = useSelector(getAllResult)[item.name];
    return (
        <Card style={{ marginBottom: 20 }}>
            <Card.Content
                style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
                <View style={s.linkWrapper}>
                    <Link
                        style={s.linkText}
                        href={{
                            pathname: `/${item.name}`,
                            params: item,
                        }}
                    >
                        {item.name}
                    </Link>
                </View>

                {isInStore && (
                    <View style={s.linkWrapper}>
                        <Link
                            style={s.linkText}
                            href={{
                                pathname: `/result`,
                                params: item,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="copyright"
                                size={24}
                                color="white"
                            />
                        </Link>
                    </View>
                )}
            </Card.Content>
        </Card>
    );
};
UnitWebsite.defaultProps = {};
export default memo(UnitWebsite);

const s = StyleSheet.create({
    mainWrapper: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    linkWrapper: {
        backgroundColor: "#556278",
        padding: 5,
        borderRadius: 10,
    },
    linkText: {
        fontSize: 20,
        color: "white",
    },
});
