import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTwitter } from 'react-icons/fa'
import './App.css'
import Spinner from './components/Spinner'
import { Motion, spring } from 'react-motion';

function App() {


  const [quotes, setQuotes] = useState([])
  const [randomQuote, setRandomQuote] = useState({})


  useEffect(() => {
    function getQuotes() {

      const options = {
        method: 'GET',
        url: 'https://dummyjson.com/quotes',
      };

      axios.request(options).then(function (response) {
        console.log(response.data.quotes);
        setQuotes(response.data.quotes);
      }).catch(function (error) {
        console.error(error);
      });

    }

    getQuotes()

  }, [])

  useEffect(() => {
    handleQuote()
  }, [quotes])


  const handleQuote = () => {
    const item = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(item)
  }

  console.log(randomQuote);
  return (
    <div id="quote-box" className='card quote'>
      {quotes.length == 0 ? <Spinner /> : (<Motion defaultStyle={{ x: 0 }} style={{ x: spring(randomQuote ? 1 : 0) }}>
        {({ x }) => (

          <div style={{
            transform: `scale(${x})`,
            transformOrigin: 'top left'
          }}>
            <blockquote>
              <p id="text">"{randomQuote?.quote}"</p>
              <small id="author">{randomQuote?.author}</small>
            </blockquote>
          </div>)}
      </Motion>
      )}
      <div className="controls">
        <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${encodeURIComponent(randomQuote?.quote)}" ${encodeURIComponent(randomQuote?.author)}`} id='tweet-quote'><FaTwitter /></a>
        <button id='new-quote' onClick={handleQuote}>Get a new quote</button>
      </div>
    </div>
  )
}

export default App
