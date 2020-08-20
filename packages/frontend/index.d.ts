import Vue from 'vue'
import Tracker from '@asayerio/tracker'

declare module '*.png' {
  const value: string
  export = value;
}

declare module '*.jpg' {
  const value: string
  export = value;
}

declare module 'vue/types/vue' {
  interface Vue {
    $asayer: Tracker
  }
}
