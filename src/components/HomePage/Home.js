import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import CategorySection from './CategorySection';
import ShowCard from './ShowCard';
import '../../css/ShowCard.css';
import '../../css/Home.css';

const Home = () => {
  const popularShows = [
    { _id: "1", title: 'Mirzapur', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMWUyYWNiODItNjdmNS00ZDhlLWE0YjQtNGEyMDg3ODJiMTM3XkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_.jpg' },
    { _id: "66ab84a605bdc8908e19e0c6", title: 'Panchayat', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BOGRmMjc4MjEtM2E4YS00NjM5LWIwYzUtYTFlNTdhMTRhNmJjXkEyXkFqcGdeQXVyMTExMTIzMTA5._V1_FMjpg_UX1000_.jpg' },
    { _id: "66ab86e405bdc8908e19e0cf", title: 'Stranger Things', thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg' },
    { _id: 4, title: 'Money Heist', thumbnailUrl: 'https://m.media-amazon.com/images/I/91fNL3q0hYS.jpg' },
    { _id: 5, title: 'Peaky Blinders', thumbnailUrl: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/b/y/z/small-poster007-peaky-blinder-tv-series-posters-pandit-ji-poster-original-imaggkdhedfgxgn2.jpeg?q=90&crop=false' },
    { _id: 6, title: 'Daredevils', thumbnailUrl: 'https://rukminim2.flixcart.com/image/850/1000/jxgflow0/poster/d/q/j/large-daredevil-tv-series-poster-for-room-office-daredevil-new-original-imafhnyheztpbwhw.jpeg?q=20&crop=false' },
    { _id: "66ab884505bdc8908e19e0d6", title: 'Fight For My Way', thumbnailUrl: 'https://cdn.myportfolio.com/965d89c6-e1e4-4118-ab42-ccda2bc47bff/7256c8f7-e92f-4758-ae94-fd5f508d4398_rw_1920.jpg?h=8f5401a3a40f5a1b293b796bc26e056f' },
    { _id: 8, title: 'Asur', thumbnailUrl: 'https://image.tmdb.org/t/p/original/fx58e04ezKiKMRBVQVWUUhERMiA.jpg'},
    // Add more show objects here
  ];

  const topMovies = [
    { _id: "66ab89ce05bdc8908e19e0df", title: 'Avatar', thumbnailUrl: 'https://m.media-amazon.com/images/I/91vwVHABnZL._AC_UF1000,1000_QL80_.jpg' },
    { _id: 10, title: 'Titanic', thumbnailUrl: 'https://m.media-amazon.com/images/I/71uoicxpqoS._AC_UF1000,1000_QL80_.jpg' },
    { _id: "66ab8b2405bdc8908e19e0e5", title: '3 Idiots', thumbnailUrl: 'https://www.tallengestore.com/cdn/shop/products/3_Idiots_35dfe421-8426-4556-b410-c033ccedd460.jpg?v=1582192744' },
    { _id: "66ab8c8305bdc8908e19e0ea", title: 'Interstellar', thumbnailUrl: 'https://m.media-amazon.com/images/I/41Oh0vCJ9KL._AC_UF1000,1000_QL80_.jpg' },
    { _id: 13, title: 'Jawan', thumbnailUrl: 'https://static.toiimg.com/thumb/imgsize-23456,msid-103060645,width-600,resizemode-4/103060645.jpg' },
    { _id: 14, title: 'Animal', thumbnailUrl: 'https://m.media-amazon.com/images/I/61OmlO9stnL._AC_UF1000,1000_QL80_.jpg' },
    { _id: 15, title: 'Hridayam', thumbnailUrl: 'https://i.pinimg.com/originals/5a/85/9d/5a859d6ffdf1923c627cf2558157d792.jpg' },
    { _id: 16, title: 'Chhichhore', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYjg2ZDI2YTYtN2EwYi00YWI5LTgyMWQtMWFkYmE3NmJkOGVhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg'},
    // Add more show objects here
  ];

  const newReleases = [
    { _id: "66ab985205bdc8908e19e164", title: 'Kota Factory 3', thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKndLWMd-0n-iPVlQTmZpvuLOKYxQuUjwLw&s'},
    { _id: 18, title: 'Heeramandi', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMTkwNmM3ZWMtNDY1Ni00YmFhLTg2ZTgtZmE3NTBmOGUwOTUyXkEyXkFqcGdeQXVyOTI3MzI4MzA@._V1_.jpg'},
    { _id: 19, title: 'Premalu', thumbnailUrl: 'https://cdn.cinematerial.com/p/297x/trfrzuzv/premalu-indian-movie-poster-md.jpg?v=1708680080'},
    { _id: "66ab996405bdc8908e19e169", title: 'Laapataa Ladies', thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Laapataa_Ladies_poster.jpg'},
    { _id: "66ab9a6705bdc8908e19e16e", title: 'Spiderman', thumbnailUrl: 'https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg'},
    { _id: 22, title: 'Mr. and Mrs. Mahi', thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtS13MrgnbQ4WDOIW66frZwpYOv-wzane3g&s'},
    { _id: 23, title: 'Tarot', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZGYzYjQ3ZWItMGJlZC00YzAxLTgzMTItYzI5MjY2YjA4Mjk5XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg'},
    { _id: 24, title: 'The Fall Guy', thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlNv4eQEhfsctBFiCEddVjg2E-2x12J4L6w&s'},
  ];

  const topPicksForYou = [
    { _id: 25, title: 'Avengers: Endgame', thumbnailUrl: 'https://m.media-amazon.com/images/I/91hIN+dNYUL.jpg'},
    { _id: 26, title: 'Taare Zameen Par', thumbnailUrl: 'https://m.media-amazon.com/images/I/611JgDfdb7L._AC_UF894,1000_QL80_.jpg'},
    { _id: 27, title: 'Top Gun: Maverick', thumbnailUrl: 'https://m.media-amazon.com/images/I/71BokibfVUL._AC_UF894,1000_QL80_.jpg'},
    { _id: "66ab90a605bdc8908e19e143", title: 'Iron Man 3', thumbnailUrl: 'https://i.pinimg.com/736x/be/63/96/be6396378d656325093f62ec5966392b.jpg'},
    { _id: "66ab93fb05bdc8908e19e14a", title: 'Yeh Jawaani Hai Deewani', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BM2UwY2M3NjctM2E1Ni00MGExLWJmZmQtNGViZThiNjYxMjJjXkEyXkFqcGdeQXVyNDYwMjI1MzI@._V1_.jpg'},
    { _id: 30, title: 'Fast & Furious', thumbnailUrl: 'https://m.media-amazon.com/images/I/51rhMjr8VDL._AC_UF1000,1000_QL80_.jpg'},
    { _id: "66ab96c905bdc8908e19e157", title: 'Zindagi Na Milegi Dobara', thumbnailUrl: 'https://m.media-amazon.com/images/I/818gvtO-taL._AC_UF1000,1000_QL80_.jpg'},
    { _id: 32, title: '500 Days of Summer', thumbnailUrl: 'https://i.pinimg.com/originals/74/49/a9/7449a9524291b11c3e2c1904701a46e5.jpg'},
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
        <CategorySection title="Top Picks For You">
          {topPicksForYou.map((show, index) => (
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


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Sidebar from '../Sidebar/Sidebar';
// import CategorySection from './CategorySection';
// import ShowCard from './ShowCard';
// import '../../css/ShowCard.css';
// import '../../css/Home.css';
// import { fetchContentListAction } from '../../redux/slices/users/favoriteslistSlice';

// const Home = () => {
//   const dispatch = useDispatch();

//   // Access state from Redux
//   const { contentData, loading, error } = useSelector((state) => state.content);

//   // Fetch data on component mount
//   useEffect(() => {
//     dispatch(fetchAllContent());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Organize data into categories
//   const popularShows = contentData.filter(item => item.category === 'popularShows');
//   const topMovies = contentData.filter(item => item.category === 'topMovies');
//   const topPicksForYou = contentData.filter(item => item.category === 'topPicksForYou');
//   const newReleases = contentData.filter(item => item.category === 'newReleases');

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="content">
//         <CategorySection title="Popular Shows">
//           {popularShows.map((show, index) => (
//             <ShowCard key={index} show={show}/>
//           ))}
//         </CategorySection>
//         <CategorySection title="Top Movies">
//           {topMovies.map((show, index) => (
//             <ShowCard key={index} show={show}/>
//           ))}
//         </CategorySection>
//         <CategorySection title="Top Picks For You">
//           {topPicksForYou.map((show, index) => (
//             <ShowCard key={index} show={show}/>
//           ))}
//         </CategorySection>
//         <CategorySection title="New Releases">
//           {newReleases.map((show, index) => (
//             <ShowCard key={index} show={show}/>
//           ))}
//         </CategorySection>
//       </div>
//     </div>
//   );
// };

// export default Home;
