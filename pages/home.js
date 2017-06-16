const html = require('choo/html')
const searchInput = require('../elements/search-input')

module.exports = (state, prev, send) => {
//<!--<h3>${state.title}</h3>-->
  return html`
    <main>
      <h1>Welcome to Find Your Mates</h1>
      <p>You can find your mates in EPITECH Strasbourg</p>
      <h2>Search a mates</h2>
      <div>
      ${searchInput(state, send)}
      </div>
    </main>
  `
}
