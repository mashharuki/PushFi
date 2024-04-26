import { verifyRecaptcha } from "@/utils/verifyRecaptcha";
import React, { createContext, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";

export const GlobalContext = createContext<any>({});

/**
 * GlobalProvider
 * @param param0
 * @returns
 */
export const GlobalProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyFlg, setVerifyFlg] = useState<boolean>(false);
  // reCAPTCHAからtokenを取得する No.2の処理
  const { executeRecaptcha } = useGoogleReCaptcha();

  /**
   * reCAPTCHA method
   */
  const reCaptcha = async () => {
    if (executeRecaptcha) {
      try {
        setLoading(true);
        const token: string = await executeRecaptcha("login");
        // ReCaptchaによる検証を実施
        const responceJson_recaptcha = await verifyRecaptcha(token);
        console.log("responce_server:", responceJson_recaptcha);
        setVerifyFlg(responceJson_recaptcha.success);

        toast.success("🦄 Verify Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (err) {
        console.error("error:", err);
        toast.error("Verify Failed....", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  //
  const global = {
    loading,
    setLoading,
    reCaptcha,
    verifyFlg,
    setVerifyFlg,
  };

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  );
};
