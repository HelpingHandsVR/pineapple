import pkg from '@/package.json'

export const userAgent = `Pineapple/${pkg.version} (+decentm+pineapple-ua@decentm.com) (+environment:${process.env.NODE_ENV})`
