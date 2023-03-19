import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  // state = {
  //   name: null,
  //   description: null,
  //   thumbnail: null,
  //   homepage: null, //"type": "detail",
  //   wiki: null, //"type": "wiki",
  // };

  state = {
    char: {},
    loading: true,
    error: false,
  };

  //создаем новый метод на основе класса MarvelService, теперь доступны методы из этого класса здесь
  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    // const id = 1017100;
    const id = Math.floor(Math.random() * (1009478 - 1011196) + 1011196);

    // this.marvelService //достаем метод getCharacter(id) из MarvelService
    //   .getCharacter(id) // выводит промис
    //   .then((res) => {
    //     // this.setState({
    //     //   name: res.data.results[0].name,
    //     //   description: res.data.results[0].description,
    //     //   thumbnail:
    //     //     res.data.results[0].thumbnail.path +
    //     //     "." +
    //     //     res.data.results[0].thumbnail.extension,
    //     //   homepage: res.data.results[0].urls[0].url,
    //     //   wiki: res.data.results[0].urls[1].url,
    //     // });
    //     this.setState(res);
    //   });

    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    // const { name, description, thumbnail, homepage, wiki } = this.state;
    // const {
    //   char: { name, description, thumbnail, homepage, wiki },
    // } = this.state;
    const {
      // char: { name, description, thumbnail, homepage, wiki },
      char,
      loading,
      error,
    } = this.state;

    // //условный рендеринг
    // if (loading) {
    //   return <Spinner />;
    // }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const contetnt = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {/* {loading ? <Spinner /> : <View char={char} />} */}
        {errorMessage}
        {spinner}
        {contetnt}
        {/* <div className="randomchar__block">
          <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">Wiki</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div> */}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  const descriptionHas = description
    ? description
    : "There is no description for this character";

  const descriptionLength =
    descriptionHas.length < 210
      ? description
      : descriptionHas.slice(0, 210) + "...";

  const commonDescription = descriptionLength
    ? descriptionLength
    : "There is no description for this character";

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>

        <p className="randomchar__descr">{commonDescription}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Wiki</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
