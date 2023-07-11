// import type { FindAuctionQuery, FindAuctionQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const QUERY = gql`
  query GetCurrentAuctionBids($id: ID!) @live {
    auction(id: $id) {
      bids {
        amount
      }
      highestBid {
        amount
      }
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ auction }: CellSuccessProps) => {
  return <div>{JSON.stringify(auction)}</div>
}
