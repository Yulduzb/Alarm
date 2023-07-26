const currentTime=document.querySelector("h1"),
selectMenu=document.querySelectorAll("select"),
content=document.querySelector(".content"),
setAlarmBtn=document.querySelector("button");


let alarmTime, isAlarmSet=false,
ringtone = new Audio("Alarm.mp3");

for(let i=12; i>0;i--)
{
   i=i<10?"0"+i:i;
   let option= `<option value="${i}">${i}</option>`;
   selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59; i>=0;i--)
{
   i=i<10?"0"+i:i;
   let option= `<option value="${i}">${i}</option>`;
   selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2; i>0;i--)
{
   let ampm = i == 1 ? "AM":"PM";
   
   let option= `<option value="${ampm}">${ampm}</option>`;
   selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(()=>{
    //saat,dakika,saniya alir
    let date=new Date(),
    hour=date.getHours(),
    minute=date.getMinutes(),
    second=date.getSeconds(),
    ampm="AM";

    if(hour>=12){
        hour=hour-12;
        ampm="PM";
    }

    //eğer saatin değeri 0 isa 12 e ayarla
    hour= hour == 0 ? hour=12:hour;

    //Bu satırda, saat,dakika, saniya değerini (hour) biçimlendirmek için ternary operatörü 
    //kullanılıyor. Eğer saat 10'dan küçükse, saatin başına "0" eklenir, aksi takdirde saat değeri olduğu gibi kalır. 
    hour=hour<10 ? "0" +hour:hour;
    minute=minute<10 ? "0" +minute:minute;
    second=second<10 ? "0"+ second:second;

    currentTime.innerText=`${hour}:${minute}:${second} ${ampm}`;
   
    
    if (alarmTime === `${hour}:${minute} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
   
    }



},1000);

function setAlarm() {
    if(isAlarmSet) {                //eğer alarm set true isa
        alarmTime="";               // alarmtime nın içine bos birak
        ringtone.pause();               // mp3 durdur
        content.classList.remove("disable");    // content yanındeki disable kaldir
        setAlarmBtn.innerText="Alarmı Kur";
        return isAlarmSet=false;           // isAlarmSet false dondur
    }



    //burda alarm saat dakika ve AM/PM değerini aldik
    let time=`${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    
    if(time.includes("Saat")|| time.includes("Dakika")|| time.includes("AM/PM"))
    {
        return alert("Lutfen,  alarm değerini girin");
    }

    isAlarmSet=true;
    alarmTime=time;
    content.classList.add("disable");
    setAlarmBtn.innerText="Alarmı Kapat";
    
}



setAlarmBtn.addEventListener("click",setAlarm);