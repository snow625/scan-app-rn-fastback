import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState, useRef } from "react";
import { useSearchParams } from "expo-router";
import { WebView as WebViewLibrary } from "react-native-webview";
import { addWebSidesResult } from "@redux/webSites/webSitesReducer";
import {
    Button,
    Dialog,
    Portal,
    PaperProvider,
    Text,
    ProgressBar,
    MD3Colors,
} from "react-native-paper";
import { getAllResult } from "@redux/webSites/webSitesSelector";
import { makeAlert } from "@utils";

const WebView = () => {
    const { name, url: innerUrl } = useSearchParams();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const visited = useSelector(getAllResult);
    const dispatch = useDispatch();
    const refWeb = useRef(null);

    const startScan = useCallback(() => {
        refWeb.current.injectJavaScript(`(function() {
            window.ReactNativeWebView.postMessage(document.documentElement.innerHTML);
        })();`);
    }, [refWeb.current]);
    const onLoadEnd = useCallback(
        (url) => {
            if (visited[name]) return;

            if (url === innerUrl) {
                startScan();
            } else {
                setVisible(true);
            }
        },
        [visited]
    );

    const loadingP = useCallback(
        (event) => {
            const { progress, url } = event.nativeEvent;
            if (loadingProgress === progress) return;
            setLoadingProgress(progress);
            progress === 1 && onLoadEnd(url);
        },
        [setLoadingProgress, loadingProgress]
    );

    const onMessage = useCallback(
        (event) => {
            try {
                const { data, url } = event.nativeEvent;
                const res = data.match(/(?<=>)©.*?(?=<\/)/g)?.[0] || false;
                if (res) {
                    dispatch(
                        addWebSidesResult({
                            name,
                            url,
                            innerUrl,
                            date: Date.now(),
                            isCorrectRout: innerUrl === url,
                            copyrightInformationScanResult: res,
                        })
                    );
                    makeAlert("Scan Complete", "success");
                } else {
                    makeAlert("Scan Error", "error");
                }
            } catch (error) {
                makeAlert("Scan Error", "error");
            }
        },
        [name, innerUrl, dispatch]
    );

    return (
        <>
            <PaperProvider>
                <View>
                    <Portal>
                        {loadingProgress !== 1 && (
                            <ProgressBar
                                progress={loadingProgress}
                                color={MD3Colors.error50}
                            />
                        )}

                        <WebViewLibrary
                            useWebView2={true}
                            ref={refWeb}
                            source={{ uri: innerUrl }}
                            style={{ flex: 1 }}
                            onMessage={onMessage}
                            onLoadProgress={loadingP}
                        />

                        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">
                                    Current url is not {innerUrl}
                                </Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => setVisible(false)}>Skip</Button>
                                <Button
                                    onPress={() => {
                                        setVisible(false);
                                        startScan();
                                    }}
                                >
                                    Start Scan
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </PaperProvider>
        </>
    );
};

export default WebView;
