import { useNavigate } from "react-router-dom";
import Navigation from "../../Navigation/Navigation";
import "./Profle.css";
import { useRef, useState } from "react";
import { UsersService } from "../../../services/users.service";
import { UserId } from "../../../models/user-id.model";
import { User } from "../../../models/user.model";
import { UsernameValidationService } from "../../../services/username-validation.service";
import { PasswordValidationService } from "../../../services/password-validation.service";
import { ErrorMessage } from "../../../models/error-message.model";
import ProfileValidationForm from "../ProfileValidationForm/ProfileValidationForm";
import { LoggingService } from "../../../services/logging.service";

const Profile = () => {
  const usersService: UsersService = new UsersService();
  const usernameService: UsernameValidationService =
    new UsernameValidationService();
  const passwordService: PasswordValidationService =
    new PasswordValidationService();
  const loggingService: LoggingService = new LoggingService();
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [repasswordInput, setRepasswordInput] = useState("");
  const [wrongUsername, setWrongUsernameError] = useState(false);
  const [wrongPassword, setWrongPasswordError] = useState(false);
  const [wrongRepassword, setWrongRepasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useRef("");

  const [] = useState(() => {
    var tokenValue = localStorage.getItem("health_monitoring_user_token");
    setLoading(true);
    usersService
      .verifyToken(tokenValue)
      .then((id: UserId) => {
        navigate("/profile");
        userId.current = id.id;
        setUserData();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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

  const setUserData = async () => {
    usersService
      .getUser(userId.current)
      .then((user: User) => {
        setUsernameInput(user.username);
      })
      .catch(() => {
        loggingService.logError(
          "The setting of user data in the profile failed!"
        );
      });
  };

  const onLogOut = () => {
    localStorage.removeItem("health_monitoring_user_token");
    navigate("/");
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

  const onUpdateProfile = async () => {
    resetErrorFlags();
    resetMessages();
    let isUsernameValid = await usernameService.isUsernameValid(usernameInput);
    let isUsernameError = !isUsernameValid;
    setWrongUsernameError(isUsernameError);

    if (isUsernameError) {
      return;
    }

    let user = {
      id: userId.current,
      username: usernameInput,
      password: passwordInput
    } as User;

    setLoading(true);
    usersService
      .updateUser(user)
      .then((message) => {
        loggingService.logInfo(message.message);
        setInfoMessage("The user was successfully updated!");
        setUserData();
        setLoading(false);
      })
      .catch((error: ErrorMessage) => {
        setLoading(false);
        loggingService.logError(error.message);
        setErrorMessage(
          "The update of the user failed! Please try again later!"
        );
      });
  };

  const onUpdatePassword = async () => {
    resetErrorFlags();
    resetMessages();
    let isPasswordValidPromise = passwordService.isPasswordValid(passwordInput);
    let doPasswordsMatchPromise = passwordService.doPasswordsMatch(
      passwordInput,
      repasswordInput
    );

    let isPasswordValid = await isPasswordValidPromise;
    setWrongPasswordError(!isPasswordValid);
    let doPasswordsMatch = await doPasswordsMatchPromise;
    setWrongRepasswordError(!doPasswordsMatch);

    if (!isPasswordValid || !doPasswordsMatch) {
      return;
    }

    setLoading(true);
    usersService
      .updatePassword(userId.current, passwordInput)
      .then((message) => {
        setLoading(false);
        loggingService.logInfo(message.message);
        setInfoMessage("The password was successfully updated!");
      })
      .catch((error: ErrorMessage) => {
        setLoading(false);
        loggingService.logError(error.message);
        setErrorMessage(
          "The update of the user failed! Please try again later!"
        );
      });
  };

  const onDeleteProfile = () => {
    resetErrorFlags();
    resetMessages();

    usersService
      .deleteUser(userId.current)
      .then((message) => {
        loggingService.logInfo(message.message);
        localStorage.removeItem("health_monitoring_user_token");
        navigate("/");
      })
      .catch((error: ErrorMessage) => {
        loggingService.logError(error.message);
        setErrorMessage("The account could not be deleted! Try again later!");
      });
  };

  return (
    <div>
      <Navigation
        sidebarTitle="Profile"
        navigationTitle="Health monitoring"
        homeNavigation="Home"
        profileNavigation="Profile"
        impressumNavigation="Impressum"
        homeNavigationLink="/dashboard"
        impressumNavigationLink="/impressum"
        profileNavigationLink="#"
        onLogOut={() => onLogOut()}
      />
      <div className="profile-container profile-background">
        <ProfileValidationForm
          onDeleteProfile={() => onDeleteProfile()}
          onChangedPassword={(password) => onChangedPassword(password)}
          onChangedRepassword={(repassword) => onChangedRepassword(repassword)}
          onChangedUsername={(username) => onChangedUsername(username)}
          onUpdatePassword={() => onUpdatePassword()}
          onUpdateProfile={() => onUpdateProfile()}
          wrongUsername={wrongUsername}
          wrongPassword={wrongPassword}
          wrongRepassword={wrongRepassword}
          infoMessage={infoMessage}
          errorMessage={errorMessage}
          userNameInput={usernameInput}
        />
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
