import { Provider } from "react-redux";
import { store, persistor } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./protectedRoute";
import FontProvider from "./fontProvider";
import { AlertNotificationRoot } from "react-native-alert-notification";
import "@lang";

export default function RootProvider(props) {
  return (
    <FontProvider>
      <AlertNotificationRoot>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ProtectedRoute>{props.children}</ProtectedRoute>
          </PersistGate>
        </Provider>
      </AlertNotificationRoot>
    </FontProvider>
  );
}
