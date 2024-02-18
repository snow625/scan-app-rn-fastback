import { ALERT_TYPE, Toast, Dialog } from "react-native-alert-notification";

const makeAlert = (msg, type = "warring") => {
    let alertType;
    switch (type) {
        case "warring":
            alertType = ALERT_TYPE.WARNING;
            break;
        case "success":
            alertType = ALERT_TYPE.SUCCESS;
            break;
        case "error":
            alertType = ALERT_TYPE.DANGER;
            break;

        default:
            alertType = ALERT_TYPE.SUCCESS;
            break;
    }

    Toast.show({
        autoClose: 4000,
        // type: code === "500" ? ALERT_TYPE.DANGER : ALERT_TYPE.WARNING,
        type: alertType,
        // title: `Code: ${code}`,
        textBody: msg,
    });
};

// export const showError = (msg = "Server Error", code = "500") => {
//   Toast.show({
//     autoClose: 700,
//     type: code === "500" ? ALERT_TYPE.DANGER : ALERT_TYPE.WARNING,
//     title: `Code: ${code}`,
//     textBody: msg,
//   });
// };

// export const showSuccessMessage = (msg = "Success") => {
//   Dialog.show({
//     type: ALERT_TYPE.SUCCESS,
//     title: "Success",
//     textBody: msg,
//     button: "close",
//   });
// };

export default makeAlert;
