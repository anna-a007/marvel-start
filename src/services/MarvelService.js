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

  // // отображение всех персонажей
  // getAllCharacters = () => {
  //   return this.getResource(
  //     "https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=2b39d06a5ecb2e17f075f52c34aa5a2b"
  //   );
  // };
  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };//формируем новый массив с поля из объекта _transformCharacter

  // //поиск по id одного персонажа
  // getCharacter = (id) => {
  //   return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  // };
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}` // в res придет ответ от сервера
    );
    // return this._transformCharter(res);
    return this._transformCharter(res.data.results[0]);
  };

  // вынесли из RandomChar
  // _transformCharter = (res) => {
  //   return {
  //     name: res.data.results[0].name,
  //     description: res.data.results[0].description,
  //     thumbnail:
  //       res.data.results[0].thumbnail.path +
  //       "." +
  //       res.data.results[0].thumbnail.extension,
  //     homepage: res.data.results[0].urls[0].url,
  // wiki: res.data.results[0].urls[1].url
  //   };
  // };

  _transformCharter = (char) => {
    return {
      id:char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics:char.comics.item,
    };
  };
}

export default MarvelService;
