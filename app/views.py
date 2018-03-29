from django.shortcuts import render,HttpResponse,redirect
# from utils.check_code import create_validate_code
from validateCodeTool import create_validate_code
from utils.password_md5 import get_hash
from utils.current_user import get_current_user_name,get_current_user_object
from utils.xss import XSSFilter
from app import models
from io import BytesIO
import json,time,os,re
from datetime import datetime
from HSTDbbs import settings

# Create your views here.


#生成验证码图片
def checkcode(request):
    stream = BytesIO()
    img, code = create_validate_code()
    img.save(stream, "PNG")
    request.session["CheckCode"] = code
    return HttpResponse(stream.getvalue())

#检查用户名是否被占用
def is_user(request):
    name=request.POST.get("nickname")
    obj=models.User.objects.filter(nickname=name).first()
    flag="false" if obj else "true"
    return HttpResponse(flag)

#检查验证码是否正确
def is_check(request):
    code=request.POST.get("checkcode")
    if request.session["CheckCode"].upper()==code.upper():
        return HttpResponse("true")
    else:
        return HttpResponse("false")

#返回主页视图
def index(request):
        user=get_current_user_object(request)
        blogs=models.Blog.objects.all().order_by("-create_time")
        questions=models.Question.objects.all().order_by("-create_time")
        return render(request,"index.html",{"blogs":blogs,"questions":questions,"user":user})


def register(request):
    """用户注册"""
    nickname=request.POST.get("nickname")
    password=request.POST.get("password1")
    email=request.POST.get("email")
    user=models.User(nickname=nickname,password_hash=get_hash(password),email=email)
    user.save()
    return HttpResponse("true")


def login_check(request):
    """
    检查注册时的用户名和密码是否是否正确
    """
    name=request.POST.get("nickname")
    pwd=request.POST.get("password")
    user=models.User.objects.filter(nickname=name,password_hash=get_hash(pwd)).first()
    flag="true" if user else "false"
    return HttpResponse(flag)

#登录
def login(request):
    name=request.POST.get("nickname_log")
    pwd=request.POST.get("password")
    user = models.User.objects.filter(nickname=name, password_hash=get_hash(pwd)).first()
    flag="true" if user else "false"
    return HttpResponse(flag)

def write_blog(request):
    user=get_current_user_object(request)
    return render(request,"add_blog.html",{"user":user})

def load_file(request):
    name=get_current_user_name(request)
    ext_allowed = {}
    ext_allowed["image"] = ['gif', 'jpg', 'jpeg', 'png']
    ext_allowed["flash"] = ["swf", "flv"]
    ext_allowed["media"] = ["swf", "flv", "mp3", "wav", "wma", "wmv", "mid", "avi", "mpg", "asf", "rm", "rmvb"]
    ext_allowed["file"] = ["doc", "docx", "xls", "xlsx", "ppt", "htm", "html", "txt", "zip", "rar", "gz", "bz2"]

    max_size = 1000000
    today = datetime.today()
    dir_name = request.GET["dir"]#获取文件类型
    #save_dir = '/attached/' + dir_name + '/%d/%d/%d/' % (today.year, today.month, today.day)
    save_dir = '/attached/' + '/%s/' % (name,)+dir_name+"/"
    save_path = settings.STATICFILES_DIRS[0] + save_dir
    save_url = settings.STATIC_URL + save_dir

    if request.method == 'POST':
        file_content = request.FILES['myfile']#文件名在前端自定义

        if not file_content.name:
            return HttpResponse(json.dumps(
                {'error': 1, 'message': u'请选择要上传的文件'}
            ))

        ext = file_content.name.split('.').pop()

        if ext not in ext_allowed[dir_name]:
            return HttpResponse(json.dumps(
                {'error': 1, 'message': u'请上传后缀为%s的文件' % ext_allowed[dir_name]}
            ))

        if file_content.size > max_size:
            return HttpResponse(json.dumps(
                {'error': 1, 'message': u'上传的文件大小不能超过10MB'}
            ))

        if not os.path.isdir(save_path):
            os.makedirs(save_path)

        new_file = '%s.%s' % (int(time.time()), ext)

        destination = open(save_path + new_file, 'wb+')
        for chunk in file_content.chunks():
            destination.write(chunk)
        destination.close()

        return HttpResponse(json.dumps(
            {'error': 0, 'url': save_url + new_file}
        ))

def file_manager_json(request):
    name = get_current_user_name(request)
    root_path = settings.STATICFILES_DIRS[0] + "/attached/%s/"%(name,)
    root_url = settings.STATIC_URL + "/attached/%s/"%(name,)
    file_types = ["gif", "jpg", "jpeg", "png", "bmp"]
    dir_types = ['image', 'flash', 'media', 'file']

    dir_name = request.GET["dir"]

    if dir_name:
        if dir_name not in dir_types:
            print("Invalid Directory name.")
            return
        root_path = root_path + dir_name + "/"
        root_url = root_url + dir_name + "/"
        if not os.path.isdir(root_path) or not os.path.exists(root_path):
            os.makedirs(root_path)

    path = request.GET["path"]
    if not path:
        path = ""
    current_path = root_path + path
    current_url = root_url + path
    current_dir_path = path
    moveup_dir_path = ""

    if path:
        m = re.search(r'(.*?)[^\/]+\/$', current_dir_path)
        moveup_dir_path = m.group(1)

    order = request.GET["order"]
    if order:
        order = order.lower()#string.lower(order)
    else:
        order = "name"

    if ".." in current_path:
        print("Access is not allowed.")
        return

    if re.search(r'(\/$)', current_path).group(0) != '/':
        print("Parameter is not valid.")
        return

    if not os.path.isdir(current_path) or not os.path.exists(current_path):
        print( "'Directory does not exist.")

        return

    file_list = []
    if os.listdir(current_path):
        for file_name in os.listdir(current_path):
            dicts = {}
            file_path = current_path + file_name
            if os.path.isdir(file_path):
                dicts["is_dir"] = True
                dicts["has_file"] = len(os.listdir(file_path)) > 0
                dicts["filesize"] = 0
                dicts["is_photo"] = False
                dicts["filetype"] = ""
            else:
                dicts["is_dir"] = False
                dicts["has_file"] = False
                dicts["filesize"] = os.path.getsize(file_path)

                extensions = file_name.split(".")
                length = len(extensions) - 1
                if extensions[length].lower() in file_types:
                    dicts["is_photo"] = True
                else:
                    dicts["is_photo"] = False
                dicts["filetype"] = extensions[length].lower()
            dicts["filename"] = file_name
            dicts["datetime"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            file_list.append(dicts)

        results = {}
        results["moveup_dir_path"] = moveup_dir_path
        results["current_dir_path"] = current_dir_path
        results["current_url"] = current_url
        results["total_count"] = len(file_list)
        results["file_list"] = file_list

        return HttpResponse(json.dumps(results))

def add_question(request):
    dic = {}
    user = get_current_user_object(request)
    content = request.POST.get("qu_content").strip()
    title = request.POST.get("qu_title").strip()
    if not content:
        dic["content"] = "博客内容不能为空！"
    if not title:
        dic["title"] = "博客标题不能为空！"
    if len(title) > 50:
        dic["title"] = "请将标题控制在50个字符之间！"
    tags = request.POST.get("qu_tags").strip().split(" ")
    new_tags = []
    for tag in tags:
        if tag and len(tag) < 20:
            new_tags.append(tag)
    if not new_tags:
        dic["tags"] = "标签不能为空！"
    if not dic:
        dic["status"] = True
        content=XSSFilter().process(content)
        qu_obj = models.Question(qttitle=title, qtdetail=content, user_id=user.id)
        qu_obj.save()
        for tag in new_tags:
            tag_obj = models.Q_Tag(tagname=tag, question_id=qu_obj.id)
            tag_obj.save()
        return HttpResponse(json.dumps(dic))
    else:
        dic["status"] = False
        return HttpResponse(json.dumps(dic))

def add_blog(request):
    dic={}
    user=get_current_user_object(request)
    content=request.POST.get("blog_content").strip()
    title=request.POST.get("blog_title").strip()
    if not content :
        dic["content"]="博客内容不能为空！"
    if not title:
        dic["title"]="博客标题不能为空！"
    if len(title)> 50:
        dic["title"]="请将标题控制在50个字符之间！"
    open = request.POST.get("open")
    open_or_not = True if open == "y" else False
    tags = request.POST.get("blog_tags").strip().split(" ")
    new_tags=[]
    for tag in tags:
        if tag and len(tag)<20:
            new_tags.append(tag)
    if not new_tags:
        dic["tags"]="标签不能为空！"
    if not dic:
        dic["status"]=True
        content=XSSFilter().process(content)
        blog_obj=models.Blog(botitle=title, bocontent=content, user_id=user.id, is_open=open_or_not)
        blog_obj.save()
        for tag in new_tags:
            tag_obj=models.B_Tag(tagname=tag,blog_id=blog_obj.id)
            tag_obj.save()
        return HttpResponse(json.dumps(dic))
    else:
        dic["status"]=False
        return HttpResponse(json.dumps(dic))

def personal_backend(request,nid):
    user=models.User.objects.filter(id=nid).first()
    return render(request,"personal_backend.html",{"user":user})

def personal_backend_tab1(request,nid):
    user = models.User.objects.filter(id=nid).first()
    flag = request.path_info[23]
    return render(request, "tab1.html", {"user": user,"flag":flag})

def personal_backend_tab2(request,nid):
    user = models.User.objects.filter(id=nid).first()
    posts=user.blog_set.all()
    flag=request.path_info[23]
    return render(request, "tab2.html", {"user":user,"flag":flag,"posts":posts})

def personal_backend_tab3(request,nid):
    user = models.User.objects.filter(id=nid).first()
    flag = request.path_info[23]
    questions=user.question_set.all()
    return render(request, "tab3.html", {"user":user,"flag":flag,"questions":questions})

def personal_backend_tab4(request,nid):
    user = models.User.objects.filter(id=nid).first()
    flag = request.path_info[23]
    followme=user.fan.all()
    mefollow=user.follow.all()
    print(mefollow)

    return render(request, "tab4.html", {"user":user,"flag":flag,"followme":followme,"mefollow":mefollow})

def delete_blog(request,nid):
    models.Blog.objects.filter(id=nid).delete()
    user=get_current_user_object(request)
    return redirect("/personal_backend/%s/tab2.html/"%user.id)

def editprofile(request,nid):
    email=request.POST.get("email")
    gender=request.POST.get("gender")
    address=request.POST.get("address")
    signature=request.POST.get("signature")
    sex=True if gender=="male" else False
    models.User.objects.filter(id=nid).update(email=email,sex=sex,address=address,signature=signature)
    return HttpResponse("ok")

#上传头像
def upload_avatar(request):
    current_user = get_current_user_object(request)
    if request.method == 'POST':
        file_obj = request.FILES.get('avatar_img')
        if not file_obj:
            pass
        else:
            file_name  = current_user.nickname+".png"#str(uuid.uuid4())#request.session.get("user", "")+".png" #str(uuid.uuid4())
            file_path = os.path.join('static/img/avatar', file_name)
            f = open(file_path, 'wb')
            for chunk in file_obj.chunks():
                f.write(chunk)
            current_user.avatar="/"+file_path
            current_user.save()
    return HttpResponse(json.dumps(True))

def blog_detail(request,nid):
    user=get_current_user_object(request)
    blog=models.Blog.objects.filter(id=nid).first()
    blog.see()
    tags=blog.b_tag_set.all()
    if_follow=blog.user.fan.filter(id=user.id).first()
    print(if_follow)
    if_up_already = models.Up_Down.objects.filter(if_up=True, user_id=user.id, blog_id=nid).first()
    if_down_already = models.Up_Down.objects.filter(if_up=False, user_id=user.id, blog_id=nid).first()
    up_count = models.Up_Down.objects.filter(if_up=True, blog_id=nid).count()
    down_count = models.Up_Down.objects.filter(if_up=False, blog_id=nid).count()
    return render(request,"blog_detail.html",{"blog":blog,"tags":tags,"user":user,
                                              "if_down_already": if_down_already,
                                              "if_up_already": if_up_already,
                                              "up_count": up_count,
                                              "down_count": down_count,
                                              "if_follow":if_follow
                                              })

def up_down(request,nid):
    current_user=get_current_user_object(request)
    type=request.POST.get("type","")
    flag=True if type=="up" else False
    obj=models.Up_Down.objects.filter(blog_id=nid).first()
    if current_user.blog_set.filter(id=nid).first():
        return HttpResponse("不能赞或踩自己的文章")
    else:
        if not obj:
            ud=models.Up_Down(blog_id=nid,user_id=current_user.id,if_up=flag)
            ud.save()
            if flag:
                ud.add_up_count(nid)
            else:
                ud.add_down_count(nid)
            return HttpResponse("ok")
        else:
            user_obj=current_user.up_down_set.filter(blog_id=nid).first()
            if not user_obj:
                ud = models.Up_Down(blog_id=nid, user_id=current_user.id, if_up=flag)
                ud.save()
                if flag:
                    ud.add_up_count(nid)
                else:
                    ud.add_down_count(nid)
                return HttpResponse("ok")
            else:
                msg="你已经评价过这篇文章，不能再赞或踩"
                return HttpResponse(msg)



def change_status(request,nid):
    blog=models.Blog.objects.filter(id=nid).first()
    flag=False if blog.is_open else True
    blog.is_open=flag
    blog.save()
    user = get_current_user_object(request)
    return redirect("/personal_backend/%s/tab2.html/" % user.id)


def follow(request,nid,uid):
    #分别得到发送请求来的用户和他所要关注的用户
    current_user=get_current_user_object(request)
    user=models.User.objects.filter(id=nid).first()
    #添加关注关系记录
    user.fan.add(current_user.id)
    #发送请求者关注的人数加一，被关注这的粉丝数加一
    current_user.follow_count+=1
    current_user.save()
    user.fans_count+=1
    user.save()
    return redirect("/blog_detail/%s.html/" % uid)


def unfollow(request,nid,uid):
    current_user=get_current_user_object(request)
    user = models.User.objects.filter(id=nid).first()
    user.fan.remove(current_user.id)
    current_user.follow_count-=1
    current_user.save()
    user.fans_count-=1
    user.save()
    return redirect("/blog_detail/%s.html/"%uid)

def all_blog(request):
    """返回本站全部已公开的博客文章"""
    current_user=get_current_user_object(request)
    blogs=models.Blog.objects.filter(is_open=True).all()
    return render(request,"all_blogs.html",{"user":current_user,"blogs":blogs})

def all_question(request):
    """返回本站全部提问"""
    current_user=get_current_user_object(request)
    questions=models.Question.objects.all()
    return render(request,"all_questions.html",{"user":current_user,"questions":questions})