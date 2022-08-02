# KataGoVisualizer

For live updating during development, go to Dockerfile and comment out this line:
```
COPY streamlit-app .
```
and uncomment this following line in docker-compose.yml
```
      -  ./streamlit-app:/home/appuser 
```