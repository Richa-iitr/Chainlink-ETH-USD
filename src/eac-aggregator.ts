import { BigInt, dataSource, log } from "@graphprotocol/graph-ts";
import {
  EACAggregator,
  AnswerUpdated,
} from "../generated/EACAggregator/EACAggregator";
import { RoundData } from "../generated/schema";

export function handleAnswerUpdated(event: AnswerUpdated): void {
  let context = dataSource.context();
  let _aggregator = context.getString("aggregator");
  let id =
    event.transaction.hash.toHexString() + "#" + event.logIndex.toString();
  let data = RoundData.load(id);
  if (data == null) {
    data = new RoundData(id);
    data.answer = BigInt.fromI32(0);
    data.timestamp = BigInt.fromI32(0);
    data.roundId = BigInt.fromI32(0);
    data.blockNumber = BigInt.fromI32(0);
    data.aggregator = "";
  }

  data.answer = event.params.current;
  data.timestamp = event.params.updatedAt;
  data.roundId = event.params.roundId;
  data.blockNumber = event.block.number;
  data.aggregator = _aggregator;

  log.info("block timestamp: {}, event timetsamp: {}", [
    event.block.timestamp.toString(),
    event.params.updatedAt.toString(),
  ]);

  data.save();
}
