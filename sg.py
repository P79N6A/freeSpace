from app.models import User
from django.db.models.signals import pre_init


def callback(sender,**kwargs):
    print("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    print(sender,kwargs)

pre_init.connect(callable)