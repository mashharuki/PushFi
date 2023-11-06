import { Contract, ContractInterface, ethers } from "ethers";

export type TxData = {
  to: string;
  data: any;
}

/**
 * useContract用のクラスファイルです。
 */
export class UseContract {

  private contractAddress: string | null = null;
  private contract: Contract | null = null;

  /**
   * UseContract用のインスタンスを作成するメソッド
   */
  async create(
    contractAddress: string,
    abi: ContractInterface,
    rpcUrl: string
  ) {
    const contractService = new UseContract();
    this.init(contractAddress, abi, rpcUrl);
    return contractService;
  }

  /**
   * 初期化メソッド
   */
  init(
    contractAddress: string,
    abi: ContractInterface,
    rpcUrl: string
  ) {
    // create provider
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    // コントラクトのインスタンスを生成
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider,
    );

    this.contract = contract;
    this.contractAddress = contractAddress;
  }

  /**
   * createPlayGameTxData method
   */
  async createPlayGameTxData(
    gameId: number,
    playerAddress: string  
  ): Promise<TxData> {
    // create NFT Cotntract's method call data
    const minTx = await this.contract!.populateTransaction.playGame(gameId, playerAddress);
    console.log(minTx.data);

    const txData: TxData = {
      to: this.contractAddress!,
      data: minTx.data,
    };

    return txData;
  }

  /**
   * getGameStatus method
   */
  async getGameStatus(gameId: number): Promise<boolean> {
    // get gameStatus
    const result = await this.contract!.getOpeningStatus(gameId);
    return result;
  }
}