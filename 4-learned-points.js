let arr1=[];
let arr2=[];
let arr=[];
let arr3=[];
let arr4=[];
let arr5=[];
let arr6=[];
let arr7=[];
let arr8=[];
let arr9=[];
let arr10=[];
let arr11=[];
let arr12=[];
let arr13=[];
let arr14=[];
let word='' ;
let index;


setInterval(()=>{
  readMode()
},1000);
// WRITE VARIABLES
document.querySelector('.js-jog-axis-pressed').addEventListener('click',()=> {
    write('JOG.Command.Mode',0);
  });
  
  document.querySelector('.js-jog-base-pressed').addEventListener('click',()=> {
    write('JOG.Command.Mode',1);
  
  });

  //HEADER
  
document.querySelector('.js-emergency-stop').addEventListener('click',()=>{
  write('POWER_ROBOT.Command.Power_OFF',1);
  write('POWER_ROBOT.Command.Power_ON',0);
  write('POWER_ROBOT.Command.Abort',1);
});
document.querySelector('.js-reduce').addEventListener('click',()=>{
  write('CONFIGURATION.Status.Mode_NichtReduziert',0);
  write('CONFIGURATION.Status.Mode_Reduziert',1);
  write('SINGLE_MOVEMENT.Status.ReduzierterOverride',10);
  readReduceOnOff();
});
document.querySelector('.js-notReduce').addEventListener('click',()=>{
  write('CONFIGURATION.Status.Mode_Reduziert',0);
  write('CONFIGURATION.Status.Mode_NichtReduziert',1);
  write('SINGLE_MOVEMENT.Status.ReduzierterOverride',100);
  readReduceOnOff();
});

document.querySelector('.js-set0').addEventListener('click',()=>{
  write('POWER_ROBOT.Command.Override',0);
  readReduceOnOff();
});

document.querySelector('.js-setMax').addEventListener('click',()=>{
  write('POWER_ROBOT.Command.Override',100);
  readReduceOnOff();
});

document.querySelector('.js-min10').addEventListener('click',()=>{
  readReduceOnOff();
  write('POWER_ROBOT.Command.Override',(Number(arr2[2])-10));
  readReduceOnOff();
});

document.querySelector('.js-min1').addEventListener('click',()=>{
  readReduceOnOff();
  write('POWER_ROBOT.Command.Override',(Number(arr2[2])-1));
  readReduceOnOff();
});

document.querySelector('.js-add1').addEventListener('click',()=>{
  readReduceOnOff();
  write('POWER_ROBOT.Command.Override',(Number(arr2[2])+1));
  readReduceOnOff();
});

document.querySelector('.js-add10').addEventListener('click',()=>{
  readReduceOnOff();
  write('POWER_ROBOT.Command.Override',(Number(arr2[2])+10));
  readReduceOnOff();
});


document.querySelector('.js-input').addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
    write('JOG.Command.TouchUp_Index',document.querySelector('.js-input').value);
    readReduceOnOff();
  }
});

document.querySelector(`.js-input`).addEventListener('click',()=>{
  document.querySelector(`.js-input`).placeholder='';
  document.querySelector(`.js-input`).value='';
 }) ;
 
  
  for(let i=1;i<13;i++){
    document.querySelector(`.js-input-${i}`).addEventListener('keydown',(event)=>{
      if(event.key==='Enter'){
      write(`JOG.TeachedPositions[${i}].Point_Name`,document.querySelector(`.js-input-${i}`).value);
      console.log(document.querySelector(`.js-input-${i}`).value);
      updateOne(i);
      }
    })
    
  }

  document.querySelector('.js-delete-pos').addEventListener('click',()=>{
    write('JOG.TeachedPosition_Command.Position_Löschen',1);
    write('JOG.TeachedPosition_Command.Position_Löschen',0);
    readReduceOnOff()
    updateOne(index);
  });

  document.querySelector('.js-reset-list').addEventListener('click',()=>{
    write('JOG.TeachedPosition_Command.Reset_All',1);
    write('JOG.TeachedPosition_Command.Reset_All',0);
    updateAll();
  });

  document.querySelector('.js-save-pos').addEventListener('click',()=>{
    write('JOG.Command.TouchUp_execute',1);
    write('JOG.Command.TouchUp_execute',0);
    readReduceOnOff();
    updateOne(index);
    });


  readMode();
  updateAll();
  readReduceOnOff();
  console.log(readReduceOnOff());



  // READ VARIABLES
  //function readAllPoints(){


  function readMode(){
    $(document).ready(function(){
      $.ajaxSetup({ cache: false });
     // setInterval(function() {
        $.get(`var-1.htm`, function(result){
          let word1 = ((result.trim()));


            let variab='';
            let neword='';
            arr1=[]; 
      
              for (let i = 0; i < word1.length; i++) {
                if((word1[i]) === "\r" )
                {
                  i++;
                  neword +=' ';
                }
                else 
                  neword += word1[i]; 
              }
      
            for (var i = 0; i < neword.length; i++) {
              if(neword[i] === ' '){
                arr1.push(variab);
                variab='';
              }
                else variab += neword[i];
            }
            arr1.push(variab);
               
       
            
              if (Number(arr1[3]) === 1){
                document.querySelector('.js-ext').classList.add('ModeON');
              }
              else 
                document.querySelector('.js-ext').classList.remove('ModeON');
            
              if (Number(arr1[0]) === 1){
                document.querySelector('.js-T1').classList.add('ModeON');
                }
              else 
              document.querySelector('.js-T1').classList.remove('ModeON'); 
            
              if (Number(arr1[1]) === 1){
                document.querySelector('.js-T2').classList.add('ModeON');
              }
              else 
              document.querySelector('.js-T2').classList.remove('ModeON');
              
              if (Number(arr1[2]) === 1){
                document.querySelector('.js-aut').classList.add('ModeON');
              }
              else 
              document.querySelector('.js-aut').classList.remove('ModeON');

              if (Number(arr1[4]) === 1){
                document.querySelector('.js-robotON').classList.add('robotON-01');
                document.querySelector('.js-robotFF').classList.remove('robotOFF-01');
              }
              else {
              document.querySelector('.js-robotFF').classList.add('robotOFF-01');
              document.querySelector('.js-robotON').classList.remove('robotON-01');
           
              }

        });

      });
    }

          // READ Reduce & OnOff Robot
      function readReduceOnOff(){
        
      $(document).ready(function(){
          $.get(`var-2.htm`, function(result){
            word = ((result.trim()));
            let variab='';
            let neword='';
            arr2=[]; 
  
          for (let i = 0; i < word.length; i++) {
            if((word[i]) === "\r" )
            {
              i++;
              neword +=' ';
            }
            else 
              neword += word[i]; 
          }
        for (var i = 0; i < neword.length; i++) {
          if(neword[i] === ' '){
            arr2.push(variab);
            variab='';
          }
            else variab += neword[i];
        }
        arr2.push(variab);


   if (Number(arr2[0]) === 1){
          document.querySelector('.js-reduce').classList.add('button-on');
        }
        else 
        document.querySelector('.js-reduce').classList.remove('button-on');

        document.querySelector('.js-override-info').innerHTML= `Override  ${arr2[2]}%`;

       
        if (Number(arr2[1]) === 1){
          document.querySelector('.js-notReduce').classList.add('button-on');
        }
        else 
        document.querySelector('.js-notReduce').classList.remove('button-on');
        document.querySelector('.js-input').placeholder=arr2[3];
        index = Number(arr2[3]);
      });
    });
  }


        function read1(){
        $(document).ready(function(){
          $.get(`4-point-1.htm`, function(result){
            word = ((result.trim()));
            arr3=[];
            let variab='';
            let neword='';

  
          for (let i = 0; i < word.length; i++) {
            if((word[i]) === "\r" )
            {
              i++;
              neword +=' ';
            }
            else 
              neword += word[i]; 
          }
  
        for (var i = 0; i < neword.length; i++) {
          if(neword[i] === ' '){
            arr3.push(variab);
            variab='';
          }
            else variab += neword[i];
        }
        arr3.push(variab);
       //arr3=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
        let strg;
       
      for (let y = 0; y < 9 ; y++) {
       
        strg=arr3[y];
        if(y===0){
          strg= strg.replace('&#x27;','');
          strg= strg.replace('&#x27;','');
          arr3[y]=strg;
        }
        else if(strg[strg.length-9]==='e')
        {   
          arr3[y]=0.00;
          if (y<4) {
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y])).toFixed(2)} mm`;

          }
          else if(y<7)
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y])).toFixed(2)} &deg;`;

        }
        else if (strg[0]==='&') {
          strg= strg.slice(6,strg.length);
          arr3[y]=strg*-1;
          if (y<4) {
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y])).toFixed(2)} mm`;
          }
          else if(y<7)
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y])).toFixed(2)} &deg;`;

        } 
        else {

          if (y<4) {
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y])).toFixed(2)} mm`;
          }
          else if(y<7)
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y])).toFixed(2)} &deg;`;
            else
            document.querySelector(`.js-x${y}0`).innerHTML = `${(Number(arr3[y]))} `;
  }
  

  document.querySelector(`.js-x00`).innerHTML =arr3[0];
 
  

}
    }); 
  }); 

        }
  function read2(){
   $(document).ready(function(){
    $.get(`4-point-2.htm`, function(result){
      word = ((result.trim()));
      arr4=[];
      let variab='';
      let neword='';


    for (let i = 0; i < word.length; i++) {
      if((word[i]) === "\r" )
      {
        i++;
        neword +=' ';
      }
      else 
        neword += word[i]; 
    }

  for (var i = 0; i < neword.length; i++) {
    if(neword[i] === ' '){
      arr4.push(variab);
      variab='';
    }
      else variab += neword[i];
  }
  arr4.push(variab);
 // arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
  let strg;
 
for (let y = 0; y < 9 ; y++) {
 
  strg=arr4[y];
  if(y===0){
    strg= strg.replace('&#x27;','');
    strg= strg.replace('&#x27;','');
    arr4[y]=strg;
  }
  else if(strg[strg.length-9]==='e')
  {   
    arr4[y]=0.00;
    if (y<4) {
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y])).toFixed(2)} mm`;

    }
    else if(y<7)
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y])).toFixed(2)} &deg;`;

  }
  else if (strg[0]==='&') {
    strg= strg.slice(6,strg.length);
    arr4[y]=strg*-1;
    if (y<4) {
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y])).toFixed(2)} mm`;
    }
    else if(y<7)
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y])).toFixed(2)} &deg;`;

  } 
  else {

    if (y<4) {
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y])).toFixed(2)} mm`;
    }
    else if(y<7)
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y])).toFixed(2)} &deg;`;
      else
      document.querySelector(`.js-x${y}1`).innerHTML = `${(Number(arr4[y]))} `;
}


document.querySelector(`.js-x01`).innerHTML =arr4[0];



}
}); 
    }); 
  }

  function read3(){

$(document).ready(function(){
  $.get(`4-point-3.htm`, function(result){
    word = ((result.trim()));
    arr5=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr5.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr5.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr5[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr5[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr5[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr5[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}2`).innerHTML = `${(Number(arr5[y]))} `;
}


document.querySelector(`.js-x02`).innerHTML =arr5[0];



}
}); 
}); 
  }

  function read4(){

$(document).ready(function(){
  $.get(`4-point-4.htm`, function(result){
    word = ((result.trim()));
    arr6=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr6.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr6.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
strg=arr6[y];

if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr6[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr6[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr6[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}3`).innerHTML = `${(Number(arr6[y]))} `;
}


document.querySelector(`.js-x03`).innerHTML =arr6[0];



}
}); 
}); 
  }





  function read5(){

$(document).ready(function(){
  $.get(`4-point-5.htm`, function(result){
    word = ((result.trim()));
    arr7=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr7.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr7.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr7[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr7[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr7[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr7[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}4`).innerHTML = `${(Number(arr7[y]))} `;
}


document.querySelector(`.js-x04`).innerHTML =arr7[0];



}
}); 
}); 

  }

  function read6(){

$(document).ready(function(){
  $.get(`4-point-6.htm`, function(result){
    word = ((result.trim()));
    arr8=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr8.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr8.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr8[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr8[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr8[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr8[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}5`).innerHTML = `${(Number(arr8[y]))} `;
}


document.querySelector(`.js-x05`).innerHTML =arr8[0];



}
}); 
}); 
  }


  function read7(){
$(document).ready(function(){
  $.get(`4-point-7.htm`, function(result){
    word = ((result.trim()));
    arr39=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr9.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr9.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr9[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr9[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr9[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr9[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}6`).innerHTML = `${(Number(arr9[y]))} `;
}


document.querySelector(`.js-x06`).innerHTML =arr9[0];



}
}); 
}); 
  }

  function read8(){

$(document).ready(function(){
  $.get(`4-point-8.htm`, function(result){
    word = ((result.trim()));
    arr10=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr10.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr10.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
strg=arr10[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr10[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr10[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr10[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}7`).innerHTML = `${(Number(arr10[y]))} `;
}


document.querySelector(`.js-x07`).innerHTML =arr10[0];



}
}); 
}); 
  }

  function read9(){

$(document).ready(function(){
  $.get(`4-point-9.htm`, function(result){
    word = ((result.trim()));
    arr11=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr11.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr11.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr11[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr11[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr11[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr11[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}8`).innerHTML = `${(Number(arr11[y]))} `;
}


document.querySelector(`.js-x08`).innerHTML =arr11[0];



}
}); 
}); 
  }

  function read10(){

$(document).ready(function(){
  $.get(`4-point-10.htm`, function(result){
    word = ((result.trim()));
    arr12=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr12.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr12.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr12[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr12[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr12[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr12[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}9`).innerHTML = `${(Number(arr12[y]))} `;
}


document.querySelector(`.js-x09`).innerHTML =arr12[0];



}
}); 
}); 
  }

  function read11(){

$(document).ready(function(){
  $.get(`4-point-11.htm`, function(result){
    word = ((result.trim()));
    arr13=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr13.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr13.push(variab);
// arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr13[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr13[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr13[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr13[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}10`).innerHTML = `${(Number(arr13[y]))} `;
}


document.querySelector(`.js-x010`).innerHTML =arr13[0];



}
}); 
}); 
  }

  function read12(){

$(document).ready(function(){
  $.get(`4-point-12.htm`, function(result){
    word = ((result.trim()));
    arr14=[];
    let variab='';
    let neword='';


  for (let i = 0; i < word.length; i++) {
    if((word[i]) === "\r" )
    {
      i++;
      neword +=' ';
    }
    else 
      neword += word[i]; 
  }

for (var i = 0; i < neword.length; i++) {
  if(neword[i] === ' '){
    arr14.push(variab);
    variab='';
  }
    else variab += neword[i];
}
arr14.push(variab);
//arr14=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
let strg;

for (let y = 0; y < 9 ; y++) {
  
strg=arr14[y];
if(y===0){
  strg= strg.replace('&#x27;','');
  strg= strg.replace('&#x27;','');
  arr14[y]=strg;
}
else if(strg[strg.length-9]==='e')
{   
  arr14[y]=0.00;
  if (y<4) {
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y])).toFixed(2)} mm`;

  }
  else if(y<7)
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y])).toFixed(2)} &deg;`;

}
else if (strg[0]==='&') {
  strg= strg.slice(6,strg.length);
  arr14[y]=strg*-1;
  if (y<4) {
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y])).toFixed(2)} &deg;`;

} 
else {

  if (y<4) {
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y])).toFixed(2)} mm`;
  }
  else if(y<7)
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y])).toFixed(2)} &deg;`;
    else
    document.querySelector(`.js-x${y}11`).innerHTML = `${(Number(arr14[y]))} `;
}


document.querySelector(`.js-x011`).innerHTML =arr14[0];



}
}); 
}); 






        


  }


  function updateAll(){
    read1();
    read2();
    read3();
    read4();
    read5();
    read6();
    read7();
    read8();
    read9();
    read10();
    read11();
    read12();
  }


function updateOne(index){
  if (index===1)
  read1();
  else if (index===2)
  read2();
  else if (index===3)
  read3();
  else if (index===4)
  read4();
  else if (index===5)
  read5();
  else if (index===6)
  read6();
  else if (index===7)
  read7();
  else if (index===8)
  read8();
  else if (index===9)
  read9();
  else if (index===10)
  read10();
  else if (index===11)
  read11();
  else if (index===12)
  read12();

}










    function write(varName,value){
        $(document).ready(function(){
        url="variables1.htm";
        name=`"DB_HMI_INTERFACE".ROBOT[1].`+ varName;
        val=value;
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
          });
       }
  
  
       function write1(varName,value){
        $(document).ready(function(){
        url="variables1.htm";
        name=`"DB_HMI_INTERFACE".`+ varName;
        val=value;
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
          });
       }



       function readpoints(foldername,z){
        $(document).ready(function(){
            $.get(`${foldername}`, function(result){
              word = ((result.trim()));
              arr=[];
              let variab='';
              let neword='';
 
    
            for (let i = 0; i < word.length; i++) {
              if((word[i]) === "\r" )
              {
                i++;
                neword +=' ';
              }
              else 
                neword += word[i]; 
            }
    
          for (var i = 0; i < neword.length; i++) {
            if(neword[i] === ' '){
              arr.push(variab);
              variab='';
            }
              else variab += neword[i];
          }
          arr.push(variab);
         // arr=['asdsadad asdasd',150.55,-100,'6.173844e&#x2d;13',-20.25,20.25,12,11,12]
          let strg;
         
        for (let y = 0; y < 9 ; y++) {
          strg=arr[y];
          if(y===0){
            strg= strg.replace('&#x27;','');
            strg= strg.replace('&#x27;','');
            arr[y]=strg;
          }
          else if(strg[strg.length-9]==='e')
          {   
            arr[y]=0.00;
            if (y<4) {
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y])).toFixed(2)} mm`;

            }
            else if(y<7)
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y])).toFixed(2)} &deg;`;

          }
          else if (strg[0]==='&') {
            strg= strg.slice(6,strg.length);
            arr[y]=strg*-1;
            if (y<4) {
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y])).toFixed(2)} mm`;
            }
            else if(y<7)
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y])).toFixed(2)} &deg;`;

          } 
          else {

            if (y<4) {
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y])).toFixed(2)} mm`;
            }
            else if(y<7)
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y])).toFixed(2)} &deg;`;
              else
              document.querySelector(`.js-x${y}${z-1}`).innerHTML = `${(Number(arr[y]))} `;
    }
    

    document.querySelector(`.js-x0${z-1}`).innerHTML =arr[0];
   
    

  }
      }); 
    }); 

        
  
}


