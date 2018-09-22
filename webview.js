module.exports = Franz => {
  const labelNumberExpr = /\(([0-9]+)\)/

  Franz.loop(() => {
    try {
      const unread = document.getElementsByClassName('unrd')
      if (!unread || unread.length < 2) {
        throw 'can not find unread label in document'
      }
      const label = unread[1]
      const matchResult = labelNumberExpr.exec(label.innerText)
      if (!matchResult || matchResult.length < 2) {
        throw 'unexpected label content'
      }
      const count = parseInt(matchResult[1], 10)
      if (isNaN(count) || count < 0) {
        throw 'error parsing number of mails'
      }
      Franz.setBadge(count)
    } catch (e) {
      console.warn('failed to determine number of unread messages:')
      console.warn(e)
      console.warn('try to update plugin')
    }
  })
}
