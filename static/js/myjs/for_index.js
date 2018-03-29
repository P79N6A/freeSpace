// /**
//  * Created by  阿超 on 17-7-27.
//  */
// $(function () {
//
//     //更换用户状态切换，或重新加载时执行
//     $("#question_about").val("");
//     if($.cookie("username")){ $("#regandog").hide();$("#outandname").show();$("#membername").text($.cookie("username"))}
//     else {$("#regandog").show();$("#outandname").hide()}
//
//
//     //自定义的验证验证码的验证插件
//     $.validator.addMethod('checkcode4', function (value, element) {
//     var tel = /^[3456789abcdefghjkmnpqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ]{4}$/;
//     return this.optional(element) || (tel.test(value));
//     }, '请正确填写验证码');
//
//     //每一次刷新也清空一下表单
//      $('#register_form,#login_form').resetForm();
//
//     //正在加载中的对话框通过临时更改样式及内容可以得到成功后的对话框
//     $('#loading').dialog({
//         autoOpen: false,
//         modal: true,
//         closeOnEscape: false,
//         resizable: false,
//         draggable: false,
//         width: 180,
//         height: 50
//     }).parent().find('.ui-widget-header').hide();
//
//     //出现错误的对话框
//     $('#error').dialog({
//         autoOpen: false,
//         modal: true,
//         closeOnEscape: false,
//         resizable: false,
//         draggable: false,
//         width: 180,
//         height: 50
//     }).parent().find('.ui-widget-header').hide();
//
//     //提问的对话框
//     $("#addquestion").dialog({
//         title: "提问题",
//         autoOpen: false,
//         resizable: false,
//         modal: true,
//         width:735,
//         show: 'blind',
//         buttons: {
//             "发布": function () {
//                 $("#add_question").submit()
//             }, "取消": function () {
//                 $("#addquestion").dialog("close");
//             }
//         }});
//
//
//     //黑没完成
//     $('#add_question').validate({
//            submitHandler:function(form){
//             $(form).ajaxSubmit({
//                     //提交到的地址
//                     url:"/add_question.html/",
//                     //提交方式
//                     type:"POST",
//                     //除了表单的数据外，额外的数据
//                     //提交前的操作
//                 data:{
//                        "title":$("#question_title").val()
//                 },
//                     beforeSubmit : function (formData, jqForm, options) {
// 					$('#loading').dialog('open');
// 					//由于loading对话框有modal，此时用户无法操作，所以下面这一句也可以不需要
// 					//$('#register').dialog('widget').find('button').eq(1).button('disable').eq(2).button("disable");
// 				    },
//                     success:function (responseText, statusText) {
//                         if (responseText==="true") {
// 						//$('#register').dialog('widget').find('button').eq(1).button('enable');
// 						$('#loading').css('background','url(/static/img/reg_succ.png) no-repeat 20px center').text('添加数据成功...');
//
// 						  //清空表单里的数据，防止下次打开是里面还有数据
//                             //$.cookie('user', $('#user').val());  //设置cookie
//
//                                 setTimeout(function () {
//                                      $("#question_about").val("");
//                                     $("#question_title").val("");
//                                     $("#addquestion").dialog("close");
//                                     $('#loading').dialog('close').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//                                     $('#add_question').resetForm();//这里的清空表单要以form的id
//                                     // $("#success").dialog("open");
// 						}, 500);
// 					}
//                 }})},
//         rules: {
//             question_title: {required: true, rangelength: [1, 30]},
//             question_about: {required: true}
//         },
//
//         messages: {
//             question_title: {required: '问题标题不得为空!', rangelength: jQuery.format('问题标题必须在{0}-{1}位之间!')},
//             question_about:{required:"问题描述不得为空！"}
//         },
//
//         //验证不通过是调用的函数
//         highlight : function (element, errorClass) {
// 			$(element).css('border', '1px solid red');
// 		},
// 		//验证通过是调用的函数
// 		unhighlight : function (element, errorClass) {
// 			$(element).css('border', '1px solid green');
// 		},
//         //对话框的长度随错误条数而改变
//         showErrors : function (errorMap, errorList) {
// 			var errors = this.numberOfInvalids();
// 			if (errors > 0) {
// 				$('#register').dialog('option', 'height', errors * 20 + 450);
// 			} else {
// 				$('#register').dialog('option', 'height', 450);
// 			}
// 			this.defaultShowErrors();
// 		},
//         //错误放置位置
//         errorLabelContainer : 'ol.question_error',
//         //错误的外包装
// 		wrapper : 'li'
//     });
//
//     // //搜索按钮
//     // $("#search_go").button({
//     //     label: "查询",
//     //     icons: {primary: 'ui-icon-search'}
//     // });
//
//     //写博客按钮
//     // $("#write").button({
//     //     label: "写博客",
//     //     icons: {primary: 'ui-icon-write'}
//     // }).click(function () {
//     //     if($.cookie("username")){window.location.href="/write_blog.html/"}
//     //     else{
//     //         $('#loading').css('background','url(/static/img/error.png) no-repeat 20px center').text('请登录后操作！');
//     //         $("#loading").dialog("open");
//     //         setTimeout(function () {
//     //             $("#loading").dialog("close");
//     //              $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//     //              $("#login").dialog("open")
//     //         },1000)
//     //     }
//     //
//     // });
//
//     // //提问按钮
//     // $("#rasequestion").button({
//     //     label: "提问题",
//     //     icons: {primary: 'ui-icon-lightbulb'}
//     // }).click(function () {
//     //     if($.cookie("username")){
//     //         $("#addquestion").dialog("open")
//     //     }
//     //     else{
//     //         $('#loading').css('background','url(/static/img/error.png) no-repeat 20px center').text('请登录后操作！');
//     //         $("#loading").dialog("open");
//     //         setTimeout(function () {
//     //             $("#loading").dialog("close");
//     //              $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//     //              $("#login").dialog("open")
//     //         },1000)
//     //     }
//     // });
//   //提问按钮
//   //   $("#rasequestion").button({
//   //       label: "提问题",
//   //       icons: {primary: 'ui-icon-lightbulb'}
//   //   }).click(function () {
//   //       if($.cookie("username")){
//   //           $("#addquestion").dialog("open")
//   //       }
//   //       else{
//   //           $('#loading').css('background','url(/static/img/error.png) no-repeat 20px center').text('请登录后操作！');
//   //           $("#loading").dialog("open");
//   //           setTimeout(function () {
//   //               $("#loading").dialog("close");
//   //                $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//   //                $("#login").dialog("open")
//   //           },1000)
//   //       }
//   //   });
//
//     // //注册的对话框
//     // $("#register").dialog({
//     //     title: "用户注册",
//     //     autoOpen: false,
//     //     width: 300,
//     //     modal: true,
//     //     show: 'blind',
//     //     resizable: false,
//     //     buttons: {
//     //         "提交": function () {
//     //             $("#register_form").submit()
//     //         },
//     //         "取消": function () {
//     //             $("#register").dialog("close")
//     //         }
//     //     }
//     // });//.buttonset();//这里注释掉的是用于美化单选或多选按钮的
//
//     // //登录的对话框
//     // $("#login").dialog({
//     //     title: "用户登录",
//     //     autoOpen: false,
//     //     resizable: false,
//     //     modal: true,
//     //     show: 'blind',
//     //     buttons: {
//     //         "马上登录": function () {
//     //             $("#login_form").submit()
//     //         }, "取消": function () {
//     //             $("#login").dialog("close")
//     //         }
//     //     }
//     // });
//
//     // //给注册这一超链接绑定事件，打开注册对话框
//     // $("#reg_a").click(function () {
//     //     $("#register").dialog("open")
//     // });
//     //
//     // //给登录超链接绑定事件，打开登录对话框
//     // $("#log_a").click(function () {
//     //     $("#login").dialog("open")
//     // });
//
//     //点击更换验证码图片（通过给原src属性增加一个问号的方式，让img标签重新偷偷的加载一次验证码图片）
//     $("#img_check,#img_check2").click(function () {
//         var src = $(this).attr("src");
//         $(this).attr("src", src + "?")
//     });
//
//     //日历ui 暂时没用到
//     // $('#birthday').datepicker({
//     //     changeMonth: true,
//     //     changeYear: true,
//     //     yearSuffix: '',
//     //     maxDate: 0,
//     //     yearRange: '1950:2030'
//     // });
//
//     //邮箱自动补全
//     $('#email').autocomplete({
//         delay: 0,
//         autoFocus: true,
//         source: function (request, response) {
//             //获取用户输入的内容
//             //alert(request.term);
//             //绑定数据源的
//             //response(['aa', 'aaaa', 'aaaaaa', 'bb']);
//
//             var hosts = ['qq.com', '163.com', '126.com', '263.com', 'sina.com.cn', 'gmail.com', 'hotmail.com'],
//                 term = request.term,		//获取用户输入的内容
//                 name = term,				//邮箱的用户名
//                 host = '',					//邮箱的域名
//                 ix = term.indexOf('@'),		//@的位置
//                 result = [];				//最终呈现的邮箱列表
//
//
//             result.push(term);
//
//             //当有@的时候，重新分别用户名和域名
//             if (ix > -1) {
//                 name = term.slice(0, ix);
//                 host = term.slice(ix + 1);
//             }
//
//             if (name) {
//                 //如果用户已经输入@和后面的域名，
//                 //那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
//                 //如果用户还没有输入@或后面的域名，
//                 //那么就把所有的域名都提示出来
//
//                 var findedHosts = (host ? $.grep(hosts, function (value, index) {
//                         return value.indexOf(host) > -1
//                     }) : hosts),
//                     findedResult = $.map(findedHosts, function (value, index) {
//                         return name + '@' + value;
//                     });
//
//                 result = result.concat(findedResult);
//             }
//
//             response(result);
//         }
//     });
//
//     //注册表单验证以及提交，错误集中显示
//     $('#register_form').validate({
//            submitHandler:function(form){
//             $(form).ajaxSubmit({
//                     //提交到的地址
//                     url:"/register.html/",
//                     //提交方式
//                     type:"POST",
//                     //除了表单的数据外，额外的数据
//                     //提交前的操作
//                     beforeSubmit : function (formData, jqForm, options) {
// 					$('#loading').dialog('open');
// 					//由于loading对话框有modal，此时用户无法操作，所以下面这一句也可以不需要
// 					//$('#register').dialog('widget').find('button').eq(1).button('disable').eq(2).button("disable");
// 				    },
//                     success:function (responseText, statusText) {
//                         if (responseText) {
// 						//$('#register').dialog('widget').find('button').eq(1).button('enable');
// 						$('#loading').css('background','url(/static/img/reg_succ.png) no-repeat 20px center').text('数据新增成功...');
// 						  //清空表单里的数据，防止下次打开是里面还有数据
//                             //$.cookie('user', $('#user').val());  //设置cookie
//                                 setTimeout(function () {
//                                      $('#loading').dialog('close');
//                                      $('#register_form').resetForm();//这里的清空表单要以form的id
//                                     $('#register').dialog('close');
//                                     $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//                                     $('#register .star').html('*').removeClass('succ');
//
//                                     // $("#success").dialog("open");
// 						}, 500);
// 					}
//                     }
//                 })},
//         rules: {
//             nickname: {
//                 required: true, rangelength: [1, 12], remote: {
//                     url: '/is_user.html/',
//                     type: 'POST'
//                 }
//             },
//             password1: {required: true, minlength: 6},
//             password2: {required:true,equalTo: "#pwd1"},
//             email: {email: true, required: true},
//             checkcode: {
//                 required: true,checkcode4:true, remote: {
//                     url: '/is_check.html/',
//                     type: 'POST'
//                 }
//             }
//         },
//         messages: {
//             nickname: {required: '昵称不得为空!', rangelength: jQuery.format('昵称必须在{0}-{1}位之间!'), remote: "昵称被占用！"},
//             password1: {required: "密码不得为空！", minlength: jQuery.format("密码不得少于{0}位！")},
//             password2: {required:"密码确认不能为空！",equalTo: "两次密码必须一致！"},
//             email: {email: "请输入正确格式的电子邮件！", required: "邮箱不得为空！"},
//             checkcode: {required: "验证码不得为空！", checkcode4:"请正确填写验证码！",remote: "验证码错误！"}
//         },
//
//         //验证不通过是调用的函数
//         highlight : function (element, errorClass) {
// 			$(element).css('border', '1px solid red');
// 			$(element).parent().find('span').html('*').removeClass('succ');
// 		},
// 		//验证通过是调用的函数
// 		unhighlight : function (element, errorClass) {
// 			$(element).css('border', '1px solid green');
// 			$(element).parent().find('span').html('&nbsp;').addClass('succ');
// 		},
//         //对话框的长度随错误条数而改变
//         // showErrors : function (errorMap, errorList) {
// 			// var errors = this.numberOfInvalids();
// 			// if (errors > 0) {
// 			// 	$('#register').dialog('option', 'height', errors * 20 + 425);
// 			// } else {
// 			// 	$('#register').dialog('option', 'height', 425);
// 			// }
// 			// this.defaultShowErrors();
//         // },
//         //错误放置位置
//         errorLabelContainer : 'ol.reg_error',
//         //错误的外包装
// 		wrapper : 'li'
//
//
//     });
//
//     //登录表单验证以及提交，错误集中显示
//      $('#login_form').validate({
//            submitHandler:function(form){
//             $(form).ajaxSubmit({
//                     //提交到的地址
//                     url:"/login.html/",
//                     //提交方式
//                     type:"POST",
//                     //除了表单的数据外，额外的数据
//                     //提交前的操作
//                     beforeSubmit : function (formData, jqForm, options) {
// 					$('#loading').dialog('open');
// 					//由于loading对话框有modal，此时用户无法操作，所以下面这一句也可以不需要
// 					//$('#register').dialog('widget').find('button').eq(1).button('disable').eq(2).button("disable");
// 				    },
//                     success:function (responseText, statusText) {
//                         if (responseText==="true") {
// 						//$('#register').dialog('widget').find('button').eq(1).button('enable');
// 						$('#loading').css('background','url(/static/img/reg_succ.png) no-repeat 20px center').text('登录成功...');
//                          if ($('#expires').is(':checked')) {
// 							$.cookie('username', $('#nickname_l').val(), {
// 								expires : 14 ,//cookie的过期时间
//                                 path:"/"
// 							});
// 						} else {
// 							$.cookie('username', $('#nickname_l').val(),{path:"/"});
//
// 						}
// 						  //清空表单里的数据，防止下次打开是里面还有数据
//                             //$.cookie('user', $('#user').val());  //设置cookie
//
//                                 setTimeout(function () {
//                                     $("#membername").text($.cookie("username"));
//                                     $("#regandog").hide();$("#outandname").show();
//                                      $('#loading').dialog('close');
//                                      $('#login_form').resetForm();//这里的清空表单要以form的id
//                                     $('#login').dialog('close');
//                                     $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//                                     $('#login .star').html('*').removeClass('succ');
//
//                                     // $("#success").dialog("open");
// 						}, 500);
// 					}
// 					else if(responseText==="false")
//
//                         {$('#loading').css('background','url(/static/img/error.png) no-repeat 20px center').text('用户名或密码错误...');
//                         setTimeout(function () {
//                                      $('#loading').dialog('close');
//                                     $('#loading').css('background', 'url(/static/img/loading.gif) no-repeat 20px center').text('数据交互中...');
//                                     $('#login .star').html('*').removeClass('succ');
//                        },1000)
//                     }
//                 }})},
//         rules: {
//             nickname_log: {required: true, rangelength: [1, 12]},
//             checkcode:{required:true,checkcode4:true,remote:{
//                url: '/is_check.html/',
//                     type: 'POST'
//             }},
//             password: {required: true, minlength: 6}},
//
//         messages: {
//             nickname_log: {required: '昵称不得为空!', rangelength: jQuery.format('昵称必须在{0}-{1}位之间!')},
//             checkcode:{required:"验证码不得为空！",checkcode4:"请输入正确的验证码！",remote:"验证码错误！"},
//             password: {required: "密码不得为空！", minlength: jQuery.format("密码不得少于{0}位！")}
//         },
//
//         //验证不通过是调用的函数
//         highlight : function (element, errorClass) {
// 			$(element).css('border', '1px solid red');
// 			$(element).parent().find('span').html('*').removeClass('succ');
// 		},
// 		//验证通过是调用的函数
// 		unhighlight : function (element, errorClass) {
// 			$(element).css('border', '1px solid green');
// 			$(element).parent().find('span').html('&nbsp;').addClass('succ');
// 		},
//         //对话框的长度随错误条数而改变
//         // showErrors : function (errorMap, errorList) {
// 			// var errors = this.numberOfInvalids();
// 			// if (errors > 0) {
// 			// 	$('#register').dialog('option', 'height', errors * 20 + 450);
// 			// } else {
// 			// 	$('#register').dialog('option', 'height', 450);
// 			// }
// 			// this.defaultShowErrors();
//         // },
//         //错误放置位置
//         errorLabelContainer : 'ol.log_error',
//         //错误的外包装
// 		wrapper : 'li'
//
//
//     });
//
//      //登出
//     $('#logout').click(function () {
//     $.removeCookie('username',{path:"/"});
//     $("#regandog").hide();$("#outandname").show();
//     });
//
//
//   //   $('#question_about').summernote({
//   //       height: 100,
//   //       width:700,
//   //       tabsize: 0,
//   //       lang: 'zh-CN',
//   //       toolbar: [
//   //   // [groupName, [list of button]]
//   //   ['style', ['bold', 'italic', 'underline', 'clear']],
//   //   ['font', ['strikethrough', 'superscript', 'subscript']],
//   //   ['fontsize', ['fontsize']],
//   //   ['color', ['color']],
//   //   ['para', ['ul', 'ol', 'paragraph']],
//   //   ['height', ['height']],
//   //   ['view', ['fullscreen']]
//   // ]
//   //
//   //       //  toolbar: [
//   //       // ['style', ['style']],
//   //       // ['font', ['bold', 'underline', 'clear']],
//   //       // ['fontname', ['fontname']],
//   //       // ['color', ['color']],
//   //       // ['para', ['ul', 'ol', 'paragraph']],
//   //       // ['table', ['table']],
//   //       // ['insert', ['link', 'picture', 'video']],
//   //       // ['view', ['fullscreen', 'codeview', 'help']]
//   //
//   //   });
//   //
//   //
//   //
//   //
//   //   //右侧折叠菜单
//   //   $('#accordion').accordion();
//   //
//   //   //tab页面
//   //   $('#tabs').tabs();
//
//
// });