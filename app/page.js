'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { checkStorage, addToStorage, getArticles } from "./actions";


export default function Home() {

  // array containing stored preferences
  const [localPreferences, setLocalPreferences] = useState([]);
  
  // value of topic input
  const [newTopic, setNewTopic] = useState("");

  // array of news articles from The News API
  const [articles, setArticles] = useState([])

  
  // checks whether user has personalized topics in storage
  // as soon as page loads
  useEffect(() => {
  // will either return null or a string
  const storageString = checkStorage();


  // first check if there is any preferences in storage
  if (storageString == null) {
    console.log("nothing in storage")
  } else{

    /* -> there must be at least one preference
       -> check to see if there are more than one,
          where multiple will be split by hyphen
   */
    if (storageString.indexOf("-") != -1){
      setLocalPreferences(storageString.split("-"))
    } else{
      setLocalPreferences([storageString])
    }
  }
  },[]);

  // waits for local preferences to be changed
  useEffect(() => {  
    if (localPreferences.length == 7){
      getArticles(localPreferences);
    }
  },[localPreferences]);



  return (
    <div className={styles.main}>
      <h1>In storage: {localPreferences.join(" ")}</h1>
      
      <form action="">
        <input type="text" placeholder="enter a topic" name="topic" onChange={(e) => setNewTopic(e.target.value)}/>
        <button type="submit" onClick={() => addToStorage(newTopic)}>add</button>
      </form>
      <br /><br /><br /><br /><br />
      <button onClick={() => localStorage.clear()}>Clear Storage</button>
  
    </div>
  );
}
