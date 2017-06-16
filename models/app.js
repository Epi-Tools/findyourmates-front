module.exports = {
  state: {
    /* initial values of state inside the model */
    // title: 'Set the title'
    mates: [],
    search: ''
  },
  reducers: {
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (state, data) => ({ search: data.value }),
    updateMates: (state, data) => ({ mates: data })
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    /*
    myEffect: function (state, data, send, done) {
      // do stuff
    }*/
    fetchMates: (data, state, send, done) => fetch('http://127.0.0.1:3000/api/mates')
      .then(resp => resp.json())
      .then(body => send('updateMates', body.data, done))
  },
  subscriptions: {
    // asynchronous read-only operations that don't modify state directly.
    // Can call actions. Signature of (send, done).
    getMates: (send, done) => setInterval(() => send('fetchMates', {}, err => done(err)), 1000)
  }
}
