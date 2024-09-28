# Here is your **Personalized News Feed**!

The idea of this project is to retrieve news articles about topics that are interesting for you
[Try it out for yourself!](https://personalized-news.vercel.app)

## The idea of this project is simple
First you will be asked to enter three topics that you enjoy.

![image](https://github.com/user-attachments/assets/33bb2440-12dc-4b17-b277-e65a64acd488)

Next, it will retrieve your tailored news feed from The News API.

![image](https://github.com/user-attachments/assets/541d644f-a2a4-45f4-99f3-c0a5b69e4b32)

Then all you have to do is read through them!

## No Sign up required!
Your interests will be saved to your local storage, so whenever you want to find something to read they will be ready for you.

But, if you want to change your interests, you can do that too!

Now that you know how it works, [give it a shot!](https://personalized-news.vercel.app)

## Tech Stack
This project is built with Next.js, so mostly react components and logic. There is an actions.js file with some vanilla js functions that I used to clean up my components.
For simplicity of this project, I have both client-side pages using strictly CSR instead of using any SSR. 

Hosted on Vercel, the company behind Next. And all of the version control is through git, obviously...

I used [The News API](https://www.thenewsapi.com/) to retrieve the articles. The News API has a 100 daily request limit, so if you are getting a message that says no articles found or another error the limit has probably been reached.

Design and Styles mostly from me, hopefully it doesn't look too bad :)
I focused on a minimalist UI to emphasize on the utility of the project.

Stole some codepen styles to try and make it look decent, credit where it's due.
