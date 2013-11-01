var interval = null
var period = 10000
var status = '未开启'
var ids = []

var checkSelect = function(data){
    var $lessions = $('<div/>').append(data)
    $.each($lessions.find('a.seeinfo'), function(i, a){
        var $a = $(a)

        var $font = $a.siblings('font')
        if($font.attr('color') == 'red'){
            return
        }

        var id = $a.attr('for')
        if(ids.indexOf(id) >= 0) return

        $.ajax({
            url: 'http://qinggongxiao.nju.edu.cn/show_article.php',
            type: 'post',
            data: {id: id},
            success: function(data){
                var $lession = $('<div/>').append(data)
                var lid = $lession.find('input.select_this_lesson').attr('lid')
                $.ajax({
                    url: 'http://qinggongxiao.nju.edu.cn/select_lesson_action.php',
                    type: 'post',
                    data: {lid: lid},
                    success: function(data){
                        if(data == '您已成功选修！请勿重复点选。'){
                            ids.push(id)
                            return
                        }
                        var message = '[' + data + ']' + $font.text() + $a.text() 
                        webkitNotifications.createNotification('logo.png', '选中一门课！', message).show()
                        console.log(message)
                    }
                })
            }
        })
    })
}

var xuanxiu = function(){
    $.ajax({
        url: 'http://qinggongxiao.nju.edu.cn/xuanxiu_do.php',
        type: 'post',
        data: {type:'选修课'},
        success: checkSelect
    })
}

var tiyan = function(){
    $.ajax({
        url: 'http://qinggongxiao.nju.edu.cn/tiyan_do.php',
        type: 'post',
        data: {type:'体验课'},
        success: checkSelect
    })
}

var checkSelectAll = function(){
    xuanxiu()
    tiyan()
}

var startCheck = function(){
    if(interval) return
    checkSelectAll()
    interval = setInterval(checkSelectAll, period)
    status = '努力选课中。。。'
}

var stopCheck = function(){
    if(!interval) return
    clearInterval(interval)
    interval = null
    status = '未开启'
}

var isChecking = function(){
    return !!interval
}

var getStatus = function(){
    return status
}
