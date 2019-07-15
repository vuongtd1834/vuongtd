import React from 'react'
import { slide as Menu } from 'react-burger-menu'


import './styles'

export default class ReactBurgerMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  closeBurgerMenu(state) {
    if (this.props.onChange) {
      this.props.onChange(state.isOpen)
    }
  }

  render() {
    return (
      <Menu isOpen={ this.props.isOpen } onStateChange ={state => this.closeBurgerMenu(state)}>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    )
  }
}

