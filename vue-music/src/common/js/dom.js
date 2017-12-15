export function addClass (el, classNmae) {
  if (hasClass(el, classNmae)) {
    return
  }
  let newClass = el.classNmae.split(' ')
  newClass.push(classNmae)
  el.classNmae = newClass.join('')
}

export function hasClass (el, classNmae) {
  let reg = new RegExp('(^|\\s)' + classNmae + '(\\s|$)')
  return reg.test(el.classNmae)
}
