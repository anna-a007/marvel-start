import { Component } from "react";

import Spinner from "../../components/spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false, //loading для кнопки
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    // this.getChars();
    this.onRequest();
  }

  // getChars = () => {
  //   // this.setState({ loading: true, error: false });
  //   this.marvelService //получаем данные
  //     .getAllCharacters() // выводит промис
  //     .then(this.onCharLoaded)
  //     .catch(this.onError);
  // };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService //получаем данные
      .getAllCharacters(offset) // выводит промис
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharLoaded = (char) => {
    this.setState({
      charList: char,
      loading: false,
    });
  };

  //когда произошла загрузка
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
          //вытаскивает id по клику
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } =
      this.state;

    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          onClick={() => this.onRequest(offset)}
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
