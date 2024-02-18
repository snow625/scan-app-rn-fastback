import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState, useEffect } from "react";

import { getAuthStore } from "@redux/auth/authSelector";
import { userLogin, getUser } from "@redux/auth/authOperations";
import { Button, TextField, StartedLoader } from "@components";
import { FormLayoutAuth } from "@layouts";

import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onLogin = useCallback(
    (loginForm) => {
      const { email, password } = loginForm;
      dispatch(userLogin({ email: email.trim(), password }));
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (value, stateName) => {
      setState((prev) => ({ ...prev, [stateName]: value }));
    },
    [setState]
  );

  const { loading, token } = useSelector(getAuthStore);
  const { email, password } = state;

  return (
    <>
      {loading && token && <StartedLoader />}

      {!token && (
        <FormLayoutAuth>
          <TextField
            disabled={loading}
            value={email}
            error={false}
            mode="flat"
            stateName="email"
            label={t("Auth.Login.email_input_label")}
            onChange={handleChange}
          />
          <TextField
            disabled={loading}
            value={password}
            mode="flat"
            secureTextEntry
            stateName="password"
            label={t("Auth.Login.password_input_label")}
            onChange={handleChange}
          />

          <Button
            mode={loading ? `text` : "contained"}
            loading={loading}
            disabled={loading || !(password && email)}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              borderColor: "white",
              fontSize: 25,
              marginTop: 20,
              zIndex: 10,
            }}
            text={t("Auth.Login.button_text")}
            onPress={() => onLogin(state)}
            labelStyle={{ fontSize: 18, padding: 3, paddingHorizontal: 55 }}
          />
        </FormLayoutAuth>
      )}
    </>
  );
};

export default Login;
