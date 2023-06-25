import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Router from "./routes"
import { Provider } from "react-redux"
import { store } from "./redux/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>
)

// Todo: remove this when ready to deploy to production
if (window.location.pathname === "/") {
    window.location.replace("/gmao-front")
}
