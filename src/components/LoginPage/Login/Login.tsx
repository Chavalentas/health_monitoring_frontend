import "./Login.css";
import { useState } from "react";
import { PasswordValidationService } from "../../../services/password-validation.service";
import { UsernameValidationService } from "../../../services/username-validation.service";
import { UsersService } from "../../../services/users.service";
import { useNavigate } from "react-router-dom";
import LoginValidationForm from "../LoginValidationForm/LoginValidationForm";
import { UserToken } from "../../../models/user-token.model";
import { ErrorMessage } from "../../../models/error-message.model";
import { LoggingService } from "../../../services/logging.service";

const Login = () => {
  const passwordService: PasswordValidationService =
    new PasswordValidationService();
  const usernameService: UsernameValidationService =
    new UsernameValidationService();
  const loggingService: LoggingService = new LoggingService();
  const usersService: UsersService = new UsersService();
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [wrongUsername, setWrongUsernameError] = useState(false);
  const [wrongPassword, setWrongPasswordError] = useState(false);
  const [wrongRepassword, setWrongRepasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [] = useState("");
  const [] = useState(() => {
    var tokenValue = localStorage.getItem("health_monitoring_user_token");
    usersService
      .verifyToken(tokenValue)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        navigate("/");
      });
  });

  const resetErrorFlags = () => {
    if (wrongUsername || wrongPassword || wrongRepassword) {
      setWrongUsernameError(false);
      setWrongPasswordError(false);
      setWrongRepasswordError(false);
    }
  };

  const resetMessages = () => {
    setErrorMessage("");
    setInfoMessage("");
  };

  const onChangedUsername = (username: string) => {
    resetErrorFlags();
    resetMessages();
    setUsernameInput(username);
  };

  const onChangedPassword = (password: string) => {
    resetErrorFlags();
    resetMessages();
    setPasswordInput(password);
  };

  const onLogin = async () => {
    resetErrorFlags();
    resetMessages();
    let isUsernameValidPromise = usernameService.isUsernameValid(usernameInput);
    let isPasswordValidPromise = passwordService.isPasswordValid(passwordInput);
    let isUsernameValid = await isUsernameValidPromise;
    setWrongUsernameError(!isUsernameValid);
    let isPasswordValid = await isPasswordValidPromise;
    setWrongPasswordError(!isPasswordValid);

    if (!isPasswordValid || !isUsernameValid) {
      return;
    }

    setLoading(true);
    usersService.loginUser(usernameInput, passwordInput).then(
      (userToken: UserToken) => {
        localStorage.setItem("health_monitoring_user_token", userToken.token);
        setInfoMessage("The user was successfully logged in!");
        setLoading(false);
        navigate("/dashboard");
      },
      (err: ErrorMessage) => {
        loggingService.logError(err.message);
        setLoading(false);
        setErrorMessage("The login failed! Try again later!");
      }
    );
  };

  return (
    <div className="login-container login-container-background">
      <LoginValidationForm
        onSubmit={() => onLogin()}
        onChangedPassword={(password) => onChangedPassword(password)}
        onChangedUsername={(username) => onChangedUsername(username)}
        wrongUsername={wrongUsername}
        wrongPassword={wrongPassword}
        infoMessage={infoMessage}
        errorMessage={errorMessage}
        informationText="No account yet? "
        linkText="Register"
        linkUrl="/register"
      />
      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
