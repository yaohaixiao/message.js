const clear = (instances) => {
  let i = instances.length - 1
  for (; i >= 0; i--) {
    instances[i].close()
  }
}

export default clear
