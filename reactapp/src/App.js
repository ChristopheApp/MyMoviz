import React, { useState, useEffect } from 'react';


import './App.css';
import {
  Container, Row, Nav, NavItem, NavLink,
  Button, Popover, PopoverHeader, PopoverBody,
  ListGroup, ListGroupItem,
} from 'reactstrap';

import Movie from './components/Movie.js';



function App(props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);

  const[moviesList, setMoviesList] = useState([]);

  useEffect( () => {

    async function loadData() {
      // On appelle la route pour récupéré les films récent
    const rawResponse = await fetch('/new-movies');
    const response = await rawResponse.json();
    setMoviesList(response.result.results);

      // On appelle la route pour récupéré la wishList
      const responseWishlist = await fetch('/wishlist-movie');
      const jsonResponseWishlist = await responseWishlist.json();
      const wishlistFromDB = jsonResponseWishlist.listMovies.map((movie, i) => {
        return {name: movie.movieName, url: movie.movieImgUrl};
      });
      setMoviesWishList(wishlistFromDB)
      setMoviesCount(jsonResponseWishlist.listMovies.length);

    }
    loadData();
  }, []);



  // Afficher les 20 films
  // var moviesData = [
  //   { name: "Star Wars : L'ascension de Skywalker", desc: "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img: "../img/starwars.jpg", note: 6.7, vote: 5 },
  //   { name: "Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img: "./img/maleficent.jpg", note: 8.2, vote: 3 },
  //   { name: "Jumanji: The Next Level", desc: "L’équipe est de retour, mais le jeu a changé. Alors qu’ils retournent dans Jumanji pour secourir ...", img: "img/jumanji.jpg", note: 4, vote: 5 },
  //   { name: "Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton – star déclinante d'une série télévisée de western – et Cliff Booth ...", img: "img/once_upon.jpg", note: 6, vote: 7 },
  //   { name: "La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d’Arendelle à la recherche de réponses ...", img: "img/frozen.jpg", note: 4.6, vote: 3 },
  //   { name: "Terminator: Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img: "img/terminator.jpg", note: 6.1, vote: 1 },
  // ];

  let handleClickMovie = async (movieName, bool, movieImg) => {
    if(!bool){
      setMoviesCount(moviesCount + 1);
      setMoviesWishList([...moviesWishList, {name: movieName,
                                             url: movieImg}
      ]);

      await fetch('/wishlist-movie', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${movieName}&url=${movieImg}`
      });

    } else {
      setMoviesCount(moviesCount - 1);
      setMoviesWishList(moviesWishList.filter((e)=>(e.name !== movieName)));
      //if(popoverOpen && moviesWishList[0])

      await fetch('/wishlist-movie/' + movieName, {
        method: 'DELETE'
      });
    }
  }

  let handleClickWishList = async (movieName) => {
    setMoviesCount(moviesCount - 1);
    setMoviesWishList(moviesWishList.filter((e)=>(e.name !== movieName)));
    
    await fetch('/wishlist-movie/' + movieName, {
      method: 'DELETE'
    });
      
  }    

  if(popoverOpen && moviesWishList[0] === undefined){
    setPopoverOpen(!popoverOpen);
  }

  let listMovie = moviesList.map(function (film, i) {
    let result = moviesWishList.find(e => e.name === film.title);
    let isSee = false;
      if(result)
      isSee = true;

      let imgUrl = "img/img-generique.jpg"
      if(film.backdrop_path){
        imgUrl = "https://image.tmdb.org/t/p/w500" + film.backdrop_path;
      }

      let description = film.overview;
      if(description.length > 80){
        description = description.slice(0,80) + '...';
      }

    return <Movie key={i} movieName={film.title} movieDesc={description} movieImg={imgUrl} globalRating={film.vote_average} globalCountRating={film.vote_count} handleClickParent={handleClickMovie} toSee={isSee} />
  })
  // {name: film.original_title,
  //   desc: film.overview,
  //   img: film.backdrop_path,
  //   note: film.vote_average,
  //   vote: film.vote_count
  //   }

  let wishList = moviesWishList;
  let listWishList = wishList.map(function(movie, i) {
  return <ListGroupItem key={i} onClick={() => handleClickWishList(movie.name) } ><img style={{width: '25%'}} src={movie.url} alt={movie.name} /> {movie.name}</ListGroupItem>
  })

  return (
    <Container className="bg-dark">
      <Row>
        <Nav>
          <NavItem>
            <NavLink><img alt="Logo" src="img/logo.png" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className="text-white">Last releases</NavLink>
          </NavItem>
          <NavItem>
            <Button id="PopoverFilms" type="button">
              {moviesCount} films
              </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target="PopoverFilms" toggle={toggle}>
              <PopoverHeader>Whishlist</PopoverHeader>
              <PopoverBody>
                <ListGroup>
                  {listWishList}
                </ListGroup>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Row>


      <Row>
        {listMovie}

      </Row>
    </Container>
  );
}

export default App;
