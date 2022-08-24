# Chainlink-ETH-USD

Query for mainnet: [https://thegraph.com/hosted-service/subgraph/richa-iitr/chainlink-eth-usd?selected=playground](https://thegraph.com/hosted-service/subgraph/richa-iitr/chainlink-eth-usd?selected=playground)

### Query structure

<pre>
{
  aggregators{
    id
    phaseID
    roundData {
      id
      roundId
  		answer
  		timestamp
  		roundId
		  blockNumber
    }
  }
  roundDatas {
      id
      roundId
      aggregator{
        id
      }
  		answer
  		timestamp
  		roundId
		  blockNumber
    }
}
</pre>
