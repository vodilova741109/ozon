const getData = () => {
  return fetch('https://test-162b2-default-rtdb.firebaseio.com/goods.json')
  .then((response) => {
      return response.json()
  })
}

//return fetch(`https://test-162b2-default-rtdb.firebaseio.com/goods.json?${str ? `search=${str}` : ''}`)

export default getData