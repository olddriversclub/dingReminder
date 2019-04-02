import './index.css';
import $ from 'jquery';
import moment from 'moment';


$(function(){ 
　　function save(url,date){
        debugger;
        fetch('api/net/save?obj='+JSON.stringify({"url":encodeURIComponent(url),"date":date}))
        .then(response => {
           response.json();
        })
        .then(data => {
            $('.list-add').remove();
            getList();
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
            data.data.forEach((element,idx) => {
                var html='';
                html+='<li class="list-add">'
                html+='<div class="list-flex">'+(idx-0+1)+'</div>'
                html+='<div class="list-flex">'+element.url+'</div>'
                html+='<div class="list-flex">'+moment(element.sendData).format('YYYY-MM-DD')+'</div>'
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
    fetch('api/net/delete?id='+JSON.stringify(id))
    .then(response => {
        response.json();
    })
    .then(data => {
        $(dom).parents('.list-add').remove();
    });
}
