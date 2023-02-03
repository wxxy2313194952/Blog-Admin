import Bowser from "bowser";
const browser = Bowser.getParser(window.navigator.userAgent);

let Access = {
  getBrowserName () {
    return browser.getBrowserName()
  },
  getPlatformType () {
    return browser.getPlatformType()
  },
  getOSName () {
    return browser.getOSName()
  },
  getOSVersion () {
    return browser.getOSVersion()
  },
  getBrowserVersion () {
    return browser.getBrowserVersion()
  },

}

export default Access

