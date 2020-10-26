import React, { useState } from 'react';
import {
  Col, Button, Card, CardImg, CardText,
  CardBody, CardTitle, Badge, ButtonGroup,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'


export default function Movie(props) {

  const [watchMovie, setWatchMovie] = useState(false);
  const [countWatchMovie, setCountWatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  const [isRatingMovie, setIsRatingMovie] = useState(false);

  let setMyRating = (rating) => {
    if (rating > 10) {
      rating = 10;

    } else if (rating < 0) {
      rating = 0;
    }
    setIsRatingMovie(true);
    setMyRatingMovie(rating);
  }

    let watchClick = () => {
      setWatchMovie(true);
      setCountWatchMovie(countWatchMovie + 1);
    }

    let likeClick = () => {
      props.handleClickParent(props.movieName, props.toSee, props.movieImg);
    }

    let colorLike;
    if (props.toSee) {
      colorLike = { color: "#e74c3c" };
    }

    let colorWatch;
    if (watchMovie) {
      colorWatch = { color: "#e74c3c" };
    }

    // Création des 10 étoiles de mon avis

    let tabMyRating = [];
    for (let i = 0; i < 10; i++) {
      let color = {};
      if (i < myRatingMovie) {
        color = { color: '#f1c40f' }
      }
      tabMyRating.push(<FontAwesomeIcon onClick={() => setMyRating(i+1)} key={i} style={color} icon={faStar} />)
    }

    let moyenne = props.globalRating * props.globalCountRating;
    if(isRatingMovie){
      moyenne += myRatingMovie;
      moyenne /= (props.globalCountRating + 1);
    } else {
      moyenne /= props.globalCountRating;
    }
 
    moyenne = Math.round(moyenne);

    let tabGlobalRating = [];
    for (let i = 0; i < 10; i++) {
      let color = {};
      if (i < moyenne) {
        color = { color: '#f1c40f' }
      }
      tabGlobalRating.push(<FontAwesomeIcon key={i} style={color} icon={faStar} />)
    }


    return (
      <Col xs="12" lg="6" xl="4">
        <Card style={{ marginBottom: 30 }} >
          <CardImg top src={props.movieImg} alt={props.movieName} />
          <CardBody>
            <p>Like <FontAwesomeIcon onClick={() => likeClick()} style={{ cursor: 'pointer' }, colorLike} icon={faHeart} /></p>
            <p>Nombre de vues <FontAwesomeIcon onClick={() => watchClick()} style={colorWatch} icon={faVideo} /> <Badge color="secondary"> {countWatchMovie}</Badge></p>
            <p>Mon avis
                  {tabMyRating}

              <ButtonGroup size="sm">
                <Button onClick={() => setMyRating(myRatingMovie - 1)} color="secondary">-</Button>
                <Button onClick={() => setMyRating(myRatingMovie + 1)} color="secondary">+</Button>
              </ButtonGroup>
            </p>
            <p>Moyenne
                {tabGlobalRating}
                ({props.globalCountRating})
                </p>
            <CardTitle>{props.movieName}</CardTitle>
            <CardText>{props.movieDesc}</CardText>
      
          </CardBody>
        </Card>
      </Col>
    );
  }