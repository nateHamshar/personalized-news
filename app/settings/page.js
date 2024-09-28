'use client'
import { useEffect, useState } from "react";
import { checkStorage, addToStorage, removeFromStorage } from "../actions";
import Link from "next/link";
import "./page.css";
import Image from "next/image";

export default function Settings(){
    {/* value of topic input */}
    const [newTopic, setNewTopic] = useState("");
    const [storedTopics, setStoredTopics] = useState([]);

    
    useEffect(()=> {
        const topics = checkStorage();
        if(topics != null){
            setStoredTopics(topics.split("-"))
        }
    },[])

    
    return (
        <main className="settingsPage">
            <header className="settingsHeader">
                <h1 className="settingsTitle">Preferences <span className="divider">&</span> Settings</h1>
                <Link href="/" className="navBtn"><Image width={50} height={50} src="https://img.icons8.com/ios-filled/50/home.png" alt="home"/></Link>
            </header>

            <form action="" className="topicForm">
                <label hidden htmlFor="topicInput" className="inputLabel">Add a topic:</label>
                <input className="topicInput" id="topicInput" name="topicInput" type="text" placeholder="Add a new topic..."required onChange={(e) => setNewTopic(e.target.value)} />
                <button className="addTopicBtn" type="submit" onClick={() => addToStorage(newTopic)}>Add</button>
            </form>            

            <section className="topicsSection">
                <h2 className="savedTopicsHeader">Saved Topics</h2>
                <p className="disclaimer"><span className="divider">&#47;&#47; </span>You must have three topics for app to work!</p>
                <ul className="topicsList">
                    {
                        storedTopics.map((topic) => {
                            return (
                                <li className="topic" key={storedTopics.indexOf(topic)}>
                                    <p className="topicTitle">{topic}</p>
                                    <button onClick={() => removeFromStorage(storedTopics.indexOf(topic))} className="topicBtn"><Image width={20} height={20} src="https://img.icons8.com/fluency-systems-regular/50/x.png" alt="x"/></button>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </main>
    );
}
