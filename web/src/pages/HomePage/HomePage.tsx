import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Realtime Demo
      </h2>
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
    </>
  )
}

export default HomePage
