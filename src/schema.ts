import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema } from 'nexus'
import * as types from './types'

export const schema = makeSchema({
  types: types,
  // @ts-ignore
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})