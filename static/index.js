import './index.css';
import $ from 'jquery';


$(function(){ 
　　function save(url,date){
        fetch('api/net/save?obj='+JSON.stringify({"url":url,"date":date}))
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
                html+='<div class="list-flex">'+element.sendData+'</div>'
                html+='<div class="list-flex"><button type="button" onclick="delet('+element.id+',this)">删除</button></div>'
                html+='</li>'
                $('.list-box').append(html);
                $('.url-input').val('');
                $('.date-input').val('');
            });
        });
    }
    getList();
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
