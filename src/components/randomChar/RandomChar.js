import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  // constructor(props) {
  //   super(props);
  // }

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

  componentDidMount() {
    this.updateChar();
  }

  componentWillUnmount() {
    // clearInterval(this.timID)
  }

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
    this.setState({ loading: true, error: false });
    const id = Math.floor(Math.random() * (1009478 - 1011196) + 1011196);
    this.marvelService
      .getCharacter(id) // выводит промис
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

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const contetnt = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {/* {loading ? <Spinner /> : <View char={char} />} */}
        {errorMessage}
        {spinner}
        {contetnt}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>

          <button onClick={this.updateChar} className="button button__main">
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
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  //проверка на количество символов в тексте
  const descriptionLength =
    description.length < 210 ? description : description.slice(0, 210) + "...";

  const commonDescription = descriptionLength
    ? descriptionLength
    : "There is no description for this character";

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
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
