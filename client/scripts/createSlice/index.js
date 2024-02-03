import createTemplate from './templates/createTemplate.js'

const layer = process.argv[2]
const sliceName = process.argv[3]

const layers = ['widgets', 'features', 'entities', 'pages', 'shared/ui']

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`)
}

if (!sliceName) {
  throw new Error('Укажите название слайса')
}

createTemplate(layer, sliceName)
