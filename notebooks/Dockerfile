# To build, navigate to the *root* of this repo and run:
# docker build . -f notebooks/Dockerfile -t humancompatibleai/katagovisualizer:notebooks

FROM nvidia/cuda:11.7.1-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install utilities
RUN apt-get update -q \
  && apt-get install -y \
  # python
  python3.10-venv \
  # latex
  texlive-latex-extra \
  texlive-fonts-recommended \
  dvipng \
  cm-super \
  # others
  curl \
  git \
  sudo \
  vim \
  uuid-runtime \
  wget \
  # Clean up
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Create virtualenv and 'activate' it by adjusting PATH.
# See https://pythonspeed.com/articles/activate-virtualenv-dockerfile/.
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV --system-site-packages
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install pip requirements
RUN pip install --no-cache-dir --upgrade pip setuptools
COPY notebooks/requirements.txt /downloads/requirements.txt
# The current directory is /workspace (in the container), so this copies to / (in the container). This works because the requirements.txt file in /workspace specifies a dependency on ./../go_attack_utils. The reason I did it like this is so that the folder is in the same relative directory in the container as it is in the repo. So you could install the same requirements.txt locally.
COPY go_attack_utils ./../go_attack_utils
RUN pip install --no-cache-dir -r /downloads/requirements.txt
