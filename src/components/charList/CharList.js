import { Component } from "react";
import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    charList: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  marvelService = new MarvelService();

  updateChar = () => {
    this.setState({ loading: true, error: false });
    const id = Math.floor(Math.random() * (1009478 - 1011196) + 1011196);
    this.marvelService
      .getCharacter(id) // выводит промис
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { onCharSelected } = this.props;
    return (
      <div className="char__list">
        <ul className="char__grid">
          {this.state.charList.map((item) => {})}
          {/* <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li> */}
          <li className="char__item char__item_selected">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
