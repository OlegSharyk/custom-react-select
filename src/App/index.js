import React from 'react'
import CustomSelect from '../CustomSelect'
import '../styles.css'
import { ThemeProvider } from 'styled-components'

import { countries, currencies } from '../constants'

const App = ({ theme }) => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <h1>Custom Select</h1>
                <div style={{ marginBottom: 20 }}>
                    <CustomSelect placeholder="Select Country" value="" options={countries} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <CustomSelect placeholder="Select Currency" value="" options={currencies} />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
