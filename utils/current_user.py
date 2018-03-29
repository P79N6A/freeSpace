from app import models
from urllib import request as urlrequest


def get_current_user_name(request):
    mm=request.COOKIES.get("username", None) if request.COOKIES.get("username", None) else "%A"
    name = urlrequest.unquote(mm)
    return name

def get_current_user_object(request):
    mm = request.COOKIES.get("username", None) if request.COOKIES.get("username", None) else "%A"
    username= urlrequest.unquote(mm)
    user=models.User.objects.filter(nickname=username).first()
    return user