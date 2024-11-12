import React from 'react';
import { Link } from 'react-router-dom';
import allbooks from '../Components/Assets/all_books'; 
import '../Pages/CSS/Booklist.css'; 

const Booklist = () => {
  return (
    <div className="booklist">
      {allbooks.map((book) => (
        <div key={book.id} className="book-item">
          <Link to={`/book/${book.id}`}>
            <img src={book.cover} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Booklist;
