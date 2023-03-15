class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=2b39d06a5ecb2e17f075f52c34aa5a2b";
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  // отображение всех персонажей
  getAllCharacters = () => {
    return this.getResource(
      "https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=2b39d06a5ecb2e17f075f52c34aa5a2b"
    );
  };

  //поиск по id
  getCharacter = (id) => {
    return this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
  };
}

export default MarvelService;
