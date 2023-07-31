function Layout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center">
      {children}
    </div>
  )
}

export default Layout
