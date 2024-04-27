// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Attack extends ethereum.Event {
  get params(): Attack__Params {
    return new Attack__Params(this);
  }
}

export class Attack__Params {
  _event: Attack;

  constructor(event: Attack) {
    this._event = event;
  }

  get gameId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get result(): string {
    return this._event.parameters[1].value.toString();
  }

  get attack(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get pushCount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ChangeEnemyImgUrl extends ethereum.Event {
  get params(): ChangeEnemyImgUrl__Params {
    return new ChangeEnemyImgUrl__Params(this);
  }
}

export class ChangeEnemyImgUrl__Params {
  _event: ChangeEnemyImgUrl;

  constructor(event: ChangeEnemyImgUrl) {
    this._event = event;
  }

  get oldEnemyUrl(): string {
    return this._event.parameters[0].value.toString();
  }

  get newEnemyUrl(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class ChangeNormalNftAddress extends ethereum.Event {
  get params(): ChangeNormalNftAddress__Params {
    return new ChangeNormalNftAddress__Params(this);
  }
}

export class ChangeNormalNftAddress__Params {
  _event: ChangeNormalNftAddress;

  constructor(event: ChangeNormalNftAddress) {
    this._event = event;
  }

  get oldNormalNftAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newNormalNftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ChangeSuperNftAddress extends ethereum.Event {
  get params(): ChangeSuperNftAddress__Params {
    return new ChangeSuperNftAddress__Params(this);
  }
}

export class ChangeSuperNftAddress__Params {
  _event: ChangeSuperNftAddress;

  constructor(event: ChangeSuperNftAddress) {
    this._event = event;
  }

  get oldSuperNftAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newSuperNftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Deposited extends ethereum.Event {
  get params(): Deposited__Params {
    return new Deposited__Params(this);
  }
}

export class Deposited__Params {
  _event: Deposited;

  constructor(event: Deposited) {
    this._event = event;
  }

  get payee(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get weiAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class GameCreated extends ethereum.Event {
  get params(): GameCreated__Params {
    return new GameCreated__Params(this);
  }
}

export class GameCreated__Params {
  _event: GameCreated;

  constructor(event: GameCreated) {
    this._event = event;
  }

  get gameName(): string {
    return this._event.parameters[0].value.toString();
  }

  get gameSeacon(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get openingStatus(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get normalNftAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get superNftAddress(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get cardNftAddress(): Address {
    return this._event.parameters[5].value.toAddress();
  }

  get cardNftSupply(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get currentSupply(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get winner(): Address {
    return this._event.parameters[8].value.toAddress();
  }

  get enemyInfo(): GameCreatedEnemyInfoStruct {
    return changetype<GameCreatedEnemyInfoStruct>(
      this._event.parameters[9].value.toTuple()
    );
  }
}

export class GameCreatedEnemyInfoStruct extends ethereum.Tuple {
  get enemyImgUrl(): string {
    return this[0].toString();
  }

  get enemyLife(): BigInt {
    return this[1].toBigInt();
  }
}

export class GameFinished extends ethereum.Event {
  get params(): GameFinished__Params {
    return new GameFinished__Params(this);
  }
}

export class GameFinished__Params {
  _event: GameFinished;

  constructor(event: GameFinished) {
    this._event = event;
  }

  get gameId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get winner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class GameSeasonChanged extends ethereum.Event {
  get params(): GameSeasonChanged__Params {
    return new GameSeasonChanged__Params(this);
  }
}

export class GameSeasonChanged__Params {
  _event: GameSeasonChanged;

  constructor(event: GameSeasonChanged) {
    this._event = event;
  }

  get gameId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get season(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class NftMinted extends ethereum.Event {
  get params(): NftMinted__Params {
    return new NftMinted__Params(this);
  }
}

export class NftMinted__Params {
  _event: NftMinted;

  constructor(event: NftMinted) {
    this._event = event;
  }

  get gameId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get nftAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get player(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get payee(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get weiAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class WithdrawToken extends ethereum.Event {
  get params(): WithdrawToken__Params {
    return new WithdrawToken__Params(this);
  }
}

export class WithdrawToken__Params {
  _event: WithdrawToken;

  constructor(event: WithdrawToken) {
    this._event = event;
  }

  get payee(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get prizeToken(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get weiAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WakuWakuGameV5__gamesResultEnemyInfoStruct extends ethereum.Tuple {
  get enemyImgUrl(): string {
    return this[0].toString();
  }

  get enemyLife(): BigInt {
    return this[1].toBigInt();
  }
}

export class WakuWakuGameV5__gamesResult {
  value0: string;
  value1: BigInt;
  value2: boolean;
  value3: Address;
  value4: Address;
  value5: Address;
  value6: BigInt;
  value7: BigInt;
  value8: Address;
  value9: WakuWakuGameV5__gamesResultEnemyInfoStruct;

  constructor(
    value0: string,
    value1: BigInt,
    value2: boolean,
    value3: Address,
    value4: Address,
    value5: Address,
    value6: BigInt,
    value7: BigInt,
    value8: Address,
    value9: WakuWakuGameV5__gamesResultEnemyInfoStruct
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromBoolean(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromAddress(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromAddress(this.value8));
    map.set("value9", ethereum.Value.fromTuple(this.value9));
    return map;
  }

  getGameName(): string {
    return this.value0;
  }

  getGameSeacon(): BigInt {
    return this.value1;
  }

  getOpeningStatus(): boolean {
    return this.value2;
  }

  getNormalNftAddress(): Address {
    return this.value3;
  }

  getSuperNftAddress(): Address {
    return this.value4;
  }

  getCardNftAddress(): Address {
    return this.value5;
  }

  getCardNftSupply(): BigInt {
    return this.value6;
  }

  getCurrentSupply(): BigInt {
    return this.value7;
  }

  getWinner(): Address {
    return this.value8;
  }

  getEnemyInfo(): WakuWakuGameV5__gamesResultEnemyInfoStruct {
    return this.value9;
  }
}

export class WakuWakuGameV5 extends ethereum.SmartContract {
  static bind(address: Address): WakuWakuGameV5 {
    return new WakuWakuGameV5("WakuWakuGameV5", address);
  }

  activeGameIdCounter(): BigInt {
    let result = super.call(
      "activeGameIdCounter",
      "activeGameIdCounter():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_activeGameIdCounter(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "activeGameIdCounter",
      "activeGameIdCounter():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  games(param0: BigInt): WakuWakuGameV5__gamesResult {
    let result = super.call(
      "games",
      "games(uint256):(string,uint256,bool,address,address,address,uint256,uint256,address,(string,uint256))",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new WakuWakuGameV5__gamesResult(
      result[0].toString(),
      result[1].toBigInt(),
      result[2].toBoolean(),
      result[3].toAddress(),
      result[4].toAddress(),
      result[5].toAddress(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toAddress(),
      changetype<WakuWakuGameV5__gamesResultEnemyInfoStruct>(
        result[9].toTuple()
      )
    );
  }

  try_games(param0: BigInt): ethereum.CallResult<WakuWakuGameV5__gamesResult> {
    let result = super.tryCall(
      "games",
      "games(uint256):(string,uint256,bool,address,address,address,uint256,uint256,address,(string,uint256))",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new WakuWakuGameV5__gamesResult(
        value[0].toString(),
        value[1].toBigInt(),
        value[2].toBoolean(),
        value[3].toAddress(),
        value[4].toAddress(),
        value[5].toAddress(),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toAddress(),
        changetype<WakuWakuGameV5__gamesResultEnemyInfoStruct>(
          value[9].toTuple()
        )
      )
    );
  }

  getActiveGameId(): BigInt {
    let result = super.call(
      "getActiveGameId",
      "getActiveGameId():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getActiveGameId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getActiveGameId",
      "getActiveGameId():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getOpeningStatus(_gameId: BigInt): boolean {
    let result = super.call(
      "getOpeningStatus",
      "getOpeningStatus(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_gameId)]
    );

    return result[0].toBoolean();
  }

  try_getOpeningStatus(_gameId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getOpeningStatus",
      "getOpeningStatus(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_gameId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  maxAddress(): Address {
    let result = super.call("maxAddress", "maxAddress():(address)", []);

    return result[0].toAddress();
  }

  try_maxAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("maxAddress", "maxAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  maxCount(): BigInt {
    let result = super.call("maxCount", "maxCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxCount", "maxCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  onERC1155BatchReceived(
    operator: Address,
    from: Address,
    ids: Array<BigInt>,
    values: Array<BigInt>,
    data: Bytes
  ): Bytes {
    let result = super.call(
      "onERC1155BatchReceived",
      "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(operator),
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigIntArray(ids),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytes(data)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC1155BatchReceived(
    operator: Address,
    from: Address,
    ids: Array<BigInt>,
    values: Array<BigInt>,
    data: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC1155BatchReceived",
      "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(operator),
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigIntArray(ids),
        ethereum.Value.fromUnsignedBigIntArray(values),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  onERC1155Received(
    operator: Address,
    from: Address,
    id: BigInt,
    value: BigInt,
    data: Bytes
  ): Bytes {
    let result = super.call(
      "onERC1155Received",
      "onERC1155Received(address,address,uint256,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(operator),
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigInt(id),
        ethereum.Value.fromUnsignedBigInt(value),
        ethereum.Value.fromBytes(data)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC1155Received(
    operator: Address,
    from: Address,
    id: BigInt,
    value: BigInt,
    data: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC1155Received",
      "onERC1155Received(address,address,uint256,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(operator),
        ethereum.Value.fromAddress(from),
        ethereum.Value.fromUnsignedBigInt(id),
        ethereum.Value.fromUnsignedBigInt(value),
        ethereum.Value.fromBytes(data)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  partipants(param0: BigInt, param1: Address): BigInt {
    let result = super.call(
      "partipants",
      "partipants(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_partipants(param0: BigInt, param1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "partipants",
      "partipants(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get initialOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class ChangeEnemyUrlCall extends ethereum.Call {
  get inputs(): ChangeEnemyUrlCall__Inputs {
    return new ChangeEnemyUrlCall__Inputs(this);
  }

  get outputs(): ChangeEnemyUrlCall__Outputs {
    return new ChangeEnemyUrlCall__Outputs(this);
  }
}

export class ChangeEnemyUrlCall__Inputs {
  _call: ChangeEnemyUrlCall;

  constructor(call: ChangeEnemyUrlCall) {
    this._call = call;
  }

  get _gameId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _newEnemyImgUrl(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ChangeEnemyUrlCall__Outputs {
  _call: ChangeEnemyUrlCall;

  constructor(call: ChangeEnemyUrlCall) {
    this._call = call;
  }
}

export class ChangeNormalNftCall extends ethereum.Call {
  get inputs(): ChangeNormalNftCall__Inputs {
    return new ChangeNormalNftCall__Inputs(this);
  }

  get outputs(): ChangeNormalNftCall__Outputs {
    return new ChangeNormalNftCall__Outputs(this);
  }
}

export class ChangeNormalNftCall__Inputs {
  _call: ChangeNormalNftCall;

  constructor(call: ChangeNormalNftCall) {
    this._call = call;
  }

  get _gameId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _newNormalNftAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ChangeNormalNftCall__Outputs {
  _call: ChangeNormalNftCall;

  constructor(call: ChangeNormalNftCall) {
    this._call = call;
  }
}

export class ChangeSuperNftCall extends ethereum.Call {
  get inputs(): ChangeSuperNftCall__Inputs {
    return new ChangeSuperNftCall__Inputs(this);
  }

  get outputs(): ChangeSuperNftCall__Outputs {
    return new ChangeSuperNftCall__Outputs(this);
  }
}

export class ChangeSuperNftCall__Inputs {
  _call: ChangeSuperNftCall;

  constructor(call: ChangeSuperNftCall) {
    this._call = call;
  }

  get _gameId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _newSuperNftAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ChangeSuperNftCall__Outputs {
  _call: ChangeSuperNftCall;

  constructor(call: ChangeSuperNftCall) {
    this._call = call;
  }
}

export class CreateGameCall extends ethereum.Call {
  get inputs(): CreateGameCall__Inputs {
    return new CreateGameCall__Inputs(this);
  }

  get outputs(): CreateGameCall__Outputs {
    return new CreateGameCall__Outputs(this);
  }
}

export class CreateGameCall__Inputs {
  _call: CreateGameCall;

  constructor(call: CreateGameCall) {
    this._call = call;
  }

  get _gameName(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _normalNftAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _superNftAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _cardNftAddress(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _cardNftSupply(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _enemyImgUrl(): string {
    return this._call.inputValues[5].value.toString();
  }

  get _enemyLife(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class CreateGameCall__Outputs {
  _call: CreateGameCall;

  constructor(call: CreateGameCall) {
    this._call = call;
  }
}

export class OnERC1155BatchReceivedCall extends ethereum.Call {
  get inputs(): OnERC1155BatchReceivedCall__Inputs {
    return new OnERC1155BatchReceivedCall__Inputs(this);
  }

  get outputs(): OnERC1155BatchReceivedCall__Outputs {
    return new OnERC1155BatchReceivedCall__Outputs(this);
  }
}

export class OnERC1155BatchReceivedCall__Inputs {
  _call: OnERC1155BatchReceivedCall;

  constructor(call: OnERC1155BatchReceivedCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get values(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }

  get data(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class OnERC1155BatchReceivedCall__Outputs {
  _call: OnERC1155BatchReceivedCall;

  constructor(call: OnERC1155BatchReceivedCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class OnERC1155ReceivedCall extends ethereum.Call {
  get inputs(): OnERC1155ReceivedCall__Inputs {
    return new OnERC1155ReceivedCall__Inputs(this);
  }

  get outputs(): OnERC1155ReceivedCall__Outputs {
    return new OnERC1155ReceivedCall__Outputs(this);
  }
}

export class OnERC1155ReceivedCall__Inputs {
  _call: OnERC1155ReceivedCall;

  constructor(call: OnERC1155ReceivedCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get id(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get value(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class OnERC1155ReceivedCall__Outputs {
  _call: OnERC1155ReceivedCall;

  constructor(call: OnERC1155ReceivedCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class PauseGameCall extends ethereum.Call {
  get inputs(): PauseGameCall__Inputs {
    return new PauseGameCall__Inputs(this);
  }

  get outputs(): PauseGameCall__Outputs {
    return new PauseGameCall__Outputs(this);
  }
}

export class PauseGameCall__Inputs {
  _call: PauseGameCall;

  constructor(call: PauseGameCall) {
    this._call = call;
  }

  get _gameId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PauseGameCall__Outputs {
  _call: PauseGameCall;

  constructor(call: PauseGameCall) {
    this._call = call;
  }
}

export class PlayGameCall extends ethereum.Call {
  get inputs(): PlayGameCall__Inputs {
    return new PlayGameCall__Inputs(this);
  }

  get outputs(): PlayGameCall__Outputs {
    return new PlayGameCall__Outputs(this);
  }
}

export class PlayGameCall__Inputs {
  _call: PlayGameCall;

  constructor(call: PlayGameCall) {
    this._call = call;
  }

  get _player(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _pushCount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class PlayGameCall__Outputs {
  _call: PlayGameCall;

  constructor(call: PlayGameCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}