import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";
import "./style/style.scss";

const marvelService = new MarvelService();
// marvelService.getAllCharacters().then((json)=>console.log(json))
// marvelService.getCharacter(1011027).then((json)=>console.log(json))

//вывод только имен
// marvelService
// .getAllCharacters()
// .then((json) => json.data.results.forEach((item) => console.log(item.name))); //перебор данных и вывод

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
