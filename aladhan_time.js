
let city = 'Benghazi';
let country ='LY' ;
let salah_data;

const url = `https://api.aladhan.com/v1/timingsByAddress?address=${city},${country}&method=5`
//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const proxyUrl = 'https://api.allorigins.win/get?url=';


document.addEventListener('DOMContentLoaded',()=>{
    getAdhanTime();

    document.addEventListener('click',(e)=>{
	if(e.target && e.target.classList.contains('adhan')){
	    calcRemainTime(e.target);
	}
    });
});
  



function getAdhanTime(){

    fetch(proxyUrl + url,{
	method:'GET',
	headers:{
	    'Content-Type':'application/javascript',
	    
	},
	
    })
	.then(response =>{
	    return response.json();
	})
	.then(data =>{
	    console.log("data =>",data);
	    const json_data =JSON.parse(data.contents)
	    console.log('data',json_data.data.date.hijri.date);

	    let date = json_data.data.date.readable;
	    let dateHijri = json_data.data.date.hijri.date;
	    
	    document.querySelector('.west-date').innerHTML += `${date}`;
	    document.querySelector('.hijri-date').innerHTML += `${dateHijri}`;
	    
	    let newItem;
	    let list = document.getElementById('adhan-list');
	    const salah = json_data.data.timings;
	    Object.keys(salah).forEach((adhan)=>{
		newItem = `

    <li class="list-group-item d-flex justify-content-between align-items-center adhan">
      ${adhan}
      <span class="badge bg-primary rounded-pill ">${salah[adhan]}</span>
    </li>
    `;
		

		list.insertAdjacentHTML('beforeend',newItem);
		console.log(salah[adhan]);
	    });
	    
	})
	.catch(error =>{
	    console.log('eror',error);
	})
}


function calcRemainTime(item){


    let salahTime = item.querySelector('span').textContent;
    let nowDate = new Date;
    let diffHours = Math.abs(Number(salahTime.slice(0,2)) - nowDate.getHours());
    let diffMinutes = Math.abs(Number(salahTime.slice(3))-nowDate.getMinutes());
    let second = nowDate.getSeconds();
    let remianingTime = `${diffHours} H , ${diffMinutes} M , ${second} S`;

    document.querySelector('.remain-time').innerHTML = remianingTime
    console.log(remianingTime);
    console.log(nowDate.getHours(),nowDate.getMinutes());
    
}
