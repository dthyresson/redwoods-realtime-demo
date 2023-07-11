import { NavLink, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <nav className="m-12 flex justify-center space-x-4" aria-label="Tabs">
        <NavLink
          to={routes.countdown()}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Countdown
        </NavLink>
        <NavLink
          to={routes.room({ roomId: 1 })}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Chat in Room 1
        </NavLink>
        <NavLink
          to={routes.room({ roomId: 2 })}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Chat in Room 2
        </NavLink>
        <NavLink
          to={routes.room({ roomId: 3 })}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Chat in Room 3
        </NavLink>
        <NavLink
          to={routes.room({ roomId: 4 })}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Chat in Room 4
        </NavLink>
        <NavLink
          to={routes.room({ roomId: 5 })}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Chat in Room 5
        </NavLink>
        <NavLink
          to={routes.auction({ id: 1 })}
          className=" rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          activeClassName=" rounded-md px-3 py-2 text-sm font-medium bg-indigo-100 text-indigo-700"
        >
          Bid on Auction
        </NavLink>
      </nav>
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  )
}

export default MainLayout
