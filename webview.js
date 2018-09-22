module.exports = Franz => {
  function setNumberOfUnreadMails(numberText) {
    const count = parseInt(numberText, 10)
    if (isNaN(count) || count < 0) {
      throw 'error parsing number of mails'
    }
    Franz.setBadge(count)
  }
  
  function trySetNumberOfUnreadMailsForLightApp() {
    numberLabels = document.getElementsByClassName('unrd')
    
    if (numberLabels.length === 0) {
      return false
    }

    if (numberLabels.length < 2) {
      throw 'bad number of unread labels'
    }
    const label = numberLabels[1]

    const labelNumberExpr = /\(([0-9]+)\)/
    const matchResult = labelNumberExpr.exec(label.innerText)
    if (!matchResult || matchResult.length < 2) {
      throw 'unexpected label content'
    }

    setNumberOfUnreadMails(matchResult[1])
    return true
  }

  function trySetNumberOfUnreadMailsForFullApp() {
    numberLabel = document.getElementById('spnCV')
    if (!numberLabel) {
      return false
    }
    
    setNumberOfUnreadMails(numberLabel.innerText)
    return true
  }

  Franz.loop(() => {
    try {
      if (trySetNumberOfUnreadMailsForLightApp()) {
        return
      } 
      
      if (trySetNumberOfUnreadMailsForFullApp()) {
        return
      }

      throw 'unknown app version'
    } catch (e) {
      console.warn('failed to determine number of unread messages:')
      console.warn(e)
      console.warn('try to update plugin')
    }
  })
}
