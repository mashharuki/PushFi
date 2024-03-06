import type {NextApiRequest, NextApiResponse} from "next";

export type ResponseData = {
  BICONOMY_BUNDLER_KEY: string;
  BICONOMY_PAYMASTER_KEY: string;
  WEB3_AUTH_CLIENT_ID: string;
  RECAPTCHA_SERVER_SECRET_KEY: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    BICONOMY_BUNDLER_KEY: process.env.BICONOMY_BUNDLER_KEY!,
    BICONOMY_PAYMASTER_KEY: process.env.BICONOMY_PAYMASTER_KEY!,
    WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID!,
    RECAPTCHA_SERVER_SECRET_KEY: process.env.RECAPTCHA_SERVER_SECRET_KEY!,
  };

  res.status(200).json(env);
}
