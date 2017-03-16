
export default function (text = "Hello world", className) {

  const element = document.createElement("div")

  element.innerHTML = text
  element.className = className

  return element
}
