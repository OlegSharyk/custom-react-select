import React, { Component } from 'react'
import Select from 'react-select'
import styled from 'styled-components'

const SelectWrapper = styled.div`
    font-family: Arial;
    position: relative;
    z-index: 1;
`

const SelectLabel = styled.span`
    position: absolute;
    left: 8px;
    top: ${({ floating }) => (floating ? '-6px' : '12px')};
    font-size: ${({ floating }) => (floating ? '10px' : '14px')};
    color: #333;
    z-index: 1;
    box-sizing: 'border-box';
    pointer-events: 'none';
    padding: 0 4px;
    transition: font-size 200ms ease, padding 200ms ease;
    background: ${({ theme }) => theme.white};
`

class CustomSelect extends Component {
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

    render() {
        const { value, focused } = this.state
        const floating = this.isFloating(value, focused)

        return (
            <SelectWrapper>
                <SelectLabel floating={floating} onClick={this.labelClick}>
                    {this.props.placeholder}
                </SelectLabel>
                <Select
                    options={this.props.options}
                    placeholder=""
                    onBlur={this.handleFocusChange}
                    onChange={this.handleChange}
                    onFocus={this.handleFocusChange}
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
