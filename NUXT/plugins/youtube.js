const module = {
  test() {
    return "success";
  }
}

export default ({ app }, inject) => {
  inject('youtube', module)
}
