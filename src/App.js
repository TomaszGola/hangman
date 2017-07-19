import React, { Component } from 'react';

import './App.css';

class App extends Component {
  componentDidMount(){

    var start = document.getElementById("start")
    const word_API = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

    console.log(start)

    function fetchWord(){
      fetch(word_API).then(
        resp => {
          if (resp.status === 200){
            resp.json().then(
              word =>
              console.log(word[0].word)
            )
          }
          else {
            console.log('błąd :(')
          }
        }
      )
    }

    start.addEventListener("click", fetchWord)

  }
  render() {

    return (

        <div className="App-header">
          <h2>Wisielec</h2>
          <button id="start">start</button>
        </div>

    );
  }
}

export default App;
