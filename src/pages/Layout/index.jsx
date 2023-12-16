import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { fetchBillList } from "../../store/modules/billStore"

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBillList())
  },[dispatch])

  return (
    <div>Layout
      <Outlet />
    </div>
  )
}

export default Layout