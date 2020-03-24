import Vue from 'vue'

export const EventBus = new Vue()

export function waitFor(timeout = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}
