import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./page"
import { AuthProvider } from "./context"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App