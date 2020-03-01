import throttle from 'lodash.throttle'

function getWindowDimension() {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

function setDocHeight() {
  // On mobile browser, address bar is sometimes visible and sometimes hidden, changing the visible size of the viewport
  document.body.style.setProperty('--vh', `${window.innerHeight}px`)
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
      setDocHeight()
      commit('dimension', getWindowDimension())
      window.addEventListener(
        'resize',
        throttle(
          e => {
            setDocHeight()
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
      return state.width <= 599
    },
    isMedium(state) {
      return state.width >= 600 && state.width <= 1050
    },
    isLarge(state) {
      return state.width >= 1051
    }
  }
}
