// Element: mates 
//
// We can use bel instead of choo/html to keep elements modular
// and allow them to easily move outisde of the app.
const html = require('bel')

const mates = (state, send) => html`
  <div onload=${() => send('fetchMates')}>
    <h4>List of Mates:</h4>
    <ul>
      ${state.mates.map(e => html`<li>${e.name} - <em>${e.room}</em></li>`)}
    </ul>
  </div>
`

module.exports = mates
