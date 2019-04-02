import './index.css';
import $ from 'jquery';
import moment from 'moment';


$(function(){ 
　　function save(url,date){
        fetch('api/net/save?obj='+JSON.stringify({"url":encodeURIComponent(url),"date":date}))
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {
            console.log(data);
            if(data.data){
                $('.list-add').remove();
                getList();
            }else{
                alert("参数不能为空=。=");
            }
        });
    }; 
    $('.button-save').click(function(){
        save($('.url-input').val(),$('.date-input').val());
    });
    function getList(){
        fetch('api/net/getList')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then(data => {

            data.data.reverse().forEach((element,idx) => {
                var html='';
                html+='<li class="list-add" style="background:'+(element.isSend==1?'#ddd':'')+'">'
                html+='<div class="list-flex">'+(idx-0+1)+'</div>'
                html+='<div class="list-flex"><a target="_blank" href="'+ element.url +'">'+element.url+'</a></div>'
                html+='<div class="list-flex">'+moment(element.sendData).format('YYYY-MM-DD')+'</div>'
                html+='<div class="list-flex">'+ (element.isSend==1?'已发送':'未发送') +'</div>'
                html+='<div class="list-flex"><button type="button" onclick="delet('+element.id+',this)">删除</button></div>'
                html+='</li>'
                $('.list-box').append(html);
                $('.url-input').val('');
                $('.date-input').val('');
            });
        });
    }
    getList();
    console.log('提出合理的原因，有问题可以找我修复一下。----xb-csy');
}); 
window.delet=(id,dom)=>{
    var comMessmage=confirm('确定删除？');
        if(comMessmage){
            fetch('api/net/delete?id='+JSON.stringify(id))
            .then(response => {
                response.json();
            })
            .then(data => {
                $(dom).parents('.list-add').remove();
            }); 
        }else{
            return false;
        }
    
}
