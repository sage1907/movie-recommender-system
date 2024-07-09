import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Search.css';
import CategorySection from '../HomePage/CategorySection';
import ShowCard from '../HomePage/ShowCard';
import Sidebar from '../Sidebar/Sidebar';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    
    const trendingInIndia = [
        { id: 25, title: 'Avengers: Endgame', image: 'https://m.media-amazon.com/images/I/91hIN+dNYUL.jpg'},
        { id: 26, title: 'Taare Zameen Par', image: 'https://m.media-amazon.com/images/I/611JgDfdb7L._AC_UF894,1000_QL80_.jpg'},
        { id: 27, title: 'Top Gun: Maverick', image: 'https://m.media-amazon.com/images/I/71BokibfVUL._AC_UF894,1000_QL80_.jpg'},
        { id: 28, title: 'Iron Man 3', image: 'https://i.pinimg.com/736x/be/63/96/be6396378d656325093f62ec5966392b.jpg'},
        { id: 29, title: 'Yeh Jawaani Hai Deewani', image: 'https://m.media-amazon.com/images/M/MV5BM2UwY2M3NjctM2E1Ni00MGExLWJmZmQtNGViZThiNjYxMjJjXkEyXkFqcGdeQXVyNDYwMjI1MzI@._V1_.jpg'},
        { id: 30, title: 'Fast & Furious', image: 'https://m.media-amazon.com/images/I/51rhMjr8VDL._AC_UF1000,1000_QL80_.jpg'},
        { id: 31, title: 'Zindagi Na Milegi Dobara', image: 'https://m.media-amazon.com/images/I/818gvtO-taL._AC_UF1000,1000_QL80_.jpg'},
      ];
  
    const handleSearch = async (event) => {
      setSearchTerm(event.target.value);
      if (event.target.value.length > 2) {
        try {
          const response = await fetch(`http://localhost:8000/api/search?query=${event.target.value}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setResults([]);
      }
    };
  
    const handleResultClick = (id) => {
      navigate(`/details/${id}`);
    };
  
    return (
      <div className="search">
      <Sidebar />
      <h1>find your favorite movies and shows</h1>
        <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
            type="text"
            placeholder="Search for content..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            />
        </div>
        {results.length > 0 && (
          <div className="search-results">
            {results.map((result) => (
              <div 
                key={result.id} 
                className="search-result-item" 
                onClick={() => handleResultClick(result.id)}
              >
                <img src={result.image} alt={result.title} className="search-result-image" />
                <div className="search-result-info">
                  <h3>{result.title}</h3>
                  <p>{result.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="search-section">
            <CategorySection title="Trending in India">
            {trendingInIndia.map((show, index) => (
                <ShowCard key={index} show={show}/>
            ))}
            </CategorySection>
        </div>    
      </div>
    );
  };

export default Search;
