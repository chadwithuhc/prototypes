let uid = 5

export default {

  uid() {
    return uid++
  },

  seeds: [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
    { id: 4, name: 'Four' },
  ]

}
