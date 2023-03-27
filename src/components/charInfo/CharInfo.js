import { Component } from "react";
import "./charInfo.scss";

import MarvelService from "../../services/MarvelService";
import Spinner from "../../components/spiner/Spiner";
import Skeleton from "../../components/skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    erorr: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  updateChar = () => {
    const { charID } = this.props;
    if (!charID) {
      return;
    }
    this.onCharLoading();

    this.marvelService
      .getCharacter(charID) // выводит промис
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  //успешная загрузка
  onCharLoaded = (char) => {
    this.setState({
      // char,
      char: this.props.charID,
      loading: false,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const noComics = "There is no comics with this character";
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className={description}></div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.items.length > 0 ? (
          [...comics.items].splice(10, comics.items.length - 10).map((item) => (
            <li className="char__comics-item" key={item.id}>
              <a href={item.resourceURI}>{item.name}</a>
            </li>
          ))
        ) : (
          <div>{noComics}</div>
        )}
      </ul>
    </>
  );
};

export default CharInfo;
