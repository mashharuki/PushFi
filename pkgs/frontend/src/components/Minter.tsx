import { Biconomy } from '@/hooks/biconomy';
import { BiconomySmartAccountV2 } from "@biconomy/account";
import styles from './../styles/Home.module.css';
import { ethers } from "ethers";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GAMECONTRACT_ADDRESS } from '@/utils/constants';

interface Props {
  biconomyService: Biconomy,
  smartAccount: BiconomySmartAccountV2,
  address: string,
  provider: ethers.providers.Provider,
}

/**
 * Minter Component
 * @param param0 
 * @returns 
 */
const Minter: React.FC<Props> = ({ 
  biconomyService, 
  smartAccount, 
  address, 
  provider 
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * handleMint
   */
  const handleMint = async () => {
    toast.info('Minting your NFT...', {
      position: "top-right",
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     });

    // call mintNFT method
    const transactionHash = await biconomyService.mintNft(
      smartAccount, 
      address, 
      provider, 
      GAMECONTRACT_ADDRESS
    );

    setLoading(true)

    toast.success(`Success! Here is your transaction:${transactionHash} `, {
      position: "top-right",
      autoClose: 18000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  return(
    <>
      {address && (
        <div>
          <button 
            onClick={handleMint} 
            className={styles.connect}
          >
            Let`s Try
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Minter;