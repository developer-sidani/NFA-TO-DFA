import React, { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { NotFoundPage, DefaultStatesPage, GraphPage } from './pages'

const App:FC = () => (
<>
   <Toaster />
   <Routes>
      <Route path="/" element={<DefaultStatesPage />} />
      <Route path="graph" element={<GraphPage />} />
      <Route path="*" element={<NotFoundPage />} />
   </Routes>
</>
)

export default App
