import React, { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { DefaultStatesPage } from './pages'

const App:FC = () => (
<>
   <Toaster />
   {/* <GraphPage /> */}
   <DefaultStatesPage />
</>
)

export default App
