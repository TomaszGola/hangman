import React, { Component } from 'react';

import './App.css';

class App extends Component {
  componentDidMount(){

    var start = document.getElementById("start");
    var placeForWord = document.getElementById("placeForWord");
    const word_API = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    var randomWord
    var randomWordWithoutDuplication
    var i
    var lettersCorrect = []
    var lettersMissed = []

    function fetchWord(){
      fetch(word_API).then(
        resp => {
          if (resp.status === 200){
            resp.json().then(
              word =>
              wordSplit(word[0].word)
            )
          }
          else {
            console.log('błąd :(')
          }
        }
      )
    }

    function wordSplit(x){
      console.log(x);
      // console.log(x.split(''));
      randomWord = x.toLowerCase().split('')
      randomWordWithoutDuplication = [...new Set(randomWord)];
      console.log(randomWordWithoutDuplication);
      showNullLetters()
    }

    function showNullLetters() {
      for(i=0; i<randomWord.length; i++){
        var nullLetter = '<span id="' + i + '"> _ </span>';
        placeForWord.insertAdjacentHTML('beforebegin', nullLetter)
      }
    }

    // pomyśleć o klawiszach typu shift i enter...
    function letterEvent(e){
      console.log(randomWord);
      // console.log(randomWord.length);
      // console.log(e.key);

      if(randomWord.indexOf(e.key) !== -1 ){
        lettersCorrect.push(e.key)
        // console.log('trafione ' + e.key)
      } else {
        lettersMissed.push(e.key)
        // console.error('nie trafione ' + e.key)
      }

      if(lettersCorrect.length === randomWordWithoutDuplication.length){
        console.log('wow, you did it')
      }

      if(lettersMissed.length === 7){
        console.log("you're looser")
      }

      for(i=0; i<randomWord.length; i++){
        if (randomWord[i] === e.key){
          document.getElementById(i).innerHTML = ' ' + e.key + ' ';
          }
        }
      }




    start.addEventListener("click", fetchWord);
    document.addEventListener('keydown', letterEvent)

  }
  render() {

    return (

        <div className="mainDiv">
          <h2>Wisielec</h2>
          <button id="start">start</button>
          <br/>
          <div id='placeForWord'>

          </div>
        </div>

    );
  }
}

export default App;
