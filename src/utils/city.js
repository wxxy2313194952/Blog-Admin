import Cookies from 'js-cookie'

const cityKey = 'city'

export function getCity() {
  return Cookies.get(cityKey)
}

export function setCity(city) {
  return Cookies.set(cityKey, city)
}



