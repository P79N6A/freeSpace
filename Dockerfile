FROM python:3.7
MAINTAINER Andrewpqc <pengqianchao@bytedance.com>

ENV DEPLOY_PATH /freeSpace

RUN mkdir -p $DEPLOY_PATH
WORKDIR $DEPLOY_PATH

Add requirements.txt requirements.txt
RUN pip install --index-url http://pypi.doubanio.com/simple/ -r requirements.txt --trusted-host=pypi.doubanio.com

Add . .


