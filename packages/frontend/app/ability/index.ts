import { Ability, AbilityClass } from '@casl/ability'
import { AbilityAction, AbilitySubject } from 'generated/composition'

export const defaultAbility = new Ability()

export type AppAbility = Ability<[AbilityAction, AbilitySubject]>
export const AppAbility = Ability as AbilityClass<AppAbility>
