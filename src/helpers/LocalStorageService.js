const LocalStorageService = (function () {
  let _service
  function _getService() {
    if (!_service) {
      _service = this
      return _service
    }
    return _service
  }
  function _setToken(tokenObj) {
    localStorage.setItem('token', tokenObj.token)
    localStorage.setItem('refreshToken', tokenObj.refreshTokenJWT)
  }
  function _getAccessToken() {
    return localStorage.getItem('token')
  }
  function _getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }
  function _clearToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  }
})()
export default LocalStorageService
