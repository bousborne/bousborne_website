#COPY . /app
#RUN npm install
#FROM python:3 AS python3builder
#WORKDIR /app
#COPY requirements.txt ./
#RUN pip install --no-cache-dir --upgrade pip \
#  && pip install --no-cache-dir -r requirements.txt

#FROM python:2.7 AS python2base
#WORKDIR /app
#COPY requirements.txt ./
#RUN pip install --no-cache-dir --upgrade pip \
#  && pip install --no-cache-dir -r requirements.txt


FROM node:14-alpine

ARG PYTHON_VERSION=2.7.18

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



RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools


WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD . /app

RUN npm install
RUN npm install -g @angular/cli
EXPOSE 4200:4200 55153:49153
CMD ng serve --host 0.0.0.0




#CMD npm start
#CMD ng serve --host 0.0.0.0
#USER node
#EXPOSE 4200 49153
#CMD ng serve
