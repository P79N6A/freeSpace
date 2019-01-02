from django.db import models


# Create your models here.
class User(models.Model):
    nickname = models.CharField(max_length=20, unique=True)
    password_hash = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=30)
    join_time = models.DateTimeField(auto_now=True)
    signature = models.CharField(max_length=100, null=True)
    sex = models.NullBooleanField(null=True)  # 真为Ｔｒｕｅ
    address = models.CharField(max_length=30, null=True)
    follow_count = models.BigIntegerField(default=0)
    fans_count = models.BigIntegerField(default=0)
    avatar = models.URLField(verbose_name='头像', default="/static/img/white.png", )
    fan = models.ManyToManyField("User", related_name="follow")


class Blog(models.Model):
    botitle = models.CharField(max_length=50)
    bocontent = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True, db_index=True)
    user = models.ForeignKey(User)
    view_count = models.BigIntegerField(default=0, db_index=True)
    up_count = models.BigIntegerField(default=0)
    down_count = models.BigIntegerField(default=0)
    is_open = models.BooleanField(default=True)  # 是否公开，默认为是

    def see(self):
        self.view_count += 1
        self.save()


class Question(models.Model):
    qttitle = models.CharField(max_length=50)
    qtdetail = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True, db_index=True)
    user = models.ForeignKey(User)


class Q_Tag(models.Model):
    tagname = models.CharField(max_length=20)
    question = models.ForeignKey(Question)


class B_Tag(models.Model):
    tagname = models.CharField(max_length=20)
    blog = models.ForeignKey(Blog)


class Up_Down(models.Model):
    blog = models.ForeignKey(Blog, verbose_name="文章")
    user = models.ForeignKey(User, verbose_name="赞或踩的用户")
    if_up = models.BooleanField(verbose_name="是否为赞")

    @staticmethod
    def add_up_count(blog_id):
        blog = Blog.objects.filter(id=blog_id).first()
        blog.up_count += 1
        blog.save()

    @staticmethod
    def add_down_count(blog_id):
        blog = Blog.objects.filter(id=blog_id).first()
        blog.down_count += 1
        blog.save()
