/* eslint-disable n/no-path-concat */
import 'module-alias/register'
import { addAliases } from 'module-alias'

addAliases({
  '@modules': `${__dirname}/modules`,
  '@config': `${__dirname}/config`,
  '@shared': `${__dirname}/shared`,
  '@errors': `${__dirname}/errors`,
  '@utils': `${__dirname}/utils`
})
