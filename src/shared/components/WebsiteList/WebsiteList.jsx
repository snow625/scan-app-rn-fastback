import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import UnitWebsite from "./UnitWebsite";

const WebsiteList = (props) => {
    const { loading, items } = props;
    return (
        <View style={{ flexGrow: 1, marginHorizontal: 10 }}>
            {loading && <ActivityIndicator animating={true} color="#556278" />}
            <FlashList
                data={items}
                renderItem={({ item }) => <UnitWebsite item={item} />}
                estimatedItemSize={200}
                keyExtractor={({ url }) => url}
            />
        </View>
    );
};
WebsiteList.defaultProps = {
    loading: false,
    items: [],
};

export default WebsiteList;
