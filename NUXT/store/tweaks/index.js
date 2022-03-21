export const state = () => ({
    roundTweak: 0
})
export const mutations = {
    initTweaks(state) {
        // NOTE: localStorage is not reactive, so it will only be used on first load
        // currently called beforeCreate() in pages/default.vue
        if (process.client) {
            state.roundTweak = localStorage.getItem("roundTweak") || 0
        }
    },
    setRoundTweak (state, payload) {
        if (!isNaN(payload)) {
            state.roundTweak = payload
            localStorage.setItem("roundTweak", payload)
        }
    }
}