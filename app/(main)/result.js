import { View } from "react-native";
import { useSelector } from "react-redux";
import { useSearchParams, router } from "expo-router";
import { useDispatch } from "react-redux";

import { removeWebSidesResult } from "@redux/webSites/webSitesReducer";
import { makeAlert } from "@utils";
import { getAllResult } from "@redux/webSites/webSitesSelector";
import { ResultWebsiteUnit } from "@components";

const Result = () => {
    const { name } = useSearchParams();
    const dispatch = useDispatch();
    const elements = useSelector(getAllResult);

    const handleDelete = (name) => {
        dispatch(removeWebSidesResult({ name }));
        makeAlert(`${name} Deleted`, "success");
        router.back();
    };

    return (
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            {elements[name] && (
                <ResultWebsiteUnit onDelete={handleDelete} infoData={elements[name]} />
            )}
        </View>
    );
};

export default Result;
