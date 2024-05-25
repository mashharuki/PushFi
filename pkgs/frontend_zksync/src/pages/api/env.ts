import type {NextApiRequest, NextApiResponse} from "next";

export type ResponseData = {
  RECAPTCHA_SERVER_SECRET_KEY: string;
  RECAPTCHA_CLIENT_KEY: string;
  PRIVY_APP_ID: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    RECAPTCHA_SERVER_SECRET_KEY: process.env.RECAPTCHA_SERVER_SECRET_KEY!,
    RECAPTCHA_CLIENT_KEY: process.env.RECAPTCHA_CLIENT_KEY!,
    PRIVY_APP_ID: process.env.PRIVY_APP_ID!,
  };

  res.status(200).json(env);
}
