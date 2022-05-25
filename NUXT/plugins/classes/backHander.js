import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import backType from "./backType";
export default class backHandler {
  constructor() {
    this.backStack = []; // This should only contain instances of backType. Any other type will be ignored.
    if (Capacitor.getPlatform() != "web") this.startUp(); // Only run on native platforms.
  }

  startUp() {
    this.reset();

    // Add a listener for the back button.
    this.backHandler = CapacitorApp.addListener("backButton", (context) => {
      this.back(context);
    });

    // Start garbage collection. Run every 5 minutes.
    setInterval(() => {
      () => {
        this.garbageCollect;
      };
    }, 5 * 60 * 1000);
  }

  reset() {
    this.backStack = [];
  }

  back({ canGoBack }) {
    console.log("backStack", this.backStack);
    // Check if backStack contains any backType objects. If so, call the goBack() function.
    if (this.backStack.length > 0) {
      // Loop through the backStack array.
      let lastResult = false;
      while (!lastResult && this.backStack.length > 0) {
        const backAction = this.backStack.pop();
        lastResult = backAction.goBack();
      }
      // Since a function was successfully called, no need to continue.
      if (lastResult) return;
    }
    if (!canGoBack) {
      // If we can't go back, then we should exit the app.
      CapacitorApp.exitApp();
    } else {
      // If we can go back, then we should go back.
      window.history.back();
    }
  }

  addAction(callback) {
    if (callback instanceof backType) {
      this.backStack.push(callback);
    } else {
      throw new TypeError("backType object expected");
    }
  }

  // Loops through the backStack array if array larger than 10. If backType.check() returns false, then remove it from the backStack array.
  garbageCollect() {
    if (this.backStack.length > 10) {
      this.backStack = this.backStack.filter((backType) => backType.check());
    }
  }
}
