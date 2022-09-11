import {
  Address,
  BigInt,
  Bytes,
  DataSourceContext,
} from "@graphprotocol/graph-ts";
import {
  ConfirmAggregatorCall,
  EACAggregator,
} from "../generated/EACAggregator/EACAggregator";
import { RoundData, Aggregator } from "../generated/schema";
import { EACAggregatorPool} from "../generated/templates";

export const ZERO = new BigInt(0);

export function handleAggregatorChanged(call: ConfirmAggregatorCall): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);

  let context = new DataSourceContext();
  context.setString("aggregator", call.inputs._aggregator.toHexString());
  EACAggregatorPool.createWithContext(call.inputs._aggregator, context);

  let aggregator = createOrLoadAggregator(call.inputs._aggregator.toHexString());
  let contract = EACAggregator.bind(Address.fromBytes(Address.fromHexString("0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419")));
  let phaseId = contract.phaseId();
  aggregator.phaseID = phaseId;
  aggregator.save();
}

//loads or creates smart account
export function createOrLoadAggregator(id: string): Aggregator {
  let aggregator = Aggregator.load(id);
  if (aggregator == null) {
    aggregator = new Aggregator(id);
    aggregator.phaseID = 0;
    aggregator.roundData = [];
  }
  return aggregator;
}
