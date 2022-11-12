# NPM Node.js version
FROM node:16-alpine

ARG PYTHON_VERSION=2.7.18

# install dependencies
RUN apk add \
    wget \
    gcc \
    make \
    zlib-dev \
    libffi-dev \
    openssl-dev \
    musl-dev

# download and extract python sources
#RUN cd /opt \
#    && wget https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz \                                              
#    && tar xzf Python-${PYTHON_VERSION}.tgz

# build python and remove left-over sources
#RUN cd /opt/Python-${PYTHON_VERSION} \ 
#    && ./configure --prefix=/usr --enable-optimizations --with-ensurepip=install \
#    && make install \
#    && rm /opt/Python-${PYTHON_VERSION}.tgz /opt/Python-${PYTHON_VERSION} -rf


# install python
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ADD . /app

# install and cache app dependencies
RUN npm install
RUN npm install -g @angular/cli

# expose ports
EXPOSE 4200:4200 55153:49153

# serve up to localhost
CMD ng serve --host 0.0.0.0

