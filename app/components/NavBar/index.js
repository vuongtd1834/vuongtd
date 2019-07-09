import React, {PureComponent} from 'react'
import {NavLink} from 'react-router-dom'
import {Grid, Modal, Button} from 'react-bootstrap'

// Redux
import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import _ from 'lodash'

import './styles'
import ApplicationRedux from 'reducers/ApplicationRedux'
import GlobalStaticVariable from '../GlobalStaticVariable'
import {detect} from 'detect-browser'
import ProviderRedux from 'reducers/ProviderRedux'
import ContractActions from 'reducers/ContractRedux'

class NavBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      menuIsOpen: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.waitLogoutFinish === true) {
      window.open('', '_self', '').close()
    }
    if (GlobalStaticVariable.disableButton.btnOrderList) {
      this.handlerCallAPiOrderList(nextProps.orderFetching);
    }
    if (GlobalStaticVariable.disableButton.btnListProduct) {
      this.handlerCallAPiCatalogs(nextProps.providerFetching);
    }

  }

  componentDidUpdate() {
    const modalElement = document.getElementsByClassName("modal-content")
    if (!_.isNil(modalElement[0]) && this.state.modeShow) {
      modalElement[0].classList.add("modal-nav-custom")
    }
  }

  handlerCallAPiOrderList(orderFetching) {
    if (!orderFetching && this.fetchingFlag) {
      this.fetchingFlag = false
      setTimeout(() => {
        GlobalStaticVariable.setDisableButton("btnOrderList", null)
        this.forceUpdate();
      }, 500);
    } else {
      this.fetchingFlag = true
      GlobalStaticVariable.setDisableButton("btnOrderList", true)
    }
  }

  handlerCallAPiCatalogs(catalogFetching) {
    if (!catalogFetching && this.fetchingFlag) {
      this.fetchingFlag = false
      setTimeout(() => {
        GlobalStaticVariable.setDisableButton("btnListProduct", null)
        this.forceUpdate();
      }, 500);
    } else if (catalogFetching) {
      this.fetchingFlag = true
      GlobalStaticVariable.setDisableButton("btnListProduct", true)
    }
  }


  render() {
    const {session, needTermsAgreement} = this.props
    let role = null
    if (session) {
      role = session.role
    }

    let showNavbar = true
    let showNotifyBar = !!this.props.contractActivation

    const {pathname} = this.props.location;
    if (
      role === null
      || _.startsWith(pathname, '/sso')
      || _.startsWith(pathname, '/order/create/store-select')
      || _.startsWith(pathname, '/order/create/item-select')
      || _.startsWith(pathname, '/order/create/product-select')
      || _.startsWith(pathname, '/order/create/order-form')
      || _.startsWith(pathname, '/order/create/order-confirm')
      || _.startsWith(pathname, '/setting/company')
      || _.startsWith(pathname, '/setting/hiring')
      || _.startsWith(pathname, '/setting/merit')
      || (needTermsAgreement && pathname === '/')
    ) {
      showNavbar = false
      showNotifyBar = false
    } else if (
      _.startsWith(pathname, '/setting/complete')
    ) {
      showNotifyBar = false
    }

    const orderMenuActive = _.startsWith(pathname, '/order') || pathname === '/'
    let catalogMenuActive = false
    // console.log('this.props.location.pathname', this.props.location.pathname)
    // console.log('GlobalStaticVariable.historyUrl', GlobalStaticVariable.historyUrl)
    // if(this.props.location.pathname.includes('contract/list') || this.props.location.pathname.includes('list-product')){
    //   this.props.setUrl(this.props.location.pathname)
    // }
    if(this.props.location.pathname.includes('media-service-infomation') || this.props.location.pathname.includes('item-table') || this.props.location.pathname.includes('contract/detail')){
      if(this.props.location.pathname.includes('contract/detail')){
        if(this.props.parentUrl.includes('/contract/list')){
          catalogMenuActive = false
        } else {
          catalogMenuActive = true
        }
      } else if(this.props.parentUrl.includes('/contract/list')){
        catalogMenuActive = false
      } else {
        catalogMenuActive = true
      }

    } else {
      catalogMenuActive = _.startsWith(pathname, '/list-product')
        || _.startsWith(pathname, '/product-table-register')
    }
    // console.log('parentUrl', this.props.parentUrl)
    // console.log('catalogMenuActive', catalogMenuActive)
    // GlobalStaticVariable.setHistoryUrl(this.props.location.pathname)
    const navbar = (
      <ul className='tab mgt5'>
        <li className={`nav-bar-tab ${orderMenuActive && 'active'} ${detect().name === "ie" && detect().version.indexOf("9.0") !== -1 && 'ie9-border'}`}>
          <NavLink to='/order/list'
            onClick={() => {
              if (_.isNil(GlobalStaticVariable.disableButton.btnOrderList)) {
                GlobalStaticVariable.setDisableButton("btnOrderList", true)
                GlobalStaticVariable.setNavigation("navigation")
                GlobalStaticVariable.setBackRouter("notBack")
              }
            }}>媒体発注管理</NavLink>
        </li>
        {
          role === 'HR' && (
            <li className={`nav-bar-tab ${catalogMenuActive && 'active'} ${detect().name === "ie" && detect().version.indexOf("9.0") !== -1 && 'ie9-border'}`}>
              <NavLink to='/list-product'
                onClick={() => {
                  this.props.clearProviderStateFields('positionDetails')
                  if (_.isNil(GlobalStaticVariable.disableButton.btnListProduct)) {
                    GlobalStaticVariable.setDisableButton("btnListProduct", true)
                    GlobalStaticVariable.setNavigation("navigation")
                    GlobalStaticVariable.setBackRouter("notBack")
                    GlobalStaticVariable.setListRouter(null, true)
                  }
                }}>カタログ</NavLink>
            </li>
          )
        }
        <li className={`nav-bar-tab nav-disabled ${this.state.menuIsOpen ? '' : 'no-hover'}`}
          onClick={e => {
            if (this.clickParentMenu) {
              this.setState({menuIsOpen: !this.state.menuIsOpen})
            }
            this.clickParentMenu = true
          }}
          onMouseEnter={e => {
            this.clickParentMenu = false
            this.setState({menuIsOpen: true})
          }}
        >
          <a className="active" style={{cursor: "pointer"}}>
            {/* <Glyphicon glyph="menu-hamburger"/> */}
          </a>
          <ul style={{width: role === 'SHOP' ? 240 : 300}}>
            {
              role === 'HR' && (
                <li className='nav-bar-item'>
                  <NavLink to='/contract/list' className="a-tag-one" onClick={() => {
                    GlobalStaticVariable.setNavigation("navigation")
                    GlobalStaticVariable.setBackRouter("notBack")
                    this.clickParentMenu = false
                    this.setState({menuIsOpen: false})
                    GlobalStaticVariable.setListRouter(null, true)
                    this.props.clearContractFields('positionContract')
                  }}>契約状況</NavLink>
                </li>
              )
            }
            {
              role === 'HR' && (
                <li className='nav-bar-item'>
                  <NavLink to='/billing-report' className="a-tag-one" onClick={() => {
                    GlobalStaticVariable.setNavigation("navigation")
                    GlobalStaticVariable.setBackRouter("notBack")
                    this.clickParentMenu = false
                    this.setState({menuIsOpen: false})
                  }}>発注レポート</NavLink>
                </li>
              )
            }
            {
              role === 'HR' && (
                <li className='nav-bar-item'>
                  <NavLink to='/image-manager' className="a-tag-one" onClick={() => {
                    GlobalStaticVariable.setNavigation("navigation")
                    GlobalStaticVariable.setBackRouter("notBack")
                    this.clickParentMenu = false
                    this.setState({menuIsOpen: false})
                  }}>画像登録</NavLink>
                </li>
              )
            }
            <li className='nav-bar-item'>
              <NavLink to='/terms-of-contract' className="a-tag-one" onClick={() => {
                GlobalStaticVariable.setNavigation("navigation")
                GlobalStaticVariable.setBackRouter("notBack")
                this.clickParentMenu = false
                this.setState({menuIsOpen: false})
              }}>利用規約</NavLink>
            </li>
            <li className='nav-bar-item sub-menu'
              onClick={e => {
                e.stopPropagation()
                this.clickParentMenu = false
              }}>
              {/* <NavLink to='#' onClick={() => {
                GlobalStaticVariable.setNavigation("navigation")
                GlobalStaticVariable.setBackRouter("notBack")
                this.setState({menuIsOpen: false})
                this.clickParentMenu = false
              }}>操作マニュアル</NavLink> */}
              <a className="sub-menu-atag a-tag-one">マニュアル</a>
              <ul>
                {
                  role === "HR" && <li>
                    <NavLink to='/api/storage/manual/操作マニュアル（管理者編）.pdf' target="_blank" onClick={() => {
                      GlobalStaticVariable.setNavigation("navigation")
                      GlobalStaticVariable.setBackRouter("notBack")
                      this.clickParentMenu = false
                      this.setState({menuIsOpen: false})
                    }}>操作マニュアル（管理者編）</NavLink>
                  </li>
                }
                {
                  (role === "HR" || role === "SV") && <li>
                    <NavLink to='/api/storage/manual/操作マニュアル（承認ワークフロー編）.pdf' target="_blank" onClick={() => {
                      GlobalStaticVariable.setNavigation("navigation")
                      GlobalStaticVariable.setBackRouter("notBack")
                      this.clickParentMenu = false
                      this.setState({menuIsOpen: false})
                    }}>操作マニュアル（承認ワークフロー編）</NavLink>
                  </li>
                }
                <li>
                  <NavLink to='/api/storage/manual/操作マニュアル（掲載依頼編）.pdf' target="_blank" onClick={() => {
                    GlobalStaticVariable.setNavigation("navigation")
                    GlobalStaticVariable.setBackRouter("notBack")
                    this.clickParentMenu = false
                    this.setState({menuIsOpen: false})
                  }}>操作マニュアル（掲載依頼編） </NavLink>
                </li>
              </ul>
            </li>
            <li className='nav-bar-item'>
              <NavLink to='#' className="a-tag-one" onClick={() => {
                this.clickParentMenu = false
                this.props.logout()
              }}>アプリを閉じる</NavLink>
            </li>
          </ul>
        </li>
      </ul>
    )

    return (
      <div className='navbar'>
        {showNotifyBar && (
          <div className='notification-bar'>
            契約状況に進捗があります
            <NavLink
              to='/contract/list'
              onClick={() => {
                GlobalStaticVariable.setNavigation("navigation")
                GlobalStaticVariable.setBackRouter("notBack")
              }}
            >確認する</NavLink>
          </div>
        )}
        <Grid>
          <img src={require('images/logo.png')} className='logo' />
          {showNavbar ? navbar : null}
          {/* <Modal
            show={this.state.modeShow}
            onHide={() => this.setState({modeShow: false})}>
            <Modal.Header>
              <Modal.Title>
                <b>
                  確認
                </b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong>
                ハイソル媒体発注を閉じます。よろしいですか。
              </strong>
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col xsOffset={3} xs={3}>
                  <Button bsStyle="reset" bsSize="sm" block onClick={() => this.setState({modeShow: false})}>戻る</Button>
                </Col>
                <Col xs={3}>
                  <Button bsStyle="primary" bsSize="sm" block onClick={() => this.props.logout()}>
                    {'閉じる'}
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal> */}
          <Modal
            show={this.state.modeShow}
            onHide={() => this.setState({modeShow: false})}
            aria-labelledby="contained-modal-title"
            className="root-confirm-dialog">
            <Modal.Body>
              <div className="dptable mgt10">
                {/* <div className="dpilb dptcell w20p"><Glyphicon glyph="question-sign" /></div> */}
                <div className="dpilb w100p pdt2"><strong>ログアウト確認</strong></div>
                <div>ログアウトします。よろしいですか？</div>
              </div>
            </Modal.Body>
            <div className="tar mgr10 mgb10">
              <Button bsStyle="danger" className="mgr10" onClick={() => {
                this.setState({modeShow: false})
                this.props.logout()
              }}>ログアウト</Button>
              <Button bsStyle="reset" style={{paddingTop: '6px', paddingBottom: '6px'}} onClick={() => this.setState({modeShow: false})}>キャンセル</Button>
            </div>
          </Modal>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  waitLogoutFinish: state.application.waitLogoutFinish,
  session: state.application.session,
  contractActivation: state.application.contractActivation,
  orderFetching: state.order.searching,
  orders: state.order.orders,
  providerFetching: state.provider.fetching,
  parentUrl: state.url.parentUrl

})

const mapDispatchToProps = dispatch => ({
  route: url => dispatch(push(url)),
  logout: () => dispatch(ApplicationRedux.logout()),
  clearSessionField: field => dispatch(ApplicationRedux.clearSessionField(field)),
  clearProviderStateFields: fields => dispatch(ProviderRedux.clearProviderStateFields(fields)),
  clearContractFields: params => dispatch(ContractActions.clearContractFields(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
