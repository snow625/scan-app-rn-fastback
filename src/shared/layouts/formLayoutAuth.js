import { SafeAreaView, KeyboardAvoidingView, Platform, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const FormLayoutAuth = ({ children, withLogo }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#55628099" }}
      >
        <View>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View>
              {withLogo && (
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                  <Ionicons name="md-logo-react" size={110} color="#556278" />
                </View>
              )}

              <View style={{ gap: 20, padding: 20 }}>{children}</View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
FormLayoutAuth.defaultProps = {
  withLogo: true,
};

export default FormLayoutAuth;
