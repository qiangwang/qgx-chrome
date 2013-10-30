var BGPage = chrome.extension.getBackgroundPage();

var $start = $('#start')
var $stop = $('#stop')
var $status = $('#status')

$start.click(function(){
    BGPage.startCheck()
    $start.hide()
    $stop.show()
    $status.html(BGPage.getStatus())
})

$stop.click(function(){
    BGPage.stopCheck()
    $stop.hide()
    $start.show()
    $status.html(BGPage.getStatus())
})


if(BGPage.isChecking()){
    $start.hide()
}else{
    $stop.hide()
}

$status.html(BGPage.getStatus())
setInterval(function(){
    $status.html(BGPage.getStatus())
}, BGPage.period)
