// import "./main.css"
import cssStyles from "./main.css"
import lessStyles from "./main.less"
import sassStyles from "./main.scss"
import component from "./component"


document.body.appendChild(component("Hello world 1", cssStyles.redButton))
document.body.appendChild(component("Hello world 2", lessStyles.redButton))
document.body.appendChild(component("Hello world 3", sassStyles.redButton))
