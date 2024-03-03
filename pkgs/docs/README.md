# メモをまとめるマークダウン

## 必要な機能

- フロントエンド

  - Lit(不安定そうなので Web3auth にした方が安定しそう)
  - Biconomy

- スマートコントラクト

  - NFT(ERC1155) - (ノーマル NFT と スーパー NFT)
  - Game コントラクト
    - Game 名
    - GameID
    - 早押しの回数
    - winner のアドレス
    - 参加者のアドレスを格納する配列
    - ゲーム実施中であるか否かのフラグ
    - winner への賞金送金機能
    - 参加者への NFTMint 機能

- スクリプト
  - メタデータをアップするためのスクリプト

### メモ

短時間での表示だと難しそう。  
ターゲットを広告主とユーザーを集めるのが大変そう。  
マルジェラに似てそう。優位性をどこに持っていく。  
ターゲットをどこに持っていくのか？  
沼崎さんと Kudasai チームに聞くのが良さそう

### メモ 2

- スーパー NFT が当たる条件も一定時間経ったら変化するようになったら面白いかも
- 広告主に期間限定で権限を渡す。
- 広告主を変えること

### 改良案

PvP 要素を入れる。具体的には次の通り

1. シーズン 1 中は連打した分だけ NFT を発行する。(最初の戦力補充、言うなれば手札を揃えるフェーズ)  
   ※ 発行上限数を設定する。例えば 1,000 枚までなど
2. シーズン 1 が終わったらシーズン 2 に移行させる。シーズン 2 中は相手の NFT をぶんどるフェーズ。
   ※ シーズン 1 とシーズン 2 の切り替え判断は NFT を全て発行仕切っているか否か
3. シーズン 2 中は連打する前に自分の NFT を任意の枚数賭ける。相手と対戦して負けたらその分没収され相手に NFT を渡す。
4. シーズン 2 を 2 日間ぐらいやったら最終的な NFT の枚数を集計し、それに応じてスーパー NFT を配布する。

### 参考資料

1. [プレゼン資料](https://docs.google.com/presentation/d/1Lgr0_aH9DENWWBIPr9TsNFT4-mXaUWQ04ITi_onRJBQ/edit#slide=id.p)
2. [Canva 資料](https://www.canva.com/design/DAFypSIRgJM/HLmWVcJrgiJkWTQ1jXQpBQ/edit?utm_content=DAFypSIRgJM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
3. [参考になりそうなエフェクト集](https://photoshopvip.net/90427/2)
4. [サンプル付コピペ OK！すごい CSS アニメーションライブラリ 30 選【2022 年版】](https://photoshopvip.net/133747)
5. [参考になりそうなアニメーション CSS](https://deshinon.com/2019/03/04/pop-midashi-title-css/)
6. [【Next.js】個人開発で背景に悩んだら試しておきたいツール](https://zenn.dev/masa5714/articles/1d4796b096223f)
7. [Next.js の WEB サイトに reCAPTCHA(v3)を導入する](https://zenn.dev/angelecho/articles/daeb265bb3bf4b)
8. [オラクルによる乱数取得[超入門]](https://zenn.dev/noplan_inc/articles/a80ec34ae49bc3)
9. [note - 1. bot とウォレットのセットアップ](https://note.com/gouyoku_taro/n/n20dbc10fcf39)
10. [note - Maestro Sniper: 最高の暗号通貨トレーディングガイド](https://note.com/gouyoku_taro/n/n9817de9d1989)
11. [MAESTRO の公式 HP](https://www.maestrobots.com/)
12. [dune の公式 HP](https://dune.com/home)
13. [Updated Tutorial for MAESTRO Sniper Bot: Master the Art of Sniping](https://eightify.app/summary/technology-and-gaming/updated-tutorial-for-maestro-sniper-bot-master-the-art-of-sniping)
