import React from 'react'

import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import mgLogo from '../../images/farmto-table4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HamburgerMenu from "react-hamburger-menu"
import ReactBurgerMenu from "../ReactBurgerMenu"

import './styles'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      hamburgerMenuOpen: false
    }
  }

  componentWillMount() {

  }

  showSearchMainMenu() {
    this.setState(state =>({
      menuOpen: !state.menuOpen
    }))
  }

  handleToggleHamburgerMenu () {
    this.setState(state =>({
      hamburgerMenuOpen: !state.hamburgerMenuOpen
    }))
  }

  handleCloseMenu(state) {
    this.setState({
      hamburgerMenuOpen: state
    })
  }

  render() {
    return (
      <div className='nav-header'>
          <header className="site-header">
            <ReactBurgerMenu isOpen={this.state.hamburgerMenuOpen} onChange={state => this.handleCloseMenu(state)}/>
            <div className="c-header__top">
              <div className={`main-search ${this.state.menuOpen ? 'active' : 'inactive'}`}>
              </div>
              <div className="main-navigation">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="main-navigation-wrap">
                        <div className="wrap-banning">
                          <NavLink to={"/"}>
                            <img className="img-responsive" src={mgLogo} />
                          </NavLink>
                        </div>
                        <div className="main-menu">
                          <ul className="nav navbar-nav main-navbar">
                            <li>
                              <NavLink to="/home">HOME</NavLink>
                            </li>
                            <li>
                              <NavLink to="/manga/list">MANGA</NavLink>
                            </li>
                            <li>
                              <NavLink to="/blog">BLOG</NavLink>
                            </li>
                            <li>
                              <NavLink to="/manga/store">STORE</NavLink>
                            </li>
                          </ul>
                        </div>
                        <div className="search-navigation">
                          <div className="col-sx-12 col-md-12">
                            <div className="widget-content">
                              <div className=" widget-manga-search">
                                <ul className="main-menu-search nav-menu">
                                  <div className="open-search-main-menu" onClick={() => this.showSearchMainMenu()}>
                                    <li className="menu-search">
                                      <FontAwesomeIcon icon={faSearch}/>
                                    </li>
                                  </div>
                                </ul>
                                <div className="link-adv-search">
                                  <NavLink to="/">SEARCH</NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="c-toggle__menu">
                          <HamburgerMenu
                            isOpen={this.state.hamburgerMenuOpen}
                            menuClicked={() => this.handleToggleHamburgerMenu()}
                            width={30}
                            height={22}
                            strokeWidth={2}
                            rotate={0}
                            color='white'
                            borderRadius={0}
                            animationDuration={0.5}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-header-btm-nav">

            </div>
          </header>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  route: url => dispatch(push(url)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
