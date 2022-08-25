import { Address, BigInt, dataSource, log } from "@graphprotocol/graph-ts";
import {
  EACAggregator,
  AnswerUpdated,
} from "../generated/EACAggregator/EACAggregator";
import { Aggregator, RoundData } from "../generated/schema";
import { createOrLoadAggregator } from "./eac-aggregator-proxy";

export function handleAnswerUpdated(event: AnswerUpdated): void {
  let id =
    event.transaction.hash.toHexString() + "#" + event.logIndex.toString();
  let data = RoundData.load(id);
  if (data == null) {
    data = new RoundData(id);
    data.answer = BigInt.fromI32(0);
    data.timestamp = 0;
    data.roundId = new BigInt(0);
    data.blockNumber = 0;
  }

  let context = dataSource.context();
  data.answer = (event.params.current);
  data.timestamp = (event.params.updatedAt).toI32();
  data.roundId = event.params.roundId;
  data.blockNumber = (event.block.number).toI32();
  data.aggregator = context.getString("aggregator");

  let aggregator = createOrLoadAggregator(data.aggregator);
  let roundDatas = aggregator.roundData;
  roundDatas.push(data.id);
  aggregator.roundData = roundDatas;

  log.info("block timestamp: {}, event timetsamp: {}", [
    event.block.timestamp.toString(),
    event.params.updatedAt.toString(),
  ]);

  data.save();
  aggregator.save();
}

export function handleAnswerUpdatedPhase1(event: AnswerUpdated): void {
  let id =
    event.transaction.hash.toHexString() + "#" + event.logIndex.toString();
  let data = RoundData.load(id);
  if (data == null) {
    data = new RoundData(id);
    data.answer = BigInt.fromI32(0);
    data.timestamp = 0;
    data.roundId = new BigInt(0);
    data.blockNumber = 0;
  }

  data.answer = (event.params.current);
  data.timestamp = (event.params.updatedAt).toI32();
  data.roundId = event.params.roundId;
  data.blockNumber = (event.block.number).toI32();
  let aggregatorId = "0xF79D6aFBb6dA890132F9D7c355e3015f15F3406F"
  data.aggregator = aggregatorId;

  let aggregator = createOrLoadAggregator(aggregatorId);
  aggregator.phaseID = 1;
  let roundDatas = aggregator.roundData;
  roundDatas.push(data.id);
  aggregator.roundData = roundDatas;

  log.info("block timestamp: {}, event timetsamp: {}", [
    event.block.timestamp.toString(),
    event.params.updatedAt.toString(),
  ]);

  data.save();
  aggregator.save();
}
