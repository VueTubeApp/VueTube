// This is the class that populates the backStack array in the backHandler class.
export default class backType {
  constructor(callback, check) {
    this.callback = callback;
    this.check = check || (() => true);
  }

  goBack() {
    if (this.check()) {
      this.callback();
      return true;
    } else {
      return false;
    }
  }
}
