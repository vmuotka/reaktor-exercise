import express from 'express'
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import parser from 'fast-xml-parser'
import { ItemEntry } from './types/'
import path from 'path'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3001


interface Availability {
  id: string,
  DATAPAYLOAD: string
}

// the APIs have an internal cache of 5 minutes
// to lessen the loading times, but still serve closer to realtime data
// a cache of 2,5 minutes will be used for the app's backend
const cache = setupCache({
  maxAge: 2.5 * 60 * 1000
})

const api = axios.create({
  adapter: cache.adapter
})

app.get('/api/category/:category', (req, res) => {
  const category = req.params.category
  api({
    method: 'get',
    url: `https://bad-api-assignment.reaktor.com/v2/products/${category}`
  })
    .then(category_res => {
      // turn the array of manufacturers into a set (SETs only contain unique entries) and back to array
      const manufacturers: Array<string> = Array.from(new Set(category_res.data.map((item: ItemEntry) => item.manufacturer)))
      const requests = manufacturers.map((manufacturer: string) => api(`https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`))

      // get availability data for all of the manufacturers
      axios.all(requests)
        .then(axios.spread((...responses) => {
          category_res.data.forEach((cat: ItemEntry) => {
            const tempArr = responses[manufacturers.findIndex((manufacturer: string) => manufacturer === cat.manufacturer)].data.response

            // parse the XML data to JSON and set the availability
            if (Array.isArray(tempArr)) {
              let availability = tempArr.find((availability: Availability) => availability.id.toLowerCase() === cat.id).DATAPAYLOAD
              availability = parser.parse(availability)
              cat.availability = availability.AVAILABILITY.INSTOCKVALUE
            } else
              cat.availability = 'FAILED TO RETRIEVE DATA'
          })

          return res.status(200).json(category_res.data)
        }
        ))
        .catch(err => {
          console.error(err.message)
          return res.status(500).json(err)
        })
    })
    .catch(err => {
      console.error(err.message)
      return res.status(500).json(err)
    })
})

// in production, serve the react-app build to client
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});