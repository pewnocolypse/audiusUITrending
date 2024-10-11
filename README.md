# Audius UI Trending
Setting up a UI for audius's most trending tracks

# Backend
To test the backend Flask application:

1) Create a python virtual environment
        a) python3 -m venv venv
        b) source venv/bin/activate
2) Run Dependencies 
        `pip install -r requirements.txt`
3) Run flask app
        `python3 app.py`
4) Load app url
        Follow the url and append `/api/trending` to hit the api that renders the relevant data being pulled for the problem

# FrontEnd
1) Once you have the backend components running, open a new terminal window and go to this `repo/audius_trending_ui`
2) Without any python env, run `npm start`
        a) make sure you have node & nvm installed on your computer
3) Load and view the page on your localhost:3000