import React, { FC } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { NotFoundPage, DefaultStatesPage, GraphPage } from './pages'
import { store } from './store'

const App:FC = () => (
  <ReduxProvider store={store}>
   <BrowserRouter>
     <Toaster position="top-center" />
      <Routes>
         <Route path="/" element={<DefaultStatesPage />} />
         <Route path="graph" element={<GraphPage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   </BrowserRouter>
  </ReduxProvider>
)

export default App
