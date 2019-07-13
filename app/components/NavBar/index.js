import React from 'react'

import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import mgLogo from '../../images/farmto-table4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HamburgerMenu from "react-hamburger-menu"

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

  handleOpenHamburgerMenu () {
    this.setState(state =>({
      hamburgerMenuOpen: !state.hamburgerMenuOpen
    }))
  }

  render() {
    return (
      <div className='nav-header'>
          <header className="site-header">
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
                            menuClicked={() => this.handleOpenHamburgerMenu()}
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
            <div className={`mobile-menu menu-collapse off-canvas ${this.state.hamburgerMenuOpen ? 'active' : ''}`}>
              <div className="close-nav">
                <button className="menu_icon__close">
                  <span></span> <span></span>
                </button>
              </div>
              <div className="c-modal_item">
                <span className="c-modal_sign-in">
              <a href="javascript:void(0)" className="btn-active-modal">Sign in</a>
                </span>
                      <span className="c-modal_sign-up">
                    <a href="javascript:void(0)"  className="btn-active-modal">Sign up</a>
                </span>
              </div>
              <nav className="off-menu">
                <ul id="menu-main-menu-1" className="nav navbar-nav main-navbar"><li id="nav-menu-item-360" className="main-menu-item menu-item-depth-0 menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item"><a href="/" className="menu-link  main-menu-link">Trang Chủ </a></li>
                  <li id="nav-menu-item-610" className="main-menu-item menu-item-depth-0 menu-item menu-item-type-post_type menu-item-object-page"><a href="http://truyenz.info/manga/" className="menu-link  main-menu-link">Manga </a></li>
                  <li id="nav-menu-item-576" className="main-menu-item menu-item-depth-0 menu-item menu-item-type-post_type menu-item-object-page"><a href="http://truyenz.info/blog/" className="menu-link  main-menu-link">BLOG </a></li>
                  <li id="nav-menu-item-597" className="main-menu-item menu-item-depth-0 menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children parent dropdown hiden-sub-canvas"><a href="http://truyenz.info/cua-hang/" className="menu-link dropdown-toggle disabled main-menu-link" data-toggle="dropdown">Cửa Hàng </a>
                    <ul className="dropdown-menu menu-depth-1">
                      <li id="nav-menu-item-706" className="sub-menu-item menu-item-depth-1 menu-item menu-item-type-taxonomy menu-item-object-product_cat"><a href="http://truyenz.info/danh-muc/truyen-tranh/" className="menu-link  sub-menu-link">Truyện tranh </a></li>
                    </ul>
                    <i className="fa fa-caret-right" aria-hidden="true"></i></li>
                </ul>
              </nav>
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
