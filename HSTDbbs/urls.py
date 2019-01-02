"""HSTDbbs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from app import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'^admin/', admin.site.urls),
    url(r'^index.html/$', views.index),
    url(r'^check_code.html/$', views.checkcode),
    url(r'^is_user.html/$', views.is_user),
    url(r'^is_check.html/$', views.is_check),
    url(r'^register.html/$', views.register),
    url(r'^login.html/$', views.login),
    url(r'^login_check.html/$', views.login_check),
    url(r'^write_blog.html/$', views.write_blog),
    url(r'^add_blog.html/$', views.add_blog),
    url(r'^load-file/$', views.load_file),
    url(r'^file_manager_json/$', views.file_manager_json),
    url(r'^add_question.html/$', views.add_question),
    url(r'^upload_avatar.html/$', views.upload_avatar),
    url(r'^personal_backend/(?P<nid>\d+).html/$', views.personal_backend),
    url(r'^personal_backend/(?P<nid>\d+)/tab1.html/$', views.personal_backend_tab1),
    url(r'^personal_backend/(?P<nid>\d+)/tab2.html/$', views.personal_backend_tab2),
    url(r'^personal_backend/(?P<nid>\d+)/tab3.html/$', views.personal_backend_tab3),
    url(r'^personal_backend/(?P<nid>\d+)/tab4.html/$', views.personal_backend_tab4),
    url(r'^delete/(?P<nid>\d+).html/$', views.delete_blog),
    url(r'^change_status/(?P<nid>\d+).html/$', views.change_status),
    url(r'^editprofile/(?P<nid>\d+).html/$', views.editprofile),
    url(r'^blog_detail/(?P<nid>\d+).html/$', views.blog_detail),
    url(r'^blog_detail/up_down/(?P<nid>\d+).html/$', views.up_down),
    url(r'^follow/(?P<nid>\d+)/(?P<uid>\d+).html/$', views.follow),
    url(r'^unfollow/(?P<nid>\d+)/(?P<uid>\d+).html/$', views.unfollow),
    url(r'^all_blog/$', views.all_blog),
    url(r'^all_question/$', views.all_question),
]
