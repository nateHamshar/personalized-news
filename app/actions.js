

// check local storage if user has any data to personalized responses to
export function checkStorage(){
    if (localStorage.getItem("preferences")){
        return localStorage.getItem("preferences")
    } else return null;
};

// adds new topic to local storage, limited to 3 topics
export function addToStorage(newTopic){
    if (!localStorage.getItem("preferences")){
        localStorage.setItem("preferences", newTopic)
    } else {

        // split preferences into temp array
        const tempArray = localStorage.getItem("preferences").split("-");
        
        // add new topic
        tempArray.push(newTopic);

        // if array is still <= 3, join with - and add to storage
        if (tempArray.length <= 3){
            localStorage.setItem("preferences", tempArray.join("-"))
        } else {
            // array must be over 3, remove first, join and save
            tempArray.shift();
            localStorage.setItem("preferences", tempArray.join("-"))
        }
    }
};

// fetches articles based on user's chosen topics
// takes an array as param
export async function getArticles(topics) {
    
    const arrayOfArticles = []
    
    let baseURL = "https://api.thenewsapi.com/v1/news/all?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN + "&language=en&search=";
    
    for (let i = 0; i < 3; i++) {
        let topic = topics[i];

        try {
            const response = await fetch(baseURL + topic);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            arrayOfArticles.push(json);
    
        } catch (error) {
            console.error(error.message);
        }
    
    }
    console.log(arrayOfArticles)
    return arrayOfArticles

    /*

    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);

    } catch (error) {
        console.error(error.message);
    }
  */    
};