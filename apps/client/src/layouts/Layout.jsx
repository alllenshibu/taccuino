function Layout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center overflow-hidden">
      {children}
    </div>
  )
}

export default Layout
