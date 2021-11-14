import React, { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider as ReduxProvider } from 'react-redux'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { NotFoundPage, DefaultStatesPage, GraphPage } from './pages'
import { store } from './store'

const App:FC = () => (
   <BrowserRouter>
      <ReduxProvider store={store}>
      <Toaster />
      <Routes>
         <Route path="/" element={<DefaultStatesPage />} />
         <Route path="graph" element={<GraphPage />} />
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </ReduxProvider>
   </BrowserRouter>
)

export default App
