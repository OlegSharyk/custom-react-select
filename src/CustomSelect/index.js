import React, { Component } from 'react'
import Select, { components } from 'react-select'
// import Menu from 'react-select/lib/components/Menu'
import styled from 'styled-components'

import theme from '../theme'

console.log(theme)

const SelectWrapper = styled.div`
    font-family: Arial;
    position: relative;
`

const SelectLabel = styled.span`
    position: absolute;
    left: 8px;
    top: ${({ floating }) => (floating ? '-6px' : '12px')};
    font-size: ${({ floating }) => (floating ? '10px' : '14px')};
    color: ${({ theme }) => theme.gray};
    z-index: 1;
    box-sizing: 'border-box';
    pointer-events: 'none';
    padding: 0 4px;
    transition: font-size 200ms ease, padding 200ms ease;
    background: ${({ theme }) => theme.white};
    z-index: ${({ theme }) => console.log(theme)};
`

const customStyles = {
    // option: (provided, state) => ({
    //     ...provided,
    //     // borderBottom: '1px dotted pink',
    //     color: '#09091e',
    //     background: state.isSelected ? '#ccc' : 'transparent',
    //     // padding: 20,
    // }),
    // control: () => ({
    //     // none of react-select's styles are passed to <Control />
    //     width: 200,
    // }),
    // singleValue: (provided, state) => {
    //     const opacity = state.isDisabled ? 0.5 : 1
    //     const transition = 'opacity 300ms'

    //     return { ...provided, opacity, transition }
    // },

    // control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                ? '#d6d6f5'
                : isFocused
                ? '#eeeeee'
                : null,
            color: '#09091e',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
        }
    },
    // input: styles => ({ ...styles, ...dot() }),
    // placeholder: styles => ({ ...styles, ...dot() }),
    // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),

    menu: provided => ({ ...provided, zIndex: 2 }),
}

const menuStyles = {
    border: `2px dotted #000000`,
    borderRadius: '5px',
    background: '#f2fcff',
    zIndex: 2,
}

const Menu = props => (
    <div style={menuStyles}>
        <components.Menu {...props} />
    </div>
)

class CustomSelect extends Component {
    constructor(props) {
        super(props)
        // create a ref to store the textInput DOM element
        this.customSelect = React.createRef()
        this.focusSelectLabel = this.focusSelectLabel.bind(this)
    }

    state = {
        floating: false,
        focused: false,
        value: this.props.value,
    }

    handleChange = event => {
        console.log(event)
        const value = event.value
        this.props.onChange(event)
        this.setState({
            value,
        })
    }

    handleFocusChange = event => {
        event.type === 'focus' ? this.props.onFocus(event) : this.props.onBlur(event)
        this.setState({
            focused: !this.state.focused,
        })
    }

    labelClick = () => {
        this.props.onFocus()
    }

    isFloating(value, focused) {
        return value.length || focused
    }

    focusSelectLabel() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.customSelect.current.focus()
    }

    render() {
        const { value, focused } = this.state
        const floating = this.isFloating(value, focused)
        const { error } = this.props

        return (
            <SelectWrapper>
                <SelectLabel floating={floating} onClick={this.focusSelectLabel}>
                    {this.props.placeholder}
                </SelectLabel>
                <Select
                    options={this.props.options}
                    placeholder=""
                    onBlur={this.handleFocusChange}
                    onChange={this.handleChange}
                    onFocus={this.handleFocusChange}
                    ref={this.customSelect}
                    error={error}
                    // styles={{
                    //     menu: provided => ({ ...provided, zIndex: 2 }),
                    // }}
                    styles={customStyles}
                />
            </SelectWrapper>
        )
    }
}

CustomSelect.defaultProps = {
    // autoFocus: false,
    // disabled: false,
    // element: "input",
    // name: "",
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    placeholder: '',
    // readOnly: false,
    // required: false,
    // step: 1,
    // styles: {},
    // type: 'text',
    // value: '',
}

export default CustomSelect
