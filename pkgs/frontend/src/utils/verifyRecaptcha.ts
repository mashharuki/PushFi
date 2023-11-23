import { ReCaptchaType } from "@/pages/api/recaptcha";

/**
 * ReCaptchaによる検証を行うためのメソッド
 */
export const verifyRecaptcha = async(
  token: string
): Promise<ReCaptchaType> => {
  // サーバーへrecaptcha認証および問い合わせ内容送信処理の要求をPOSTする　
  const responce_recaptcha = await fetch("/api/recaptcha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  const responceJson_recaptcha = await responce_recaptcha.json();
  console.log("responceJson_recaptcha:", responceJson_recaptcha);
  return responceJson_recaptcha;
}