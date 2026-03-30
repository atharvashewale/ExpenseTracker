function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;