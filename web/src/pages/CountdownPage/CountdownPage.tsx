import { Link, routes } from '@redwoodjs/router'
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useSubscription } from '@redwoodjs/web'

const COUNTDOWN_SUBSCRIPTION = gql`
  subscription ListenToCountdown($from: Int!, $interval: Int!) {
    countdown(from: $from, interval: $interval)
  }
`

const ListenToCountdown = ({ from = 100, interval = 10 }) => {
  const { data, loading } = useSubscription(COUNTDOWN_SUBSCRIPTION, {
    variables: { from, interval },
  })
  return (
    !loading && <RenderCountdown countdown={data.countdown}></RenderCountdown>
  )
}

const RenderCountdown = ({ countdown }) => {
  return (
    <dd className="mt-1 text-center text-3xl font-semibold tracking-tight text-gray-900">
      {countdown}
    </dd>
  )
}

const CountdownPage = () => {
  const { from, interval } = useParams()
  return (
    <>
      <MetaTags title="Countdown" description="Countdown page" />

      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Countdown
        </h3>
        <ul className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link to={routes.countdown({ from: 1000, interval: 100 })}>
            <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 p-8 text-center shadow hover:bg-gray-100">
              Countdown from 1000 by 100
            </li>
          </Link>
          <Link to={routes.countdown({ from: 100, interval: 10 })}>
            <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 p-8 text-center shadow hover:bg-gray-100">
              Countdown from 100 by 10
            </li>
          </Link>
          <Link to={routes.countdown({ from: 750, interval: 25 })}>
            <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 p-8 text-center shadow hover:bg-gray-100">
              Countdown from 750 by 125
            </li>
          </Link>
        </ul>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <ListenToCountdown
              from={parseInt(from) || 100}
              interval={parseInt(interval) || 10}
            />
          </div>
        </dl>
      </div>
      <p>
        My default route is named <code>countdown</code>, link to me with `
        <Link to={routes.home()}>Back home</Link>`
      </p>
    </>
  )
}

export default CountdownPage
