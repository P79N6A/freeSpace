# start project
1.django-admin startproject sitename
2.IDE

# frequent command
``` bash
python manage.py runserver 0.0.0.0
python manage.py startapp appname
python manage.py syncdb
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

# config
## database
``` python
DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME':'dbname',
    'USER': 'root',
    'PASSWORD': 'xxx',
    'HOST': '',
    'PORT': '',
    }
}
```
由于Django内部连接MySQL时使用的是MySQLdb模块，而python3中还无此模块，所以需要使用pymysql来代替
如下设置放置的与project同名的配置的 __init__.py文件中
``` python
import pymysql
pymysql.install_as_MySQLdb()
```　
## templates
``` python
TEMPLATE_DIRS = (
        os.path.join(BASE_DIR,'templates'),
    )
```
## static
``` python
STATICFILES_DIRS = (
        os.path.join(BASE_DIR,'static'),
    )
```

# url map system
