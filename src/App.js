import { Formik, Form, Field } from 'formik'
import './App.css'
import './css/header.css'
import './css/content.css'
import './css/article.css'
import { useState } from 'react'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = (url) => window.open(url)
  console.log({ photos })
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    'Client-ID {INSERT YOUR API KEY HERE},
                },
              },
            )
            const data = await response.json()
            // llamar api de unsplash
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search"></Field>
          </Form>
        </Formik>
      </header>

      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} S />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
