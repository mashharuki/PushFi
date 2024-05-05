import {
  Attack as AttackEvent,
  ChangeEnemyImgUrl as ChangeEnemyImgUrlEvent,
  ChangeNormalNftAddress as ChangeNormalNftAddressEvent,
  ChangeSuperNftAddress as ChangeSuperNftAddressEvent,
  CurrentSupplyUpdated as CurrentSupplyUpdatedEvent,
  Deposited as DepositedEvent,
  EnemyLifeUpdated as EnemyLifeUpdatedEvent,
  GameCreated as GameCreatedEvent,
  GameFinished as GameFinishedEvent,
  GameSeasonChanged as GameSeasonChangedEvent,
  NftMinted as NftMintedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Withdraw as WithdrawEvent,
  WithdrawToken as WithdrawTokenEvent
} from "../generated/WakuWakuGameV5/WakuWakuGameV5"
import {
  Attack,
  ChangeEnemyImgUrl,
  ChangeNormalNftAddress,
  ChangeSuperNftAddress,
  CurrentSupplyUpdated,
  Deposited,
  EnemyLifeUpdated,
  GameCreated,
  GameFinished,
  GameSeasonChanged,
  NftMinted,
  OwnershipTransferred,
  Withdraw,
  WithdrawToken
} from "../generated/schema"

export function handleAttack(event: AttackEvent): void {
  let entity = new Attack(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.player = event.params.player
  entity.result = event.params.result
  entity.attack = event.params.attack
  entity.pushCount = event.params.pushCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeEnemyImgUrl(event: ChangeEnemyImgUrlEvent): void {
  let entity = new ChangeEnemyImgUrl(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldEnemyUrl = event.params.oldEnemyUrl
  entity.newEnemyUrl = event.params.newEnemyUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeNormalNftAddress(
  event: ChangeNormalNftAddressEvent
): void {
  let entity = new ChangeNormalNftAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldNormalNftAddress = event.params.oldNormalNftAddress
  entity.newNormalNftAddress = event.params.newNormalNftAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeSuperNftAddress(
  event: ChangeSuperNftAddressEvent
): void {
  let entity = new ChangeSuperNftAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldSuperNftAddress = event.params.oldSuperNftAddress
  entity.newSuperNftAddress = event.params.newSuperNftAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCurrentSupplyUpdated(
  event: CurrentSupplyUpdatedEvent
): void {
  let entity = new CurrentSupplyUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.cardNftAddress = event.params.cardNftAddress
  entity.newSupply = event.params.newSupply

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.payee = event.params.payee
  entity.weiAmount = event.params.weiAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEnemyLifeUpdated(event: EnemyLifeUpdatedEvent): void {
  let entity = new EnemyLifeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.newEnemyLife = event.params.newEnemyLife

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameCreated(event: GameCreatedEvent): void {
  let entity = new GameCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.gameName = event.params.gameName
  entity.gameSeacon = event.params.gameSeacon
  entity.openingStatus = event.params.openingStatus
  entity.normalNftAddress = event.params.normalNftAddress
  entity.superNftAddress = event.params.superNftAddress
  entity.cardNftAddress = event.params.cardNftAddress
  entity.cardNftSupply = event.params.cardNftSupply
  entity.currentSupply = event.params.currentSupply
  entity.winner = event.params.winner
  entity.enemyInfo_enemyImgUrl = event.params.enemyInfo.enemyImgUrl
  entity.enemyInfo_enemyLife = event.params.enemyInfo.enemyLife

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameFinished(event: GameFinishedEvent): void {
  let entity = new GameFinished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.winner = event.params.winner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameSeasonChanged(event: GameSeasonChangedEvent): void {
  let entity = new GameSeasonChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.season = event.params.season

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNftMinted(event: NftMintedEvent): void {
  let entity = new NftMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.nftAddress = event.params.nftAddress
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.payee = event.params.payee
  entity.weiAmount = event.params.weiAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawToken(event: WithdrawTokenEvent): void {
  let entity = new WithdrawToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.payee = event.params.payee
  entity.prizeToken = event.params.prizeToken
  entity.weiAmount = event.params.weiAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
