import Vue from 'vue'
import { abilitiesPlugin, Can } from '@casl/vue'

import { defaultAbility } from '~/ability'

Vue.use(abilitiesPlugin, defaultAbility)
Vue.component('can', Can)
