# Getting started

To build and run the app, clone this repository, navigate to the repository root and run:

```
READ_DIR=/path/to/my/dir docker-compose up --build
```
`READ_DIR` is required and sets the path where the docker container is mounted (with read only permissions).

# Development

For live updating during development, go to the `Dockerfile` and comment out this line:
```
COPY streamlit-app .
```
and uncomment this line in `docker-compose.yml`
```
      -  ./streamlit-app:/home/appuser
```
Both lines are indicated by comments in their respective files.

## Architecture
The app consists of two Docker containers, running in a single Docker network orchestrated by Docker compose.

The first container, `streamlit-app` is the main webapp. It listens for HTTP traffic on port `8501`, which is exposed outside the container, so that browsers can connect to it to view the webpage.

The `streamlit-app` container is a webserver that runs both [Dtale](https://github.com/man-group/dtale) (an webapp for viewing and analyzing tabular data) and [Streamlit](https://streamlit.io/) (a python webapp framework). This uses a Dtale command
```
dtale-streamlit run streamlit_app.py
```
which is a [hack implemented by Dtale](https://github.com/man-group/dtale/blob/master/docs/EMBEDDED_STREAMLIT.md) so that you can run these two apps on one server and embed Dtale iframes within Streamlit.

The second container, `parsing-server`, listens on port `6536`, using `multiprocessing.connection.Listener`. This port is not exposed outside the Docker network, it is only used by the other container to parse sgf files. The reason for this container is that Streamlit apps cannot start `multiprocessing` tasks in a user session, which is essential to quickly parse large files.

The project depends on a [custom fork of Dtale](https://github.com/UFO-101/dtale). It has two additional features.
 1. The frontend reports the last clicked cell to the backend which can be accessed with `global_state.get_last_clicked_cell(data_id)`. This us to display the Go game when the user clicks on a row in the table.
 2. The sort algorithm is stable. This ensures the order of the Dtale table is fully determined by the Streamlit session state, enabling deep linking to a particular table state and game.

## Directory Structure
```
KataGoVisualizer/
├── parsing-server/
│   ├── Pipfile
│   ├── Pipfile.lock
│   └── source...
├── streamlit-app/
│   ├── components/
│   │   ├── subcomponents/
│   │   │   └── source...
│   │   └── source...
│   ├── Pipfile
│   ├── Pipfile.lock
│   ├── requirements.txt
│   └── streamlit_app.py
├── Dockerfile
└── docker-compose.yml
```
[Generated here](https://tree.nathanfriend.io/?s=(%27options!(%27fancy!true~fullPath!false~trailingSlash!true~rootDot!false)~3!(%273!%27KataGoVisualizer4parsing-server7846-app*5sub508*087requiremE.txt*6_app.py4D9erC4d9er-Ase.yml*B%27)~version!%271%27)*400%20%202*PipC3source4B05AnE*06streamlit722.l9*83...9ockAcompoB%5CnCfileEents%01ECBA987654320*)

Each container manages it dependencies with `pipenv` using a `Pipfile`. There is also a `requirements.txt` in `streamlit-app/` because there appears to be some bug which prevents `pipenv` from reliably installing the editable dependency on the [Dtale fork](https://github.com/UFO-101/dtale). New packages should be added by installing with `pipenv` and then running `pip freeze`.

To prevent circular dependencies, custom Streamlit `components/` only import `subcomponents/` and `subcomponents/` do not import any other modules in the repo.

# Quick introduction to Streamlit

Streamlit webapps are written in python in an imperative style. A python script is run from top to bottom, rendering UI elements as they are encountered. Every time the user interacts with the UI, the script is rerun, with interactive components returning their current states.

Example:
```
import streamlit as st
x = st.slider("x")  # Render a slider. Return the current position.
st.write(x, "squared is", x * x) # Render text.
```

In the above example, each time the user move the slider, the script reruns.

## Sessions, state and callbacks

Each time a user navigates to a Streamlit app, a new session begins. Each browser tab corresponds to a different session and refreshing the page starts a new session. Streamlit reruns our whole imperative script on each user iteration, so we need to use a special object, `st.session_state`, to maintain state during a session.

Interactive streamlit elements usually have a `key` parameter, which corresponds to the key in `st.session_state` which maintains the state for that element. Interactive elements also usually have some optional callback parameters. These are called after a user interacts with the element, but before our script reruns.

An example that illustrates all these concepts is the password authentication component in the KataGo Visualizer script:

```
# Authenticate with secret password
state = st.session_state
def verify():
    state["hash"] = hashlib.scrypt(str.encode(state.pw), salt=b"salt", n=2048, r=8, p=1)

if state.get("hash") != HASH:
    password = st.text_input("Password", type="password", on_change=verify, key="pw")
    if st.button("Submit"):
        st.error("Wrong password")
    st.stop()
```

Initially, `state["hash"]` is unset, so the password input UI is rendered and the script exits at `st.stop()`. As the user types, the `verify()` callback updates `state["hash"]`, getting the current input text from `state.pw`. When the user clicks on `st.button("Submit")`, the script will rerun. If the password is correct, `state.get("hash") != HASH` will evaluate to `false`, the password input UI will be skipped and the rest of the app will render. If the password is incorrect, the password input UI will be rendered and this time `st.button("Submit")` will evaluate to `True` (because it was just clicked) and the `"Wrong password"` message will render.

# Design principles for Streamlit

State and deep linking (restoring state from URL parameters) have been the sources of most bugs and complexity during development. For this reason the codebase now adheres to two rules that simplify these aspects:

 1. Don't read the URL parameters, except once at the start of a session to restore state.
 2. Don't reference any state variable in more than one component.
 
The aim is to emulate the functional/declarative paradigm of React and similar frameworks. The appearance of a component should be fully determined by a known list of variables in `st.session_state` (these variables are named in ALL_CAPS at the top of the module). And no component should modify any state variable that is relevant to another component.

Note: Many of the custom components in `/components` will raise an error if more than one is rendered on the same page because the keys are hardcoded and Streamlit components must have unique keys. If multiple copies of a custom component are required it should be simple to pass the key as a parameter to the custom component instead, or append a random UUID to the state variable names.
