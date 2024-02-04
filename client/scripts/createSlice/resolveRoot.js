import { resolve } from 'path'

export default (...segments) => resolve(new URL('.', import.meta.url).pathname, '..', '..', ...segments)
