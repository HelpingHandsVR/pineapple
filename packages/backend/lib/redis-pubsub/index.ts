import { RedisPubSub } from 'graphql-redis-subscriptions'
import { getConfig } from '../config/coerce'
import { BaseEntity } from 'typeorm'

const config = getConfig(process.env)

export const createRedisPubsub = (): RedisPubSub => {
  return new RedisPubSub({
    connection: config.redis,
  })
}

export const pubsub = createRedisPubsub()

export enum PubsubTopic {
  EntityUpdate = 'ENTITY_UPDATE',
  EntityInsert = 'ENTITY_INSERT',
}

export const buildEntityTopic = (room: PubsubTopic, entity: typeof BaseEntity): string => {
  return `${room}/${entity.name}`
}
