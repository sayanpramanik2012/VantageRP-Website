/* DEVELOPED BY TELLARION vk.com/tellarion */

$(document).ready(function () {

    $(function() {
        var e = $(".menu-popup");
        $(".menu-triger, .menu-close").click(function() {
            return e.slideToggle(300, function() {
                e.is(":hidden") ? $("body").removeClass("body_pointer") : $("body").addClass("body_pointer")
            }), !1
        })
    });

    $('input').styler();

    var action_login = 0;

    var selected_server = 0;

    console.log('1');

    function auth_form() {
        
        $('.title-modal').html('Авторизация');
        $('.cont-modal').html(`

            <div class="cont-left">
                <div class="servers">
                    <div class="server" data-server="1">Portland</div> <div class="server" data-server="2">Seattle</div>
                </div>
            </div>
        
            <div class="cont-left">
                <input id="username" type="text" class="inp-info" required><label class="label-info" for="username">Логин</label>
            </div>

            <div class="cont-left">
                <label class="img-label" for=""><img src="img/help.svg" alt="" title="Введите ваш пароль"></label>
                <input id="password" type="password" class="inp-info" required><label class="label-info" for="password">Пароль</label>
                <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
            </div>
            
            <div class="sub-text_no-acc">
                
            </div>

            <div class="btn_action-acc flex-box">
                <a class="flex-box" href="" id="login">Войти</a>
            </div>

            <div class="sub-text_reset flex-box">
                <a class="flex-box" href="#" id="reset">Восстановить аккаунт</a>
            </div>

        `);

    }

    function reset_form() {
        
        $('.title-modal').html('Восстановление доступа');
        $('.cont-modal').html(`

            <div class="cont-left">
                <div class="servers">
                    <div class="server" data-server="1">Portland</div> <div class="server" data-server="2">Seattle</div>
                </div>
            </div>

            <div class="cont-left">
                <input id="username" type="text" class="inp-info" required><label class="label-info" for="username">Аккаунт</label>
            </div>

            <div class="cont-left">
                <input id="email" type="text" class="inp-info" required><label class="label-info" for="email">Почта</label>
            </div>
            
            <div class="sub-text_no-acc">
                
            </div>

            <div class="btn_action-acc flex-box">
                <a class="flex-box" href="" id="reset_btn">Восстановить</a>
            </div>

            <div class="sub-text_reset flex-box">
                <a class="flex-box" href="#" id="auth">Вернуться на авторизацию</a>
            </div>

        `);

    }

    function modal_handler($a1) {

        $('.btn-login').off();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        if($a1 == 0) {

            auth_form();

            $('.btn-login').on('click', function(event) {

                event.preventDefault;

                $(".modal").modal({
                    fadeDuration: 100
                });
        
                auth_form();
        
                modal_handler(1);
        
            });

        } else if($a1 == 1) {

            console.log('test1');

            $('#login').unbind('click');

            $(document).keypress(function(event) {
                var keycode = event.keyCode || event.which;
                if(keycode == '13') {
                    $('#login').click();
                }
            });

            $('.server').on('click', function(event) {
                event.preventDefault();
                for(let i = 0; i < $('.server').length; i++) {
                    console.log('test');
                    $(`.server:eq('${i}')`).removeClass('server-active');
                    $(`.server:eq('${i}')`).addClass('server');
                }
                selected_server = $(this).data("server");
                $(this).addClass('server-active');
            });

            $('#login').on('click', function(event) {
                event.preventDefault();

                grecaptcha.ready(function() {
                    grecaptcha.execute("6LciVOgUAAAAAL7FSLKAxRNLApxT4O8jNhJfS_FG").then(function(token) {
                        console.log("v3 Token: " + token);
                        $.ajax({
                            method: "POST",
                            url: "api_protected/auth",
                            dataType: 'json',
                            data: {
                                _token: $('meta[name="csrf-token"]').attr('content'), username: $('#username').val(), password: $('#password').val(), server: selected_server, recaptcha: token 
                            },
                            beforeSend: function() {
                                $('.sub-text_no-acc').html(`Идет передача данных...`);
                            },
                            success: function(data) {
                                console.log(data);
                                if(!data.success) {
                                    data = (data.error) ? JSON.stringify(data.error) : JSON.stringify(data);
                                    $('.sub-text_no-acc').html(data);
                                    console.log('test2');
                                    modal_handler(1);
                                } else {
                                    console.log('close');
                                    $.modal.close();
                                    $('.auth').html(data.callback.username);
                                    $('.auth').attr('href', 'https://gtavrp.ru/login');
                                    $('.btn-login').addClass('btn-login-profile');
                                    $('.btn-login-profile').removeClass('btn-login');
                                    $('.btn-login-profile').append('<div class="exit flex-box">Выйти</div>');
                                    $('.btn-login').off();
                                    modal_handler(2);
                                }
                            }
                        });
                    });
                });
            });

            $('#reset').on('click', function(event) {
                event.preventDefault();

                console.log('reset');

                reset_form();

                $('.server').on('click', function(event) {
                    event.preventDefault();
                    for(let i = 0; i < $('.server').length; i++) {
                        console.log('test');
                        $(`.server:eq('${i}')`).removeClass('server-active');
                        $(`.server:eq('${i}')`).addClass('server');
                    }
                    selected_server = $(this).data("server");
                    $(this).addClass('server-active');
                });

                grecaptcha.ready(function() {

                    grecaptcha.execute("6LciVOgUAAAAAL7FSLKAxRNLApxT4O8jNhJfS_FG").then(function(token) {
                        console.log("v3 Token: " + token);

                        $('#reset_btn').on('click', function(event) {
                            
                            event.preventDefault();
                            $.ajax({
                                type: 'POST',
                                url: '/api_share/reset_verif_email',
                                dataType: 'JSON',
                                data: {
                                    _token: $('meta[name="csrf-token"]').attr('content'), username: $('#username').val(), email: $('#email').val(), server: selected_server, recaptcha: token
                                },
                                beforeSend: function() {
                                    
                                },
                                success: function(data) {
                                    console.log(data);
                                    if(data.success) {
                    
                                        let settings_tpl = `
                                                    
                                            <div class="title-modal" style="margin-bottom: 20px;">Восстановление доступа</div>
                                            <div class="cont-modal">
                                                <p>На указанный E-Mail адрес выслано письмо для подтверждения</p>
                                            </div>
                                            
                                        `;
                    
                                        $('.modal-container-log').html(settings_tpl);
                    
                                    } else if(data.error) {
                                        let error_data = JSON.stringify(data.callback);
                                        let settings_tpl = `
                                                    
                                            <div class="title-modal" style="margin-bottom: 20px;">Восстановление доступа</div>
                                            <div class="cont-modal">
                                                <p>Во время отправки письма, возникла ошибка<br> <b>${data.error}</b></p>
                                            </div>
                                            
                                        `;
                    
                                        $('.modal-container-log').html(settings_tpl);

                                    }
                                }
                            });
                        });
                    });

                });

                $('#auth').on('click', function(event) {
                    modal_handler(0);
                    modal_handler(1);
                });

            });

        } else if($a1 == 2) {

            $('.exit').unbind('click');
            
            $('.exit').on('click', function(event) {
                event.preventDefault();
        
                $.ajax({
                    method: "POST",
                    url: "api_protected/exit",
                    dataType: 'json',
                    data: {
                        _token: $('meta[name="csrf-token"]').attr('content')
                    },
                    beforeSend: function() {
                        $(".modal").modal({
                            fadeDuration: 100
                        });
                        $('.sub-text_no-acc').html(`Выполняется выход...`);
                    },
                    success: function(data) {
                        console.log(data);
                        if(!data.success) {
                            data = JSON.stringify(data.error);
                            $('.sub-text_no-acc').html(data);
                            console.log('test1');
                            modal_handler(2);
                        } else {
                            console.log('close');
                            $.modal.close();
                            $('.auth').html('Войдите в аккаунт');
                            $('.auth').attr('href', '#');
                            $('.btn-login-profile').addClass('btn-login');
                            $('.btn-login').removeClass('btn-login-profile');
                            $('.exit').remove('');

                            $('meta[name="csrf-token"]').attr('content', data.callback.token);
                            $.ajaxSetup({
                                headers: {
                                     'X-CSRF-TOKEN': data.callback.token
                                }
                            });

                            modal_handler(0);
                        }
                    }
                });
        
            });

        }
    }

    if($('div').is('.exit')) {
        modal_handler(2);
    } else {
        modal_handler(0);
    }

    $(document).on($.modal.CLOSE, function() {
        let title = $('.title-modal').html();
        if(title == "Восстановление доступа" || title == "Авторизация") {
            modal_handler(0);
        }
    });

    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 30,
        loop: !1,
        loopFillGroupWithBlank: !1,
        speed: 1200,
        autoplay: {
            delay: 7e3,
            disableOnInteraction: !1
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: !0,
            dynamicBullets: !0,
            renderBullet: function(e, i) {
                return '<span class="' + i + ' swiper-pagination-bullet--svg-animation"><svg width="20" height="20" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="12" fill="none" stroke-width="3"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="12" stroke-width="3"></circle></svg></span>'
            }
        }
    });

    let get_location_disabled = window.location.href;
    console.log(get_location_disabled.indexOf('login'));
    if(get_location_disabled.indexOf('login') == -1) {
        $('.loader').fadeOut(1000);
    }

});