import React, { useContext, useState } from 'react'
import ResponsiveStyles from './ui/ResponsiveStyles'
import Homepage from './Homepage'
import Quiz from './Quiz'
import { Context } from '../utils/Context'
import Result from './Result'

const Main = () => {
    const [start, setStart] = useState(false)
    const { page } = useContext(Context)
  return (
    <>
        {(!start || page == '') && <Homepage setStart={setStart}/> }
        {(start && page == 'quiz') && <Quiz />}
        {(start && page == 'end') && <Result />}

    </>
    
  )
}

export default ResponsiveStyles(Main);