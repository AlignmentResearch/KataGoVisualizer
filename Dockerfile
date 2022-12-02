# Sources: https://sourcery.ai/blog/python-docker/
# and https://github.com/pypa/pipenv/blob/2bf70b74167868133809a926aa6393438fb06db4/docs/basics.rst#-pipenv-and-docker-containers
FROM python:3.10-slim as base

# Setup env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1


FROM base AS pipenv

# Install pipenv and compilation dependencies
RUN pip3 install --user --no-cache-dir pipenv
RUN apt-get update && apt-get install -y --no-install-recommends gcc python-dev git && rm -rf /var/lib/apt/lists/*

# Tell pipenv to create venv in the current directory
ENV PIPENV_VENV_IN_PROJECT=1


# ----- Build Streamlit App -----
FROM pipenv AS streamlit-app-python-deps

# Install python dependencies in /.venv
# COPY streamlit_app/Pipfile .
# COPY streamlit_app/Pipfile.lock .
# RUN /root/.local/bin/pipenv sync
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY go_attack_utils ./../go_attack_utils
COPY streamlit_app/requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip3 install tensorflow


FROM base AS streamlit-app

# Install latex - https://stackoverflow.com/a/53080504/7086623
RUN apt-get update && apt-get install -y texlive-latex-extra texlive-fonts-recommended dvipng cm-super curl jq && rm -rf /var/lib/apt/lists/*

# Copy virtual env from python-deps stage
# COPY --from=streamlit-app-python-deps /.venv /.venv
COPY --from=streamlit-app-python-deps /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Download Ngrok
RUN curl https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz --output /tmp/ngrok.tgz
RUN tar -xvzf /tmp/ngrok.tgz -C / && rm /tmp/ngrok.tgz

# Create and switch to a new user
RUN useradd --create-home appuser
WORKDIR /home/appuser
USER appuser
RUN mkdir -p /home/appuser/.config/ngrok && chmod -R 777 /home/appuser

# Install application into container
COPY streamlit_app .

# Run ngrok, the parsing server, and the main dtale/streamlit application.
# Trap allows all processes and subprocesses to exit gracefully.
CMD (trap 'kill 0' INT; \
    if [ ! -z $NGROK_AUTHTOKEN ]; \
    then \
    /ngrok config add-authtoken $NGROK_AUTHTOKEN; \
    /ngrok http \
    # Only include the --hostname flag if $NGROK_HOSTNAME is not empty
    $( [ ! -z $NGROK_HOSTNAME ] && printf %s "--hostname=$NGROK_HOSTNAME" ) 8501 \
    --oauth=google --oauth-allow-domain=humancompatible.ai,alignmentfund.org \
    --oauth-allow-email=$NGROK_EMAILS \
    > /dev/null & \
    # Wait for ngrok to start
    sleep 2; \
    printf "\n --- Ngrok running at $(curl -s http://localhost:4040/api/tunnels | jq ".tunnels[0].public_url") ---\n\n"; \
    fi; \
    python parsing_server.py & \
    dtale-streamlit run streamlit_app.py)
