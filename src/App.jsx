import React from 'react'
import QuizFromWord from './componets/word-extrector'
import Topbar from './componets/topbar'
import PerformanceSummary from './componets/result'

const App = () => {
  return (
    <>
    <Topbar />
    <PerformanceSummary />
     {/* <QuizFromWord /> */}
    </>
  )
}

export default App
