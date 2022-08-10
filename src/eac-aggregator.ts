import { BigInt } from "@graphprotocol/graph-ts"
import {
  EACAggregator,
  AnswerUpdated,
  NewRound,
  OwnershipTransferRequested,
  OwnershipTransferred
} from "../generated/EACAggregator/EACAggregator"
import { ExampleEntity } from "../generated/schema"

export function handleAnswerUpdated(event: AnswerUpdated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.current = event.params.current
  entity.roundId = event.params.roundId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.accessController(...)
  // - contract.aggregator(...)
  // - contract.decimals(...)
  // - contract.description(...)
  // - contract.getAnswer(...)
  // - contract.getRoundData(...)
  // - contract.getTimestamp(...)
  // - contract.latestAnswer(...)
  // - contract.latestRound(...)
  // - contract.latestRoundData(...)
  // - contract.latestTimestamp(...)
  // - contract.owner(...)
  // - contract.phaseAggregators(...)
  // - contract.phaseId(...)
  // - contract.proposedAggregator(...)
  // - contract.proposedGetRoundData(...)
  // - contract.proposedLatestRoundData(...)
  // - contract.version(...)
}

export function handleNewRound(event: NewRound): void {}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequested
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
