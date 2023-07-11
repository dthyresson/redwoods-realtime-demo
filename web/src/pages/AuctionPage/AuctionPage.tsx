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

      <div className="flex">
        <div className="w-1/2 flex-initial">
          <AuctionCell id={auctionId} />
        </div>
        <div className="w-1/2 flex-initial">
          <form className="spacing-y-4 ">
            <div>
              Bin on:{' '}
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
            </div>
            <div>
              Bid Amount:{' '}
              <input
                name="bidAmount"
                type="number"
                defaultValue={amount}
                onChange={(event) => {
                  setAmount(parseInt(event.target.value))
                }}
              />
            </div>
            <div>
              <button
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                Place Bid!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuctionPage
