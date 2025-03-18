import pizza from '../img/portImages/pizza.png';
import chat from '../img/portImages/chat.png';
import clothing from '../img/portImages/clothing.png';


import movie from '../img/portImages/movie.png';
import tinder from '../img/portImages/tinder.png';
import zoom from '../img/portImages/zoom.png';

import twitter from '../img/portImages/twitter.png';
import slack from '../img/portImages/slack.png';
import whatsapp from '../img/portImages/whatsapp.png';

import spotify from '../img/portImages/spotify.png';
import yt1 from '../img/portImages/mern-yt-2.PNG';
import instagram from '../img/portImages/instagram.png';

import tour from '../img/portImages/tour.png';
import natural from '../img/portImages/natural-disaster.png';
import hulu from '../img/portImages/hulu.PNG';

import news from '../img/portImages/news.PNG';
import nba from '../img/portImages/nba.PNG';
import artist from '../img/portImages/martist.PNG';

import prime from '../img/portImages/prime1.PNG';
import linkedin from '../img/portImages/linkedin.PNG';
import trello from '../img/portImages/trello.PNG';

import tiktok from '../img/portImages/tiktok.PNG';
import covid from '../img/portImages/covid.PNG';
import disney from '../img/portImages/disney.PNG';

import youtube from '../img/portImages/yt.PNG';
import facebook from '../img/portImages/facebook.PNG';
import airbnb from '../img/portImages/airbnb.PNG';

import netflix from '../img/portImages/netflix.PNG';
import pizzaDev from '../img/portImages/pizzaDev.PNG';
import amazon from '../img/portImages/amazon.PNG';
import vbSearchBlog from '../img/portImages/vsSearchBlog.png';
import gpac from '../img/portImages/gpac.png';


const portfolios = [
    {
        id: 41,
        category: 'Machine Learning',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1742321625/diagram-export-18-03-2025-14_13_16_ktxi6h.png',
        link1: 'https://github.com/VaibhavBansal26/Realtime-Logs-Processing',
        link2: 'https://www.youtube.com/watch?v=ZcIbqeIAC0Y',
        // link3: 'https://nyc-taxi-ride-v3-sdzj76dkug3gzjic6obgul.streamlit.app/',
        title: 'Realtime Logs Processing using Apache Airflow, Kafka & Elatisearch (Data Engineering)',
        text: 'Elastisearch, Apache Airflow, Kafka, Python, Data Engineering'
    },
    {
        id: 40,
        category: 'Machine Learning',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1742221900/diagram-export-17-03-2025-10_31_09_elljhp.png',
        link1: 'https://github.com/VaibhavBansal26/Design-Medallion-Architecture-Azure#',
        link2: 'https://www.youtube.com/watch?v=VKSf1NfdjTU',
        // link3: 'https://nyc-taxi-ride-v3-sdzj76dkug3gzjic6obgul.streamlit.app/',
        title: 'Medallion Architecture Design using Azure (Data Engineering)',
        text: 'Azure, Azure Databricks, DBT, Azure SQL Database, Azure Data Factory, Azure DataLake Gen 2'
    },
    {
        id: 39,
        category: 'DevOps',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1742064387/diagram-export-15-03-2025-14_45_57_sfuk8k.png',
        link1: 'https://github.com/VaibhavBansal26/DevSecOps-MovieBooking',
        // link2: 'https://youtu.be/1Ca0Y4s37ls',
        // link3: 'https://nyc-taxi-ride-v3-sdzj76dkug3gzjic6obgul.streamlit.app/',
        title: 'DevSecOps - Movie Booking 2 Stage Deplyement Pipeline using Terraform, Jenkins & Kubernetes',
        text: 'Jenkins, Docker, Terraform, AWS, DevSecOps, SonarQube, Owasp, Trivy, AWS EC2, Amazon EKS, Kubernetes, Prometheus, Grafana, Helm, Email Notification'
    },
    {
        id: 38,
        category: 'DevOps',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1741898583/diagram-export-13-03-2025-16_42_45_gap2r8.png',
        link1: 'https://github.com/VaibhavBansal26/DevSecOps-FoodApp',
        // link2: 'https://youtu.be/1Ca0Y4s37ls',
        // link3: 'https://nyc-taxi-ride-v3-sdzj76dkug3gzjic6obgul.streamlit.app/',
        title: 'DevSecOps - Food App Deployment Full Pipeline using Terraform & Jenkins',
        text: 'Jenkins, Docker, Terraform, AWS, DevSecOps, SonarQube, Owasp, Trivy, AWS EC2'
    },
    {
        id: 37,
        category: 'DevOps',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1741824030/Screenshot_2025-03-12_at_7.57.18_PM_uiktvg.png',
        link1: 'https://github.com/VaibhavBansal26/DevSecOps-Bms',
        // link2: 'https://youtu.be/1Ca0Y4s37ls',
        // link3: 'https://nyc-taxi-ride-v3-sdzj76dkug3gzjic6obgul.streamlit.app/',
        title: 'DevSecOps - App Deployment Full Pipeline',
        text: 'Amazon EKS,Prometheus, Grafana, Helm, Jenkins, Docker, Kubernetes, AWS, DevSecOps, SonarQube, Owasp, Trivy'
    },
    {
        id: 36,
        category: 'Machine Learning',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1740811379/Screenshot_2025-03-01_at_1.42.19_AM_ogxwt9.png',
        link1: 'https://github.com/VaibhavBansal26/Nyc-Taxi-Ride-TimeSeries-Prediction',
        // link2: 'https://youtu.be/1Ca0Y4s37ls',
        link3: 'https://nyc-taxi-ride-v3-sdzj76dkug3gzjic6obgul.streamlit.app/',
        title: 'NYC Taxi Ride Time Series Prediction',
        text: 'Python, Hopsworks, DagsHub Integration, MLflow, Batch Processing, Machine Learning, Time Series, Streamlit'
    },
    {
        id: 35,
        category: 'Machine Learning',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1732640790/Screenshot_2024-11-26_at_11.58.05_AM_wvwita.png',
        link1: 'https://github.com/VaibhavBansal26/data_science_salary_prediction_v2',
        link2: 'https://youtu.be/1Ca0Y4s37ls',
        link3: 'https://datascience-salary-vb.web.app/',
        title: 'Data Science Salary Prediction',
        text: 'Python, Snowflake, Pyspark, React.js, Apache Kafka, Redis, Flask, Airflow, Zookeeper, AWS EC2, AWS S3, Machine Learning, Docker, PostgreSQL, Firebase'
    },
    {
        id: 34,
        category: 'Machine Learning',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1716567573/Screenshot_2024-05-24_at_12.18.33_PM_j1beti.png',
        link1: 'https://github.com/VaibhavBansal26/heart_disease_prediction_version2',
        link2: '',
        link3: 'https://heart-disease-prediction-grp-14.streamlit.app/',
        title: 'Heart Disease Prediction',
        text: 'Python, Mlflow, DagsHub Integration, Streamlit, Digital Ocean, Machine Learning, Docker, SQLite3'
    },
    {
        id: 35,
        category: 'Machine Learning',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1716567905/Screenshot_2024-05-24_at_12.24.44_PM_l2zamc.png',
        link1: 'https://github.com/VaibhavBansal26/sdm-project',
        link2: 'https://youtu.be/Q2NP7hlKeo0',
        link3: 'https://vaibhavbansal.shinyapps.io/sdmproject/',
        title: 'Customer Segmentation And Sales Analysis with Product Recommendation',
        text: 'R, ShinyR, SQLite3, Machine Learning'
    },
    {
        id: 31,
        category: 'Package & Extension',
        image: gpac,
        link1: 'https://github.com/VaibhavBansal26/grapesjs-advance-components',
        link2: '',
        link3: 'https://www.npmjs.com/package/grapesjs-advance-components',
        title: 'Grapesjs Advance Components',
        text: 'Npm package using react js , grapesjs'
    },
    {
        id: 32,
        category: 'Package & Extension',
        image: vbSearchBlog,
        link1: 'https://github.com/VaibhavBansal26/search-blog-vscode-extension',
        link2: '',
        link3: '',
        title: 'VSCode Extension',
        text: 'VSCode extension to search blogs'
    },
    {
        id: 33,
        category: 'React',
        image: "https://i.ytimg.com/vi/ckAm_f78Byc/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB01sBwBL4fTNCXsTJ2kGF0pY7MFw",
        link1: '',
        link2: 'https://www.youtube.com/watch?v=ckAm_f78Byc',
        link3: '',
        title: 'Funnel/Website Builder for Dashclicks India Ltd',
        text: 'Funnel/Website Builder using React, Grapesjs'
    },
    {
        id: 24,
        category: 'React',
        image: disney,
        link1: 'https://github.com/VaibhavBansal26/React-Disney-Plus-UI',
        link2: '',
        link3: 'https://react-disney-vb.web.app/',
        title: 'Disney Plus UI',
        text: 'React, Redux, Styled Components, Firebase'
    },
    {
        id: 25,
        category: 'React',
        image: youtube,
        link1: 'https://github.com/VaibhavBansal26/React-Youtube-UI',
        link2: '',
        link3: 'https://vb-2dab4.web.app/',
        title: 'React Youtube UI',
        text: 'React'
    },
    {
        id: 26,
        category: 'React',
        image: facebook,
        link1: 'https://github.com/VaibhavBansal26/next-facebook-vb',
        link2: '',
        link3: 'https://facebook-vb-dmhdz9rxy-vaibhavbansal26.vercel.app/',
        title: 'React Facebook UI',
        text: 'React, Next JS, Tailwind CSS'
    },
    {
        id: 27,
        category: 'React',
        image: airbnb,
        link1: 'https://github.com/VaibhavBansal26/React-Airbnb-vb',
        link2: '',
        link3: 'https://react-airbnb-vb.web.app/',
        title: 'React Airbnb UI',
        text: 'React'
    },
    {
        id: 28,
        category: 'React',
        image: netflix,
        link1: 'https://github.com/VaibhavBansal26/React-Netflix-App',
        link2: '',
        link3: 'https://react-netflix-vb.web.app/',
        title: 'React Netflix',
        text: 'React, Firebase, Stripe Payment'
    },
    {
        id: 29,
        category: 'Node JS',
        image: pizzaDev,
        link1: 'https://github.com/VaibhavBansal26/Realtime-pizza-order',
        link2: '',
        link3: 'https://pizza-vb.herokuapp.com',
        title: 'Pizza Delivery & Realtime Order Tracking',
        text: 'Node JS, Socket IO, Stripe Payment, EJS Template'
    },
    {
        id: 30,
        category: 'React',
        image: amazon,
        link1: 'https://github.com/VaibhavBansal26/amazon-clone-stripe',
        link2: '',
        link3: 'https://amazon-vaibhav-lj8enz821-vaibhavbansal26.vercel.app/',
        title: 'React Amazon',
        text: 'React, NEXT JS, Redux, Tailwind CSS, Firebase, Stripe Payment'
    },
    {
        id: 1,
        category: 'React',
        image: pizza,
        link1: 'https://github.com/VaibhavBansal26/Sliceline-pizza-order',
        link2: '',
        link3: 'https://react-pizza-5ed50.web.app/',
        title: 'React  Pizza Shop',
        text: 'React, Styled Components'
    },
    {
        id: 2,
        category: 'React',
        image: chat,
        link1: 'https://github.com/VaibhavBansal26/React-Chat-App',
        link2: '',
        link3: 'https://react-chat-24cb1.web.app/',
        title: 'React Chat App',
        text: 'React, Redux and Firebase'
    },
    {
        id: 3,
        category: 'React',
        image: clothing,
        link1: 'https://github.com/VaibhavBansal26/react_ecommerce_app',
        link2: '',
        link3: 'https://vb-clothing-store.web.app/',
        title: 'React Ecommerce Clothing App',
        text: 'React, Redux, Hooks, Firebase & Stripe Payment'
    },
    {
        id: 19,
        category: 'React',
        image: prime,
        link1: 'https://github.com/VaibhavBansal26/React-Amazon-Prime',
        link2: '',
        link3: 'https://react-prime-vb.web.app/',
        title: 'React Amazon Prime',
        text: 'React, Redux, Styled Components, Rapid API, Firebase'
    },
    {
        id: 12,
        category: 'MERN',
        image: instagram,
        link1: 'https://github.com/VaibhavBansal26/MERN-INSTAGRAM-VB',
        link2: '',
        link3: 'https://gleeful-chaja-8dcc5b.netlify.app',
        title: 'MERN Instagram Application (Photo Sharing App)',
        text: 'Mongo DB, Express JS, React JS, Node JS '
    },
    {
        id: 20,
        category: 'React',
        image: linkedin,
        link1: 'https://github.com/VaibhavBansal26/Reacrt-linkedin-vb',
        link2: '',
        link3: 'https://react-linkedin-vb.web.app/',
        title: 'React Linkedin UI App',
        text: 'React, Redux, Styled Components, Firebase'
    },
    {
        id: 4,
        category: 'React',
        image: movie,
        link1: 'https://github.com/VaibhavBansal26/react-movie-app',
        link2: '',
        link3: 'https://react-movie-app-proj.web.app/',
        title: 'React Movie App',
        text: 'React and Tmdb API'
    },
    {
        id: 5,
        category: 'React',
        image: tinder,
        link1: 'https://github.com/VaibhavBansal26/React-tinder-UI',
        link2: '',
        link3: 'https://tinder-match.web.app/',
        title: 'React Tinder UI clone',
        text: 'React with Swipe Functionality'
    },
    {
        id: 6,
        category: 'React',
        image: 'https://res.cloudinary.com/vaibhav-codexpress/image/upload/v1714012147/zoom_v0gjul.png' || zoom,
        link1: 'https://github.com/VaibhavBansal26/Nodejs-Video-Conferencing',
        link2: '',
        link3: 'https://video-conferencing-app-vb.onrender.com/',
        title: 'Video Conferencing App',
        text: 'React, Node JS and Socket IO'
    },
    {
        id: 7,
        category: 'React',
        image: twitter,
        link1: 'https://github.com/VaibhavBansal26/React-Twitter-vb',
        link2: '',
        link3: 'https://react-twitter-apl.web.app/',
        title: 'React Twitter UI Clone',
        text: 'React and Firebase'
    },
    {
        id: 8,
        category: 'React',
        image: slack,
        link1: 'https://github.com/VaibhavBansal26/React-Slack-vb',
        link2: '',
        link3: 'https://react-slack-apl.web.app/,        ',
        title: 'React Slack UI',
        text: 'React and Firebase'
    },
    {
        id: 9,
        category: 'React',
        image: whatsapp,
        link1: 'https://github.com/VaibhavBansal26/React-Whatsapp-UI',
        link2: '',
        link3: 'https://vb-whatsapp-2e8e7.web.app/',
        title: 'React Whatsapp UI & Messaging',
        text: 'React and Firebase'
    },
    {
        id: 10,
        category: 'React',
        image: spotify,
        link1: 'https://github.com/VaibhavBansal26/React-spotify-vb',
        link2: '',
        link3: 'https://react-spotify-apl.web.app/',
        title: 'React Spotify Clone',
        text: 'React and Firebase'
    },
    {
        id: 11,
        category: 'MERN',
        image: yt1,
        link1: 'https://github.com/VaibhavBansal26/React-Mern-Youtube',
        link2: '',
        link3: 'https://mern-youtube-vb.herokuapp.com/',
        title: 'MERN Youtube Application',
        text: 'Mongo DB, Express JS, React JS, Node JS - Register & Login to use Features '
    },
    {
        id: 13,
        category: 'Node JS',
        image: tour,
        link1: 'https://github.com/VaibhavBansal26/node-natours-travel-app',
        link2: '',
        link3: 'https://natours-booking-app-vaibhav.herokuapp.com/',
        title: 'Travelling and Adventrous Tour App with Stripe',
        text: 'Server Side Rendering - Node JS, PUG Templates, Stripe Integration'
    },
    {
        id: 14,
        category: 'Machine Learning',
        image: natural,
        link1: 'https://github.com/VaibhavBansal26/Capstone-2020-Natural-Disaster-Prediction',
        link2: 'https://www.youtube.com/watch?v=Gad5vz1Pkcc',
        link3: '',
        title: 'Natural Disaster Prediction & Management ',
        text: 'Python, Flask, Google API,Machine Learning Algorithms, Deep Learning Methods'
    },
    {
        id: 15,
        category: 'React',
        image: hulu,
        link1: 'https://github.com/VaibhavBansal26/React-Hulu',
        link2: '',
        link3: 'https://react-hulu-vb.web.app/',
        title: 'React Hulu Clone',
        text: 'React'
    },
    {
        id: 16,
        category: 'React',
        image: news,
        link1: 'https://github.com/VaibhavBansal26/React-news-app-ui',
        link2: '',
        link3: 'https://daily-newz.web.app/',
        title: 'React NEWZ App',
        text: 'React and API'
    },
    {
        id: 17,
        category: 'React',
        image: nba,
        link1: 'https://github.com/VaibhavBansal26/React-Nba-app',
        link2: '',
        link3: 'https://react-nba-vaibhav.web.app/',
        title: 'React NBA App',
        text: 'React'
    },
    {
        id: 18,
        category: 'React',
        image: artist,
        link1: 'https://github.com/VaibhavBansal26/React-Artist-vb',
        link2: '',
        link3: 'https://react-artist-a0b21.web.app/',
        title: 'React Music Artist App',
        text: 'React'
    },
   
    {
        id: 21,
        category: 'React',
        image: trello,
        link1: 'https://github.com/VaibhavBansal26/React-trello',
        link2: '',
        link3: 'https://react-trello-vb.web.app',
        title: 'React Trello UI',
        text: 'React'
    },
    {
        id: 22,
        category: 'React',
        image: tiktok,
        link1: 'https://github.com/VaibhavBansal26/React-tiktok-UI',
        link2: '',
        link3: 'https://mern-tiktok-vb.web.app/',
        title: 'React Tiktok UI',
        text: 'React'
    },
    {
        id: 23,
        category: 'React',
        image: covid,
        link1: 'https://github.com/VaibhavBansal26/React-Covid-Tracker',
        link2: '',
        link3: 'https://react-covid-vb.web.app/',
        title: 'React Covid 19 Tracker',
        text: 'React, Context API'
    },
    
    
]

export default portfolios;