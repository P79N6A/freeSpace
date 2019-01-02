# DjangoBlog
A blog based on django and mysql

pip3 install --index-url http://pypi.doubanio.com/simple/ -r requirements.txt --trusted-host=pypi.doubanio.com
gunicorn --name hh -k gevent --timeout "120" --log-level debug -b 0.0.0.0:5488 -w 2 HSTDbbs.wsgi