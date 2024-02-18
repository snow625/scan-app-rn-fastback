import { memo } from "react";
import { Card, Text } from "react-native-paper";
import Button from "./Button";

const ResultWebsiteUnit = (props) => {
    const { onDelete, infoData } = props;
    const { copyrightInformationScanResult, date, innerUrl, isCorrectRout, name, url } =
        infoData;

    const createdTime = new Date(date).toLocaleTimeString();
    const createdDate = new Date(date).toLocaleDateString();

    return (
        <Card>
            <Card.Title title={name} />
            <Card.Content>
                {!isCorrectRout && (
                    <Text
                        variant="titleLarge"
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            marginLeft: "auto",
                            marginRight: "auto",
                            padding: 2,
                            borderRadius: 5,
                        }}
                    >
                        Another URL has been checked
                    </Text>
                )}
                <Text variant="bodyMedium">Scanned: {url}</Text>
                <Text variant="bodyMedium">
                    Last update: {createdTime} {createdDate}
                </Text>

                <Text variant="bodyMedium">{copyrightInformationScanResult}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => onDelete(name)} text={"Delete"} />
            </Card.Actions>
        </Card>
    );
};
ResultWebsiteUnit.defaultProps = {
    onDelete: () => {},
};
export default memo(ResultWebsiteUnit);
