/**
 * Created by lenovo on 17-8-6.
 */
$(function () {

    if ($("#ffffff").val() === "True") {
        $("#male").attr("checked", "checked")
    }
    else {
        $("#female").attr("checked", "checked")
    }

   var flag=$("#flag").val();
   $("#tab"+flag).addClass("active").siblings().removeClass("active");




//初始化fileinput控件（第一次初始化）
    $('#file-Portrait').fileinput({
        language: 'zh', //设置语言
        uploadUrl: "/upload_avatar.html/", //上传的地址
        maxFileSize: 1000000000,
        allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
        showUpload: true, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        allowedFileTypes: ['image'],
        slugCallback: function (filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });


    $(".fileinput-upload-button").click(function () {

        $.post("/upload_avatar.html/", "fackinfo", function (json) {
            var data = $.parseJSON(json);
            if (data) {
                $("#avatar,.modal-backdrop").hide();
                location.reload()
            }
        })

    });


    $("#edit_now").click(function () {
        $("#edit_form").submit()
    });

    $('#edit_form').validate({
        submitHandler: function (form) {
            $("#edit_form").ajaxSubmit({
                beforeSubmit: function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $("#edit,.modal-backdrop").hide()
                },
                success: function (responseText, statusText) {
                    if (responseText) {
                        $('#loading').css('background', 'url(/static/img/reg_succ.png) no-repeat 20px center').text('提交成功！');
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#edit_form').resetForm();
                            $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
                            $('#edit span').html('*').removeClass('succ');
                            location.reload()
                        }, 500);
                    }
                }
            });


        },

        rules: {
            email: {email: true, required: true},
            address: {required: true, rangelength: [2, 30]},
            signature: {required: true, rangelength: [5, 100]}
        },

        messages: {
            email: {email: "请输入正确格式的电子邮件！", required: "邮箱不得为空！"},
            address: {required: "地址不能为空！", rangelength: jQuery.format('所在地必须在{0}-{1}个字符之间!')},
            signature: {required: "签名不能为空！", rangelength: jQuery.format('签名必须在{0}-{1}个字符之间!')}
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

});