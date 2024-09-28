'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { checkStorage, getArticles, shuffleArray} from "./actions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // array containing stored preferences
  const [localPreferences, setLocalPreferences] = useState(null);

  // array of news articles from The News API
  const [articlesArray, setArticlesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  // checks whether user has personalized topics in storage
  // as soon as page loads
  useEffect(() => {

    const storageString = checkStorage();
    console.log(storageString)
    
  
    // first check if storageString is null and redirect if needed
    if (storageString == null){
        router.push('/settings');
        return
    }

    const tempArr = storageString.split("-");

    // check if there is only 2 topics, redirect if needed
    if (tempArr.length < 3) {
      router.push('/settings')
      return
    }

    // if we got this far there must be 3 topics
    // so now we can populate localPreferences array
    setLocalPreferences(tempArr);

  },[router]);

  // waits for local preferences to be changed
  useEffect(() => {  
    const fetchArticles = async () => {
      if (localPreferences) {
        try {
          const articles = await getArticles(localPreferences);
          const shuffledArticles = await shuffleArray(articles);
          setArticlesArray(shuffledArticles);
        } catch (error) {
          console.error("Error fetching articles:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchArticles();
  }, [localPreferences]);
  

  return (
    <main className={styles.main}>
      <header className={styles.homeHeader}>
                <h1 className={styles.homeTitle}>Your News Feed</h1>
                <Link href="/settings"><Image width={50} height={50} src="https://img.icons8.com/ios-filled/50/settings.png" alt="settings"/></Link>
      </header>
      
      <section className={styles.contentSection}>
        <ul className={styles.articleList}>
        
        {isLoading ? (
            <li>Loading...</li>
          ) : (
            articlesArray.length > 0 ? (
              articlesArray.map((article) => (
                <li className={styles.articleItem} key={article.uuid}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.liLink}>
                    <div className={styles.articleImage}>
                    <Image src={article.image_url} alt="No image provided" className={styles.articleImageComp} loading="lazy" fill={true} />
                    </div>
                    <div className={styles.articleContent}>
                      <h1 className={styles.articleTitle}>{article.title}</h1>
                      <p className={styles.articleDescription}>{article.description}</p>
                    </div>
                  </a>
                </li>
              ))
            ) : (
              <li>No articles found.</li>
            )
          )}
        </ul>
      </section>
    </main>
  );
}
