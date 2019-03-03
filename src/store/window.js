import throttle from 'lodash.throttle'

function getWindowDimension() {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

export default {
  namespaced: true,
  state: {
    width: 0,
    height: 0
  },
  mutations: {
    dimension(state, { width, height }) {
      state.width = width
      state.height = height
    }
  },
  actions: {
    register({ commit }) {
      commit('dimension', getWindowDimension())
      window.addEventListener(
        'resize',
        throttle(
          e => {
            commit('dimension', getWindowDimension())
          },
          100,
          { leading: true }
        )
      )
    }
  },
  getters: {
    isSmall(state) {
      return state.width <= 767
    },
    isMedium(state) {
      return state.width >= 768 && state.width <= 1023
    },
    isLarge(state) {
      return state.width >= 1024
    }
  }
}
