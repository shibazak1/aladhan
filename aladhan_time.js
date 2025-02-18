
let city = 'Benghazi';
let country ='LY' ;
let salah_data;
let date,dateHijri;
let moaqeatHtml;

const url = `https://api.aladhan.com/v1/timingsByAddress?address=${city},${country}&method=5`
//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const proxyUrl = 'https://api.allorigins.win/get?url=';


document.addEventListener('DOMContentLoaded',()=>{
    getAdhanTime();

    document.addEventListener('click',(e)=>{
	if(e.target && e.target.classList.contains('adhan')){
	    calcRemainTime(e.target);
	}
	else if(e.target && e.target.classList.contains('date-btn')){
	    addDate();
	}
	else if(e.target && e.target.classList.contains('to-do-btn')){
	    displayToDoPrayList();
	}
	else if(e.target && e.target.classList.contains('moaqeat')){
	    displayMoaqeat();
	}
    });
});


function displayMoaqeat(){
    const pageContent = document.querySelector('.page-content');
    pageContent.innerHTML = '';

    pageContent.appendChild(moaqeatHtml);
    
   // console.log("moaqeathtml",moaqeatHtml);
}

function displayToDoPrayList(){
    document.querySelector('.page-content').innerHTML = `

<ul class="list-group">
  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox">
    <label class="form-check-label" for="firstCheckbox">Fajer</label>
  </li>
  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="" id="secondCheckbox">
    <label class="form-check-label" for="secondCheckbox">Doher</label>
  </li>

  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="" id="thirdCheckbox">
    <label class="form-check-label" for="thirdCheckbox">Aser</label>
  </li>

  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="" id="thirdCheckbox">
    <label class="form-check-label" for="thirdCheckbox">Marghreb</label>
  </li>

  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="" id="thirdCheckbox">
    <label class="form-check-label" for="thirdCheckbox">Isha</label>
  </li>

</ul>
`;
}



function addDate(){

    
    document.querySelector('.date-data').innerHTML = `<div class=" date container"><span class="fw-bold me-3">Gregorian: ${date}</span>
                                                       
                                                      <span class="fw-bold "> Hijri: ${dateHijri}</span></div>`;
	    
}


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

	    date = json_data.data.date.readable;
	    dateHijri = json_data.data.date.hijri.date;
	    
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

	    moaqeatHtml = document.querySelector('.moageat-page');
	    
	})
	.catch(error =>{
	    console.log('eror',error);
	})
}



function calcRemainTime(item) {
    // Get the salah time from the item
    let salahTime = item.querySelector('span').textContent;

    // Get the current time
    let nowDate = new Date();

    // Extract hours and minutes from salah time
    let salahTimeHours = Number(salahTime.slice(0, 2));
    let salahTimeMinutes = Number(salahTime.slice(3));

    // Get current hours and minutes
    let hourNow = nowDate.getHours();
    let minuteNow = nowDate.getMinutes();

    // Convert both times to total minutes
    let salahTimeInMinutes = salahTimeHours * 60 + salahTimeMinutes;
    let nowTimeInMinutes = hourNow * 60 + minuteNow;

    // Handle the case where salah time is on the next day
    if (salahTimeInMinutes < nowTimeInMinutes) {
        salahTimeInMinutes += 24 * 60; // Add 24 hours in minutes
    }

    // Calculate the absolute difference in minutes
    let diffInMinutes = Math.abs(salahTimeInMinutes - nowTimeInMinutes);

    // Convert the difference back to hours and minutes
    let diffHours = Math.floor(diffInMinutes / 60);
    let diffMinutes = diffInMinutes % 60;

    // Display the remaining time
    let leftOrRightTime = `${diffHours} H , ${diffMinutes} M`;
    document.querySelector('.remain-time').innerHTML = leftOrRightTime;

    // Log the current time for debugging
    console.log(`Current Time: ${hourNow}:${minuteNow}`);
    console.log(`Remaining Time: ${leftOrRightTime}`);
}

