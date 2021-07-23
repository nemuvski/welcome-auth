import firebase from 'firebase/app';

/**
 * FirebaseAuth関連のErrorクラス
 */
export class FirebaseAuthError extends Error {
  /**
   * コンストラクタ
   *
   * @param error Errorオブジェクト
   */
  constructor(error: firebase.auth.Error) {
    let message;

    // 一部のエラーコードについて、日本語のメッセージを用意する
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = '入力されたメールアドレスのアカウントがすでに存在します。';
        break;

      case 'auth/user-not-found':
        message = '入力されたメールアドレスのアカウントが存在しません。';
        break;

      case 'auth/wrong-password':
        message = 'パスワードが誤っています。';
        break;

      default:
        message = `[${error.code}] ${error.message}`;
    }

    super(message);
  }
}
