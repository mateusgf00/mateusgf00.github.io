export default new class StarWarsService {
  async getCharacters(url = 'https://swapi.dev/api/people') {
    const response = await fetch(url)
    return response.json();
  }

  async getFilms(urls) {
    const requests = urls.map(url => fetch(url));
    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(response => response.json()));

    return data;
  }

  async getCharactersByName(name) {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${name}`
    );
    return response.json();
  }
}