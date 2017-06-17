const toUpper = (filter, ...e) => [ filter.toUpperCase(), e.map(e => ({ name: e.name.toUpperCase(), id: e.id  })) ]

const match = ([ filter, rest ]) => rest.filter(e => e.name.indexOf(filter) !== -1)

const bakeMatesFilter = (mates, upperMates) => mates.filter(e => upperMates.find(user => e.id === user.id))

const filterMates = (state, data, filter) => {
  const filterMates = state.mates
  const upperMates = match(toUpper(filter, ...filterMates))
  return bakeMatesFilter(state.mates ,upperMates)
}

module.exports = {
  state: {
    /* initial values of state inside the model */
    mates: [],
    firstMates: true,
    filterMates: [],
    search: ''
  },
  reducers: {
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (state, data) => {
      if (state.firstMates) return { search: data.value, filterMates: state.mates }
      return { search: data.value, filterMates: filterMates(state, data, data.value) }
    },
    updateMates: (state, data) => {
      if (state.firstMates) return { mates: data, filterMates: data, firstMates: false }
      if (JSON.stringify(state.mates) !== JSON.stringify(data)) return { mates: data, filterMates: data }
      return { mates: data }
    },
    search: (state, data) => {
      if (state.firstMates) return { search: state.search, filterMates: state.mates }
      return { search: data.value, filterMates: filterMates(state, data, state.search) }
    }
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    fetchMates: (data, state, send, done) => fetch('http://127.0.0.1:3000/api/mates')
      .then(resp => resp.json())
      .then(body => send('updateMates', body.data.mates, done))
  },
  subscriptions: {
    // asynchronous read-only operations that don't modify state directly.
    // Can call actions. Signature of (send, done).
    getMates: (send, done) => setInterval(() => send('fetchMates', {}, err => done(err)), 1000)
  }
}
