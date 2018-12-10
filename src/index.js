import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

import theme from './theme'

import App from './App/index'

const rootElement = document.getElementById('root')
ReactDOM.render(<App theme={theme} />, rootElement)

// const renderApp = () => {
//     return (
//         <App  theme={theme} />,
//         document.getElementById('app'),
//     )
// }

// renderApp()
