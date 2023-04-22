class Service {
  _key = 'df165f3a240d866ceb8f3750af9bbec1';
  BASE_URL = 'https://api.themoviedb.org/3/';

  getData = async (value, page) => {
    const url = `${this.BASE_URL}search/movie?api_key=${this._key}&query=${value || 'return'}&page=${page || '1'}`;
    const response = await fetch(url);
    if (response.ok) {
      const movies = await response.json();
      return movies;
    } else {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
  };

  getGenres = async () => {
    const url = `${this.BASE_URL}genre/movie/list?api_key=${this._key}`;
    const response = await fetch(url);
    if (response.ok) {
      const genres = await response.json();
      return genres;
    } else {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
  };

  createGuestSession = async () => {
    if (!localStorage.getItem('guest_session')) {
      const url = `${this.BASE_URL}authentication/guest_session/new?api_key=${this._key}`;
      const response = await fetch(url);
      if (response.ok) {
        const guestSession = await response.json();
        localStorage.setItem('guest_session', JSON.stringify(guestSession));
      } else {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      return response;
    }
  };

  postRatedMovie = async (movieId, rate, sessionId) => {
    const url = `${this.BASE_URL}movie/${movieId}/rating?api_key=${this._key}&guest_session_id=${sessionId}`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ value: rate }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
  };

  getRatedMovies = async () => {
    const { guest_session_id } = JSON.parse(localStorage.getItem('guest_session'));
    const url = `${this.BASE_URL}guest_session/${guest_session_id}/rated/movies?api_key=${this._key}&language=en-US&sort_by=created_at.asc`;
    const response = await fetch(url);
    if (response.ok) {
      const ratedMovies = await response.json();
      return ratedMovies;
    } else {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
  };
}

const service = new Service();

export default service;
