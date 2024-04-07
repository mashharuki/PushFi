import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Attack } from "../generated/schema"
import { Attack as AttackEvent } from "../generated/WakuWakuGameV5/WakuWakuGameV5"
import { handleAttack } from "../src/waku-waku-game-v-5"
import { createAttackEvent } from "./waku-waku-game-v-5-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let gameId = BigInt.fromI32(234)
    let result = "Example string value"
    let attack = BigInt.fromI32(234)
    let pushCount = BigInt.fromI32(234)
    let newAttackEvent = createAttackEvent(gameId, result, attack, pushCount)
    handleAttack(newAttackEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Attack created and stored", () => {
    assert.entityCount("Attack", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Attack",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "gameId",
      "234"
    )
    assert.fieldEquals(
      "Attack",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "result",
      "Example string value"
    )
    assert.fieldEquals(
      "Attack",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "attack",
      "234"
    )
    assert.fieldEquals(
      "Attack",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pushCount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
