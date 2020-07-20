/* global fetch */

async function get () {
  try {
    const res = await fetch('/data/schellinkhout')
    const data = await res.json()

    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

export default {
  get
}
