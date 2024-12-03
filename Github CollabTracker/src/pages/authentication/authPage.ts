import { Ref, ref } from "vue";
import { Authentication } from "../../authorization/authentication";
import { AuthenticationError } from "../../authorization/authenticationError";
import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { VerificationData } from "../../authorization/verificationData";
import { AuthErrorType, errorToEnum } from "./authErrorTypes";

export abstract class AuthPage {
  private static verificationData: VerificationData;
  private static timeout: number = 5500; // 5.5 seconds
  private static errorText: Ref<string, string> = ref("");
  private static code: Ref<string, string> = ref("");

  public static async startAuth() {
    AuthPage.verificationData = await Authentication.startAuthentication();
    this.code.value = this.verificationData.getUserCode();
  }

  public static openBrowser() {
    open(AuthPage.verificationData.getVerificationUri());
  }

  public static async finishAuth(): Promise<boolean> {
    try {
      const authenticationData = await Authentication.finishAuthentication(AuthPage.verificationData);
      GitTokenCookie.setGitTokenCookie(authenticationData);
      GitRefreshCookie.setRefreshCookie(authenticationData);
      return true;
    } catch(e) {
      if(e instanceof AuthenticationError) {
        AuthPage.authError(e as AuthenticationError);
      } else {
        console.error(e);
      }
      return false;
    }
  }

  private static authError(error: AuthenticationError) {
    const errorEnum = errorToEnum(error.message);
    switch (errorEnum) {
      case AuthErrorType.authorization_pending:
        this.errorText.value = "Please finish the GitHub Authentication process."
        break;
      case AuthErrorType.slow_down:
        const newInterval = error.getInterval();
        if(newInterval) {
          AuthPage.timeout = (newInterval * 1000) + 500;   // New interval + 0.5 seconds
        }
        this.errorText.value = "Please don't spam the button.";
        console.log(this.timeout);
        break;
      case AuthErrorType.expired_token:
        this.startAuth();
        this.errorText.value = "You took to long to authenticate yourself, please try again with the new code.";
        break;
      case AuthErrorType.access_denied:
        this.startAuth();
        this.errorText.value = "Seems like you cancelled the authentication. Please restart the authentication process."
        break;
      default:
        this.startAuth();
        this.errorText.value = "Seems like something went wrong during the authentication process. Please start again."
        console.error(error);   // dev only?
        break;
    }
  }

  public static getCode(): Ref<string, string> {
    return AuthPage.code;
  }

  public static getTimeout(): number {
    return AuthPage.timeout;
  }

  public static getErrorText(): Ref<string, string> {
    return AuthPage.errorText;
  }

}


