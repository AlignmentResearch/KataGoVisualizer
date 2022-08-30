# Sources: https://sourcery.ai/blog/python-docker/ and 
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
RUN apt-get update && apt-get install -y --no-install-recommends gcc python-dev git

# Tell pipenv to create venv in the current directory
ENV PIPENV_VENV_IN_PROJECT=1


# ----- Build Streamlit App -----
FROM pipenv AS streamlit-app-python-deps

# Install python dependencies in /.venv
# COPY streamlit-app/Pipfile .
# COPY streamlit-app/Pipfile.lock .
# RUN /root/.local/bin/pipenv sync
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY streamlit-app/requirements.txt .
RUN pip3 install -r requirements.txt


FROM base AS streamlit-app

# Copy virtual env from python-deps stage
# COPY --from=streamlit-app-python-deps /.venv /.venv
COPY --from=streamlit-app-python-deps /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Create and switch to a new user
RUN useradd --create-home appuser
WORKDIR /home/appuser
USER appuser

# Install application into container
# Comment out for live updating
COPY streamlit-app .

# Run the application
CMD ["dtale-streamlit", "run", "streamlit_app.py"]


# ----- Build Parsing Server -----
FROM pipenv AS parsing-server-python-deps

# Install python dependencies in /.venv
COPY parsing-server/Pipfile .
COPY parsing-server/Pipfile.lock .
RUN /root/.local/bin/pipenv sync


FROM base AS parsing-server

# Copy virtual env from python-deps stage
COPY --from=parsing-server-python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Create and switch to a new user
RUN useradd --create-home appuser
WORKDIR /home/appuser
USER appuser

# Install application into container
COPY parsing-server .

# Run the application
CMD ["python", "parsing_server.py"]
