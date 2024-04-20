import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Attack,
  ChangeEnemyImgUrl,
  ChangeNormalNftAddress,
  ChangeSuperNftAddress,
  Deposited,
  GameCreated,
  GameFinished,
  GameSeasonChanged,
  NftMinted,
  OwnershipTransferred,
  Withdraw,
  WithdrawToken
} from "../generated/WakuWakuGameV5/WakuWakuGameV5"

export function createAttackEvent(
  gameId: BigInt,
  result: string,
  attack: BigInt,
  pushCount: BigInt
): Attack {
  let attackEvent = changetype<Attack>(newMockEvent())

  attackEvent.parameters = new Array()

  attackEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  attackEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromString(result))
  )
  attackEvent.parameters.push(
    new ethereum.EventParam("attack", ethereum.Value.fromUnsignedBigInt(attack))
  )
  attackEvent.parameters.push(
    new ethereum.EventParam(
      "pushCount",
      ethereum.Value.fromUnsignedBigInt(pushCount)
    )
  )

  return attackEvent
}

export function createChangeEnemyImgUrlEvent(
  oldEnemyUrl: string,
  newEnemyUrl: string
): ChangeEnemyImgUrl {
  let changeEnemyImgUrlEvent = changetype<ChangeEnemyImgUrl>(newMockEvent())

  changeEnemyImgUrlEvent.parameters = new Array()

  changeEnemyImgUrlEvent.parameters.push(
    new ethereum.EventParam(
      "oldEnemyUrl",
      ethereum.Value.fromString(oldEnemyUrl)
    )
  )
  changeEnemyImgUrlEvent.parameters.push(
    new ethereum.EventParam(
      "newEnemyUrl",
      ethereum.Value.fromString(newEnemyUrl)
    )
  )

  return changeEnemyImgUrlEvent
}

export function createChangeNormalNftAddressEvent(
  oldNormalNftAddress: Address,
  newNormalNftAddress: Address
): ChangeNormalNftAddress {
  let changeNormalNftAddressEvent = changetype<ChangeNormalNftAddress>(
    newMockEvent()
  )

  changeNormalNftAddressEvent.parameters = new Array()

  changeNormalNftAddressEvent.parameters.push(
    new ethereum.EventParam(
      "oldNormalNftAddress",
      ethereum.Value.fromAddress(oldNormalNftAddress)
    )
  )
  changeNormalNftAddressEvent.parameters.push(
    new ethereum.EventParam(
      "newNormalNftAddress",
      ethereum.Value.fromAddress(newNormalNftAddress)
    )
  )

  return changeNormalNftAddressEvent
}

export function createChangeSuperNftAddressEvent(
  oldSuperNftAddress: Address,
  newSuperNftAddress: Address
): ChangeSuperNftAddress {
  let changeSuperNftAddressEvent = changetype<ChangeSuperNftAddress>(
    newMockEvent()
  )

  changeSuperNftAddressEvent.parameters = new Array()

  changeSuperNftAddressEvent.parameters.push(
    new ethereum.EventParam(
      "oldSuperNftAddress",
      ethereum.Value.fromAddress(oldSuperNftAddress)
    )
  )
  changeSuperNftAddressEvent.parameters.push(
    new ethereum.EventParam(
      "newSuperNftAddress",
      ethereum.Value.fromAddress(newSuperNftAddress)
    )
  )

  return changeSuperNftAddressEvent
}

export function createDepositedEvent(
  payee: Address,
  weiAmount: BigInt
): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent())

  depositedEvent.parameters = new Array()

  depositedEvent.parameters.push(
    new ethereum.EventParam("payee", ethereum.Value.fromAddress(payee))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "weiAmount",
      ethereum.Value.fromUnsignedBigInt(weiAmount)
    )
  )

  return depositedEvent
}

export function createGameCreatedEvent(
  gameName: string,
  gameSeacon: BigInt,
  openingStatus: boolean,
  normalNftAddress: Address,
  superNftAddress: Address,
  cardNftAddress: Address,
  cardNftSupply: BigInt,
  currentSupply: BigInt,
  winner: Address,
  enemyInfo: ethereum.Tuple
): GameCreated {
  let gameCreatedEvent = changetype<GameCreated>(newMockEvent())

  gameCreatedEvent.parameters = new Array()

  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("gameName", ethereum.Value.fromString(gameName))
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "gameSeacon",
      ethereum.Value.fromUnsignedBigInt(gameSeacon)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "openingStatus",
      ethereum.Value.fromBoolean(openingStatus)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "normalNftAddress",
      ethereum.Value.fromAddress(normalNftAddress)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "superNftAddress",
      ethereum.Value.fromAddress(superNftAddress)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "cardNftAddress",
      ethereum.Value.fromAddress(cardNftAddress)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "cardNftSupply",
      ethereum.Value.fromUnsignedBigInt(cardNftSupply)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "currentSupply",
      ethereum.Value.fromUnsignedBigInt(currentSupply)
    )
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("enemyInfo", ethereum.Value.fromTuple(enemyInfo))
  )

  return gameCreatedEvent
}

export function createGameFinishedEvent(
  gameId: BigInt,
  winner: Address
): GameFinished {
  let gameFinishedEvent = changetype<GameFinished>(newMockEvent())

  gameFinishedEvent.parameters = new Array()

  gameFinishedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  gameFinishedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return gameFinishedEvent
}

export function createGameSeasonChangedEvent(
  gameId: BigInt,
  season: BigInt
): GameSeasonChanged {
  let gameSeasonChangedEvent = changetype<GameSeasonChanged>(newMockEvent())

  gameSeasonChangedEvent.parameters = new Array()

  gameSeasonChangedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  gameSeasonChangedEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )

  return gameSeasonChangedEvent
}

export function createNftMintedEvent(
  gameId: BigInt,
  nftAddress: Address,
  player: Address
): NftMinted {
  let nftMintedEvent = changetype<NftMinted>(newMockEvent())

  nftMintedEvent.parameters = new Array()

  nftMintedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return nftMintedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createWithdrawEvent(
  payee: Address,
  weiAmount: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("payee", ethereum.Value.fromAddress(payee))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "weiAmount",
      ethereum.Value.fromUnsignedBigInt(weiAmount)
    )
  )

  return withdrawEvent
}

export function createWithdrawTokenEvent(
  payee: Address,
  prizeToken: Address,
  weiAmount: BigInt
): WithdrawToken {
  let withdrawTokenEvent = changetype<WithdrawToken>(newMockEvent())

  withdrawTokenEvent.parameters = new Array()

  withdrawTokenEvent.parameters.push(
    new ethereum.EventParam("payee", ethereum.Value.fromAddress(payee))
  )
  withdrawTokenEvent.parameters.push(
    new ethereum.EventParam(
      "prizeToken",
      ethereum.Value.fromAddress(prizeToken)
    )
  )
  withdrawTokenEvent.parameters.push(
    new ethereum.EventParam(
      "weiAmount",
      ethereum.Value.fromUnsignedBigInt(weiAmount)
    )
  )

  return withdrawTokenEvent
}
