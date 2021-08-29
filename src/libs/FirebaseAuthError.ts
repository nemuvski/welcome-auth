import { AuthError, AuthErrorCodes } from 'firebase/auth';

/**
 * FirebaseAuth関連のErrorクラス
 */
export class FirebaseAuthError extends Error {
  /**
   * コンストラクタ
   *
   * @param error Errorオブジェクト
   */
  constructor(error: AuthError) {
    let message;

    // 一部のエラーコードについて、日本語のメッセージを用意する
    switch (error.code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        message = '入力されたメールアドレスのアカウントがすでに存在します。';
        break;

      case AuthErrorCodes.USER_DELETED:
        message = '入力されたメールアドレスのアカウントが存在しません。';
        break;

      case AuthErrorCodes.INVALID_PASSWORD:
        message = 'パスワードが誤っています。';
        break;

      case AuthErrorCodes.INVALID_EMAIL:
        message = '入力されたメールアドレスは無効です。';
        break;

      case AuthErrorCodes.USER_DISABLED:
        message = 'アカウントが無効化されています。管理者へ問い合わせてください。';
        break;

      case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
        message = '再度ログインしてから、操作してください。';
        break;

      default:
        message = `[${error.code}] ${error.message}`;
    }

    super(message);
  }
}
