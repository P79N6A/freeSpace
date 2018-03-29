/**
 * Created by lenovo on 17-8-3.
 */
$(function () {

    if ($.cookie("username")) {
        $("#nologined").hide();
        $("#logined").show()
    }
    else {
        $("#nologined").show();
        $("#logined").hide()
    }

    //自定义的验证验证码的验证插件
    $.validator.addMethod('checkcode4', function (value, element) {
        var tel = /^[3456789abcdefghjkmnpqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ]{4}$/;
        return this.optional(element) || (tel.test(value));
    }, '请正确填写验证码');

    //正在加载中的对话框通过临时更改样式及内容可以得到成功后的对话框
    $('#loading').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        resizable: false,
        draggable: false,
        width: 180,
        height: 50
    }).parent().find('.ui-widget-header').hide();

    //出现错误的对话框
    $('#error').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        resizable: false,
        draggable: false,
        width: 180,
        height: 50
    }).parent().find('.ui-widget-header').hide();


    //邮箱自动补全
    $('#reg_email').autocomplete({
        delay: 0,
        autoFocus: true,
        source: function (request, response) {
            //获取用户输入的内容
            //alert(request.term);
            //绑定数据源的
            //response(['aa', 'aaaa', 'aaaaaa', 'bb']);

            var hosts = ['qq.com', '163.com', '126.com', '263.com', 'sina.com.cn', 'gmail.com', 'hotmail.com'],
                term = request.term,		//获取用户输入的内容
                name = term,				//邮箱的用户名
                host = '',					//邮箱的域名
                ix = term.indexOf('@'),		//@的位置
                result = [];				//最终呈现的邮箱列表


            result.push(term);

            //当有@的时候，重新分别用户名和域名
            if (ix > -1) {
                name = term.slice(0, ix);
                host = term.slice(ix + 1);
            }

            if (name) {
                //如果用户已经输入@和后面的域名，
                //那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
                //如果用户还没有输入@或后面的域名，
                //那么就把所有的域名都提示出来

                var findedHosts = (host ? $.grep(hosts, function (value, index) {
                        return value.indexOf(host) > -1
                    }) : hosts),
                    findedResult = $.map(findedHosts, function (value, index) {
                        return name + '@' + value;
                    });

                result = result.concat(findedResult);
            }

            response(result);
        }
    });

    //注册表单的提交
    $("#register_now").click(function () {
        $("#reg_form").submit()
    });

    //注册表单的验证
    $('#reg_form').validate({
        submitHandler: function (form) {
            $("#reg_form").ajaxSubmit({
                url: "/register.html/",
                type: "POST",
                beforeSubmit: function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $("#register,.modal-backdrop").hide()
                },
                success: function (responseText, statusText) {
                    if (responseText) {
                        $('#loading').css('background', 'url(/static/img/reg_succ.png) no-repeat 20px center').text('注册成功！');
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#reg_form').resetForm();
                            $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
                            $('#register span').html('*').removeClass('succ');
                        }, 1000);
                    }
                }


            });
        },


        rules: {
            nickname: {
                required: true, rangelength: [1, 12], remote: {
                    url: '/is_user.html/',
                    type: 'POST'
                }
            },
            password1: {required: true, minlength: 6},
            password2: {required: true, equalTo: "#pwd1"},
            email: {email: true, required: true},
            checkcode: {
                required: true, checkcode4: true, remote: {
                    url: '/is_check.html/',
                    type: 'POST'
                }
            }
        },
        messages: {
            nickname: {required: '昵称不得为空!', rangelength: jQuery.format('昵称必须在{0}-{1}位之间!'), remote: "昵称被占用！"},
            password1: {required: "密码不得为空！", minlength: jQuery.format("密码不得少于{0}位！")},
            password2: {required: "密码确认不能为空！", equalTo: "两次密码必须一致！"},
            email: {email: "请输入正确格式的电子邮件！", required: "邮箱不得为空！"},
            checkcode: {required: "验证码不得为空！", checkcode4: "请正确填写验证码！", remote: "验证码错误！"}
        },

        //验证不通过时调用的函数
        highlight: function (element, errorClass) {
            $(element).css('border', '1px solid red');
            $(element).parent().next().find("span").html('*').removeClass('succ');
        },
        //验证通过是调用的函数
        unhighlight: function (element, errorClass) {
            $(element).css('border', '');
            $(element).parent().next().find("span").html('&nbsp;').addClass('succ');
        }

    });

    //登录表单的提交
    $("#login_now").click(function () {
        $("#log_form").submit()
    });

    //登录表单的验证
    $('#log_form').validate({
        submitHandler: function (form) {
            $("#log_form").ajaxSubmit({
                url: "/login.html/",
                type: "POST",
                beforeSubmit: function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $("#login,.modal-backdrop").hide()
                },
                success: function (responseText, statusText) {
                    if (responseText) {
                        $('#loading').css('background', 'url(/static/img/reg_succ.png) no-repeat 20px center').text('登录成功！');

                        setTimeout(function () {
                            $.cookie('username', $('#log_nickname').val(), {expires: 14, path: "/"});
                            $('#loading').dialog('close');
                            $('#log_form').resetForm();
                            $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
                            $('#login span').html('*').removeClass('succ');
                            $("#logined").css('display', "");
                            $("#nologined").css("display", "none");
                            location.reload();
                        }, 1000);
                    }
                }


            });
        },


        rules: {
            nickname: {
                required: true, rangelength: [1, 12]
            },
            password: {
                required: true, minlength: 6, remote: {
                    url: '/login_check.html/',
                    type: 'POST',
                    dataType: "json",
                    data: {
                        nickname: function () {
                            return $('#log_nickname').val();
                        }
                    }
                }
            },
            checkcode: {
                required: true, checkcode4: true, remote: {
                    url: '/is_check.html/',
                    type: 'POST'
                }
            }
        },
        messages: {
            nickname: {required: '昵称不得为空!', rangelength: jQuery.format('昵称必须在{0}-{1}位之间!')},
            password: {required: "密码不得为空！", minlength: jQuery.format("密码不得少于{0}位！"), remote: "用户名或密码不正确！"},
            checkcode: {required: "验证码不得为空！", checkcode4: "请正确填写验证码！", remote: "验证码错误！"}
        },

        //验证不通过时调用的函数
        highlight: function (element, errorClass) {
            $(element).css('border', '1px solid red');
            $(element).parent().next().find("span").html('*').removeClass('succ');
        },
        //验证通过是调用的函数
        unhighlight: function (element, errorClass) {
            $(element).css('border', "");
            $(element).parent().next().find("span").html('&nbsp;').addClass('succ');
        },

        //错误放置位置
        errorLabelContainer: 'ol.log_error',
        //错误的外包装
        wrapper: 'li'
    });

    //点击图片更换验证码
    $("#img_check_log,#img_check_reg").click(function () {
        var src = $(this).attr("src");
        $(this).attr("src", src + "?")
    });

    //登出
    $('#logout').click(function () {
        $.removeCookie('username', {path: "/"});
        window.location.href = "/index.html/"
    });


    KindEditor.ready(function (K) {
        window.editor = K.create("#blog_content", {
            width: "870px",
            height: "100px",
            resizeType: "0",  //可取1,2,3.默认2，宽高可拖动；1只可变高度；0不可改变大小
            themeType: "simple",   //可取default，simple,qq.默认simple.设置simple时需要引入simple.css;qq同上
            useContextmenu: false,  //默认true，false时屏蔽右键菜单
            syncType: "form",     //默认为form，如果是syncType：“”时表单无法提交
            uploadJson: "/load-file/",      //指定文件上传访问的url
            //所有上传的文件都会由这个url所对应的视图函数处理

            allowPreviewEmoticons: true,  //true时鼠标放在表情上可以预览,默认true
            allowImageUpload: true,      //是否允许本地图片的上传，默认为true
            allowImageRemote: true,      //是否允许远程图片的上传，默认为true
            allowFlushUpload: false,       //是否允许Flush动画上传，默认为true
            allowMediaUpload: false,       //是否允许视音频上传，默认为true
            autoHeightMode: false,         //是否允许编辑框随内容自动加高，默认为false
            allowFileManager: true,          //是否允许空间管理
            fileManagerJson: "/file_manager_json/",           //空间管理所对应的url
            extraFileUploadParams: {          //在文件上传是还支持一些额外的参数，比如这里上传csrf的参数
                //以避免csrf攻击（因为这里的文件上传用的是iframe+form）
                csrfmiddlewaretoken: "{{ csrf_token }}"
            },
            filePostName: "myfile"      //这里指定上传的文件的名字（随意，只要保证与后端的名字一致），后端通过这个名字才能拿到上传的文件
        });
    });


    $("#submit_now").click(function () {
        window.editor.sync();
        $("#loading").dialog("open");
        $.ajax({
            url: "/add_blog.html/",
            type: 'POST',
            data: $('#writeblog_form').serialize(),
            success: function (response, stutas, xhr) {
                response2 = JSON.parse(response);
                if (response2["status"]) {
                    $("#write").modal("hide");
                    $('#loading').css('background', 'url(/static/img/reg_succ.png) no-repeat 20px center').text('发布成功！');
                    setTimeout(function () {
                        $('#loading').dialog('close');
                        $('#writeblog_form').resetForm();
                        $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
                        location.reload()
                    }, 1000);
                } else {
                    $("#title_err").text("");
                    $("#content_err").text("");
                    $("#tags_err").text("");
                    $('#loading').dialog('close');
                    $("#title_err").text(response2["title"]);
                    $("#content_err").text(response2["content"]);
                    $("#tags_err").text(response2["tags"]);

                }

            }
        });
    });


    $('#qu_content').summernote({
        height: 150,
        tabsize: 2,
        lang: 'zh-CN'
    });


     $("#qu_submit_now").click(function () {
        $("#loading").dialog("open");
        $.ajax({
            url: "/add_question.html/",
            type: 'POST',
            data: $('#question_form').serialize(),
            success: function (response, stutas, xhr) {
                response2 = JSON.parse(response);
                if (response2["status"]) {
                    $("#question").modal("hide");
                    $('#loading').css('background', 'url(/static/img/reg_succ.png) no-repeat 20px center').text('发布成功！');
                    setTimeout(function () {
                        $('#loading').dialog('close');
                        $('#question_form').resetForm();
                        $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
                        location.reload()
                    }, 1000);
                } else {
                    $("#qu_title_err").text("");
                    $("#qu_content_err").text("");
                    $("#qu_tags_err").text("");
                    $('#loading').dialog('close');
                    $("#qu_title_err").text(response2["title"]);
                    $("#qu_content_err").text(response2["content"]);
                    $("#qu_tags_err").text(response2["tags"]);

                }

            }
        });
    });






});