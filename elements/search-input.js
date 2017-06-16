// Element: searchInput 
//
// We can use bel instead of choo/html to keep elements modular
// and allow them to easily move outisde of the app.
const html = require('bel')

const searchInput = (state, send) => {
  const update = e => send('update', { value: e.target.value })

  return html`<input type="text" oninput=${update} />`
}

module.exports = searchInput
