import firstCharLowerCase from '../firstCharLowerCase.js'
import firstCharUpperCase from '../firstCharUpperCase.js'

export default (componentName) => `import cx from 'classix'

import clx from './${firstCharUpperCase(componentName)}.module.scss'

interface ${firstCharUpperCase(componentName)}Props {}

export const ${firstCharUpperCase(componentName)} = ({}: ${firstCharUpperCase(componentName)}Props) => {
  const ${firstCharLowerCase(componentName)}Class = cx(clx.button)

  return <button className={${firstCharLowerCase(componentName)}Class}>${componentName}</button>
}
`
