import { BigInt, DataSourceContext, log } from "@graphprotocol/graph-ts";
import { EACAggregator } from "../generated/templates";
import {
  EACAggregatorProxy,
  ConfirmAggregatorCall,
} from "../generated/EACAggregatorProxy/EACAggregatorProxy";

export function handleAggregatorConfirm(call: ConfirmAggregatorCall): void {
    let context = new DataSourceContext();
    context.setString("aggregator", call.inputs._aggregator.toHexString());
    EACAggregator.createWithContext(call.inputs._aggregator, context);
}
