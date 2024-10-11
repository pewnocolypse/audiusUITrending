# Audius UI Trending
Welcome to Audius's Trending page, curated to display this week's top 100 tracks. 

Functionalities include:
        1) Displaying the track's title, artwork, artist's name, genre, mood
        2) Search for tracks names
        3) A genre filter feature that allows a user to filter the tracks down to any of: All, Electronic, Hip-Hop/Rap, Metal, and Dubstep
        4) Favorite items using the heart icon
        5) Sort/Unsort by your chosen favorited tracks
# Set Up
Clone repo into your local repository
`git clone https://github.com/pewnocolypse/audiusUITrending.git`

# Backend
To run the backend Flask application:

1) Create a python virtual environment
        a) `python3 -m venv venv`
        b) `source venv/bin/activate`
2) Run Dependencies 
        `pip install -r requirements.txt`
3) Run flask app
        `python3 app.py`
4) Confirm server is running
        Follow the url(http://127.0.0.1:5000) and append `/api/trending` to hit the api that renders the relevant data being pulled for this application

# FrontEnd
1) Once you have the backend component running, open a new terminal window and cd into this folder `audius_trending_ui`
2) Make sure you have node & nvm installed on your computer
3) Run `npm install` to install any necessary dependencies
4) Run `npm start`
5) Load and view the page on your localhost:3000
