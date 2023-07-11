// import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'

import { MetaTags, useMutation } from '@redwoodjs/web'

import AuctionCell from 'src/components/AuctionCell'

const MAKE_BID = gql`
  mutation MakeBidOnAuction($auctionId: ID!, $amount: Int!) {
    bid(input: { auctionId: $auctionId, amount: $amount }) {
      amount
    }
  }
`

const AuctionPage = ({ id = 1 }) => {
  const [bid, { error }] = useMutation(MAKE_BID)
  const [auctionId, setAuctionId] = useState(id)
  const [amount, setAmount] = useState(10)

  if (error) {
    alert(error.message)
  }

  return (
    <>
      <MetaTags title="Auction" description="Auction page" />
      <h1 className="text-xl font-bold">Auction Page</h1>

      <AuctionCell id={auctionId} />

      <form>
        <select
          name="id"
          defaultValue={auctionId}
          onChange={(event) => setAuctionId(parseInt(event.target.value))}
        >
          <option value="1">Auction 1</option>
          <option value="2">Auction 2</option>
          <option value="3">Auction 3</option>
          <option value="4">Auction 4</option>
          <option value="5">Auction 5</option>
        </select>
        Bid Amount:{' '}
        <input
          name="bidAmount"
          type="number"
          defaultValue={amount}
          onChange={(event) => {
            setAmount(parseInt(event.target.value))
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault()

            bid({
              variables: {
                auctionId: auctionId,
                amount: amount,
              },
            })
          }}
        >
          Bid
        </button>
      </form>
    </>
  )
}

export default AuctionPage
