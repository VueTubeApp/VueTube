import { App as CapacitorApp } from "@capacitor/app";
export default class backHandler {
    constructor() {
        this.backStack = []
    }

    back({ canGoBack }) {
        if (this.backStack.length > 0) {
            let lastResult = false
            while (!lastResult && this.backStack.length > 0) {
                const backAction = this.backStack.pop()
                lastResult = backAction()
            }
            if (lastResult) return
        }
        if (!canGoBack) {
            CapacitorApp.exitApp();
        } else {
            window.history.back();
        }
    }

    addAction(callback) {
        this.backStack.push(callback)
    }
}