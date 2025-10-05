import { Outlet } from "react-router-dom"
import { Sidebar } from "../Sidebar"

export const AppLayout = () => {
  return (
    <div className="flex flex-col md:flex-row   fixed-to dark:bg-gray-900">
     <Sidebar/>
     <Outlet/>
    </div>
  )
}
