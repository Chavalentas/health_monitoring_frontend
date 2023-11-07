import "./Register.css";
import { useState } from "react";
import { PasswordValidationService } from "../../../services/password-validation.service";
import { UsernameValidationService } from "../../../services/username-validation.service";
import { UsersService } from "../../../services/users.service";
import RegisterValidationForm from "../RegisterValidationForm/RegisterValidationForm";
import { ErrorMessage } from "../../../models/error-message.model";
import { SuccessMessage } from "../../../models/success-message.model";
import { LoggingService } from "../../../services/logging.service";

const Register = () => {
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
  const [repasswordInput, setRepasswordInput] = useState("");
  const [wrongUsername, setWrongUsernameError] = useState(false);
  const [wrongPassword, setWrongPasswordError] = useState(false);
  const [wrongRepassword, setWrongRepasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onChangedRepassword = (repassword: string) => {
    resetErrorFlags();
    resetMessages();
    setRepasswordInput(repassword);
  };

  const onRegister = async () => {
    resetErrorFlags();
    resetMessages();
    let isUsernameValidPromise = usernameService.isUsernameValid(usernameInput);
    let isPasswordValidPromise = passwordService.isPasswordValid(passwordInput);
    let isRepasswordValidPromise = passwordService.doPasswordsMatch(
      passwordInput,
      repasswordInput
    );

    let isUsernameValid = await isUsernameValidPromise;
    setWrongUsernameError(!isUsernameValid);
    let isPasswordValid = await isPasswordValidPromise;
    setWrongPasswordError(!isPasswordValid);
    let isRepasswordValid = await isRepasswordValidPromise;
    setWrongRepasswordError(!isRepasswordValid);

    if (!isUsernameValid || !isPasswordValid || !isRepasswordValid) {
      return;
    }

    setLoading(true);
    usersService.registerUser(usernameInput, passwordInput).then(
      (successMessage: SuccessMessage) => {
        setLoading(false);
        loggingService.logInfo(successMessage.message);
        setInfoMessage("The registration was successful!");
      },
      (err: ErrorMessage) => {
        setLoading(false);
        loggingService.logError(err.message);
        setErrorMessage("The registration failed! Please try again later!");
      }
    );
  };

  return (
    <div className="register-container register-container-background">
      <RegisterValidationForm
        onSubmit={() => onRegister()}
        onChangedPassword={(password) => onChangedPassword(password)}
        onChangedRepassword={(repassword) => onChangedRepassword(repassword)}
        onChangedUsername={(username) => onChangedUsername(username)}
        wrongUsername={wrongUsername}
        wrongPassword={wrongPassword}
        wrongRepassword={wrongRepassword}
        infoMessage={infoMessage}
        errorMessage={errorMessage}
        informationText="Already registered? "
        linkText="Login"
        linkUrl="/"
      />
      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};

export default Register;
