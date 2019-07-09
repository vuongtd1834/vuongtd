export default class GlobalStaticVariable {
  static navigation = "order"
  static backPageRouter = "back"
  static backFromScreen12 = true
  static disableButton = {}
  static historyUrl =''
  static parentUrl =''
  static oldRouter = []

  static setNavigation(navigation) {
    this.navigation = navigation
  }

  static setBackRouter(backPageRouter) {
    this.backPageRouter = backPageRouter
  }

  static setBackFromScreen12(backFromScreen12) {
    this.backFromScreen12 = backFromScreen12
  }

  static setDisableButton(key, condition) {
    this.disableButton = {};
    this.disableButton[key] = condition
  }

  static setHistoryUrl(url) {
    this.historyUrl = url
  }

  static setParentUrl(url) {
    this.parentUrl = url
  }

  static setListRouter(oldRouter, resetFlag) {
    if (resetFlag) {
      this.oldRouter = []
    } else {
      this.oldRouter.push(oldRouter)
    }
  }
}
