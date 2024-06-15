import React from 'react';
import Sidebar from './Sidebar';
import CategorySection from './CategorySection';
import ShowCard from './ShowCard';
import '../css/ShowCard.css';
import '../css/Home.css';

const Home = () => {
  const popularShows = [
    { id: 1, title: 'Mirzapur', image: 'https://m.media-amazon.com/images/M/MV5BMWUyYWNiODItNjdmNS00ZDhlLWE0YjQtNGEyMDg3ODJiMTM3XkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_.jpg' },
    { id: 2, title: 'Panchayat', image: 'https://m.media-amazon.com/images/M/MV5BOGRmMjc4MjEtM2E4YS00NjM5LWIwYzUtYTFlNTdhMTRhNmJjXkEyXkFqcGdeQXVyMTExMTIzMTA5._V1_FMjpg_UX1000_.jpg' },
    { id: 3, title: 'Stranger Things', image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg' },
    { id: 4, title: 'Money Heist', image: 'https://m.media-amazon.com/images/I/91fNL3q0hYS.jpg' },
    { id: 5, title: 'Peaky Blinders', image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/b/y/z/small-poster007-peaky-blinder-tv-series-posters-pandit-ji-poster-original-imaggkdhedfgxgn2.jpeg?q=90&crop=false' },
    { id: 6, title: 'Daredevils', image: 'https://rukminim2.flixcart.com/image/850/1000/jxgflow0/poster/d/q/j/large-daredevil-tv-series-poster-for-room-office-daredevil-new-original-imafhnyheztpbwhw.jpeg?q=20&crop=false' },
    { id: 7, title: 'Fight For My Way', image: 'https://cdn.myportfolio.com/965d89c6-e1e4-4118-ab42-ccda2bc47bff/7256c8f7-e92f-4758-ae94-fd5f508d4398_rw_1920.jpg?h=8f5401a3a40f5a1b293b796bc26e056f' },
    { id: 8, title: 'Asur', image: 'https://image.tmdb.org/t/p/original/fx58e04ezKiKMRBVQVWUUhERMiA.jpg'},
    // Add more show objects here
  ];

  const topMovies = [
    { id: 9, title: 'Avatar', image: 'https://m.media-amazon.com/images/I/91vwVHABnZL._AC_UF1000,1000_QL80_.jpg' },
    { id: 10, title: 'Titanic', image: 'https://m.media-amazon.com/images/I/71uoicxpqoS._AC_UF1000,1000_QL80_.jpg' },
    { id: 11, title: '3 Idiots', image: 'https://www.tallengestore.com/cdn/shop/products/3_Idiots_35dfe421-8426-4556-b410-c033ccedd460.jpg?v=1582192744' },
    { id: 12, title: 'Interstellar', image: 'https://m.media-amazon.com/images/I/41Oh0vCJ9KL._AC_UF1000,1000_QL80_.jpg' },
    { id: 13, title: 'Jawan', image: 'https://static.toiimg.com/thumb/imgsize-23456,msid-103060645,width-600,resizemode-4/103060645.jpg' },
    { id: 14, title: 'Animal', image: 'https://m.media-amazon.com/images/I/61OmlO9stnL._AC_UF1000,1000_QL80_.jpg' },
    { id: 15, title: 'Hridayam', image: 'https://i.pinimg.com/originals/5a/85/9d/5a859d6ffdf1923c627cf2558157d792.jpg' },
    { id: 16, title: 'Chhichhore', image: 'https://m.media-amazon.com/images/M/MV5BYjg2ZDI2YTYtN2EwYi00YWI5LTgyMWQtMWFkYmE3NmJkOGVhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg'},
    // Add more show objects here
  ];

  const newReleases = [
    { id: 17, title: 'Kota Factory 3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKndLWMd-0n-iPVlQTmZpvuLOKYxQuUjwLw&s'},
    { id: 18, title: 'Heeramandi', image: 'https://m.media-amazon.com/images/M/MV5BMTkwNmM3ZWMtNDY1Ni00YmFhLTg2ZTgtZmE3NTBmOGUwOTUyXkEyXkFqcGdeQXVyOTI3MzI4MzA@._V1_.jpg'},
    { id: 19, title: 'Premalu', image: 'https://cdn.cinematerial.com/p/297x/trfrzuzv/premalu-indian-movie-poster-md.jpg?v=1708680080'},
    { id: 20, title: 'Laapataa Ladies', image: 'https://upload.wikimedia.org/wikipedia/en/5/52/Laapataa_Ladies_poster.jpg'},
    { id: 21, title: 'No One Will Save You', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbfXNPnpsy42z0bQiYjS62v4cNnUle7-M4g&s'},
    { id: 22, title: 'Mr. and Mrs. Mahi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtS13MrgnbQ4WDOIW66frZwpYOv-wzane3g&s'},
    { id: 23, title: 'Tarot', image: 'https://m.media-amazon.com/images/M/MV5BZGYzYjQ3ZWItMGJlZC00YzAxLTgzMTItYzI5MjY2YjA4Mjk5XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg'},
    { id: 24, title: 'The Fall Guy', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlNv4eQEhfsctBFiCEddVjg2E-2x12J4L6w&s'}
  ];

  return (
    <div className="home">
      <Sidebar />
      <div className="content">
        <CategorySection title="Popular Shows">
          {popularShows.map((show, index) => (
            <ShowCard key={index} show={show}/>
          ))}
        </CategorySection>
        <CategorySection title="Top Movies">
          {topMovies.map((show, index) => (
            <ShowCard key={index} show={show}/>
          ))}
        </CategorySection>
        <CategorySection title="New Releases">
          {newReleases.map((show, index) => (
            <ShowCard key={index} show={show}/>
          ))}
        </CategorySection>
      </div>
    </div>
  );
};

export default Home;
