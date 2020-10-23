const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");
  if (movies.length === 0) {
    movieList.classList.remove("visible");
  } else {
    movieList.classList.add("visible");
  }

  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));  //filter and includes method

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const { info, ...otherProps } = movie;     //Object Destructuring
    console.log(otherProps);
    // const { title : movieTitle } = info;    //Object Destructuring and assigning new name to property name as movieTitle
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie); //bind function is used for future purpose
    // let text = getFormattedTitle.call(movie); //call method executes the function right away and allows us to pass another argument as comma separated values 
    let text = getFormattedTitle.apply(movie); //apply allows us to pass another argument as an array
    // let text = getFormattedTitle() + " - ";  
    for (const key in info) {
      if (key !== "title") {
        text = text + ` ${key} : ${info[key]}`; //dynamically access property
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {  //method shorthand syntax for 'getFormattedTitle : function ()' is to remove function keyword 
    console.log(this);
    return this.info.title.toUpperCase();  //this keyword refers to object
    }
  };
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => { //arrow function does not know this keyword hence here this keyword refers to global object that is window 
  console.log(this); //here this keyword refers to the DOM element which is button
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
