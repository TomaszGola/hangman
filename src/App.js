import React, { Component } from 'react';

import './App.css';

class App extends Component {
  componentDidMount(){

    var start = document.getElementById("start");
    var placeForWord = document.getElementById("placeForWord");
    const word_API = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
    var randomWord
    var i

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
      randomWord = x.split('')
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
      console.log(e.key);
      for(i=0; i<randomWord.length; i++){
        if (randomWord[i] === e.key){

          document.getElementById(i).innerHTML = ' ' + e.key + ' ';
          console.log('trafione')

        }
        else {
          console.log('nietrafione')
         }
      }
    }


    start.addEventListener("click", fetchWord);
    document.addEventListener('keydown', letterEvent)

  }
  render() {

    return (

        <div className="App-header">
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
