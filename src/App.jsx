import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage,EditingPage,CreatingPage,ViewPage } from './Components/index.component'
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/edit/:id" element={<EditingPage />} />
          <Route path="/create" element={<CreatingPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
