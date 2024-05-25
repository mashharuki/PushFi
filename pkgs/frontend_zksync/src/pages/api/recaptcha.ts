import {GOOGLE_RECAPTCHA_API_BASE_URL} from "@/utils/constants";
import type {NextApiRequest, NextApiResponse} from "next";

export type ReCaptchaType = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReCaptchaType>
) {
  // reCAPTCHA認証サーバーに認証リクエストをPOSTし、認証結果を受け取る
  const serverSecretKey = `secret=${process.env
    .RECAPTCHA_SERVER_SECRET_KEY!}&response=${req.body.token}`;
  // APIリクエスト
  const responce_recaptcha = await fetch(GOOGLE_RECAPTCHA_API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: serverSecretKey,
  });
  const responceJson_recaptcha: ReCaptchaType = await responce_recaptcha.json();
  console.log("responceJson_recaptcha:", responceJson_recaptcha);

  res.status(200).json(responceJson_recaptcha);
}
