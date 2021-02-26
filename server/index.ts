import express from 'express'
import axios from 'axios'
import parser from 'fast-xml-parser'
import { ItemEntry } from './types/'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3001


interface Availability {
  id: string,
  DATAPAYLOAD: string
}

app.get('/api/:category', (req, res) => {
  const category = req.params.category
  axios({
    method: 'get',
    url: `https://bad-api-assignment.reaktor.com/v2/products/${category}`
  })
    .then(category_res => {
      // turn the array of manufacturers into a set (SETs only contain unique entries) and back to array
      const manufacturers: Array<string> = Array.from(new Set(category_res.data.map((item: ItemEntry) => item.manufacturer)))
      const requests = manufacturers.map((manufacturer: string) => axios.get(`https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`))

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
          console.error(err)
        })
    })
    .catch(err => {
      console.error(err.message)
      return res.status(200).json(err)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});