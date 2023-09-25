
let arr1=[];
let arr2=[];
let arr3=[];
let arr4=[];
let arr5=[];
let word='' ;
let index;
let lock;


// WRITE VARIABLES
document.querySelector('.js-jog-axis-pressed').addEventListener('click',()=> {
  write('JOG.Command.Mode',0);
});

document.querySelector('.js-jog-base-pressed').addEventListener('click',()=> {
  write('JOG.Command.Mode',1);

});
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
 
 
// MOVE HOME
document.querySelector('.js-move-home').addEventListener('click',()=>{
  write('SINGLE_MOVEMENT.Command.MovetoHome',1);
  write('SINGLE_MOVEMENT.Command.MovetoHome',0);

});

document.querySelector('.js-move').addEventListener('click',()=>{
  write('SINGLE_MOVEMENT.Command.MoveLinearAbsolute.ExecuteCmd',1);
  write('SINGLE_MOVEMENT.Command.MoveLinearAbsolute.ExecuteCmd',0);
});

document.querySelector('.js-read-Tpoint').addEventListener('click',()=>{
  write('SINGLE_MOVEMENT.Command.LIN_ReadPositionFrom',1);
  readPosition();
});

document.querySelector(`.js-cir-x`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`SINGLE_MOVEMENT.Command.MoveLinearAbsolute.Position.X`,document.querySelector(`.js-cir-x`).value);
  readPosition();
  }
});

document.querySelector(`.js-cir-y`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`SINGLE_MOVEMENT.Command.MoveLinearAbsolute.Position.Y`,document.querySelector(`.js-cir-y`).value);
  readPosition();
  }
});

document.querySelector(`.js-cir-z`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`SINGLE_MOVEMENT.Command.MoveLinearAbsolute.Position.Z`,document.querySelector(`.js-cir-z`).value);
  readPosition();
  }
});

document.querySelector(`.js-cir-a`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`SINGLE_MOVEMENT.Command.MoveLinearAbsolute.Position.A`,document.querySelector(`.js-cir-a`).value);
  readPosition();
  }
});

document.querySelector(`.js-cir-b`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`SINGLE_MOVEMENT.Command.MoveLinearAbsolute.Position.B`,document.querySelector(`.js-cir-b`).value);
  readPosition();
  }
});

document.querySelector(`.js-cir-c`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`SINGLE_MOVEMENT.Command.MoveLinearAbsolute.Position.C`,document.querySelector(`.js-cir-c`).value);
  readPosition();
  }
});

for(let selectX=1; selectX<7; selectX++){
  document.querySelector(`.y${selectX}`).addEventListener('click',()=>{
    document.querySelector(`.y${selectX}`).placeholder=''
  })
}

readMode();
readReduceOnOff();
readMovementStatus();
readBase();
readPosition();
setInterval(()=>{
  readMovementStatus();
  readBase();
  readMode();
},1800);

// READ VARIABLES

    // READ Modes
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
         

        
      // READ MOVEMENT STATUS
      function readMovementStatus(){
        // READ MOVEMENT STATUS
      
        $(document).ready(function(){
            $.get(`5-var-3.htm`, function(result){
              word = ((result.trim()));
              let variab='';
              let neword='';
              arr3=[]; 
      
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
           
              if(Number(arr3[0])===1)
                  document.querySelector('.js-busy').classList.add('error-on');
                else
                {
                  document.querySelector('.js-busy').classList.remove('error-on');
                  clearInterval(lock);
                }
                if(Number(arr3[1])===1)
                  document.querySelector('.js-error').classList.add('error-on');
                else
                  document.querySelector('.js-error').classList.remove('error-on');
              document.querySelector('.js-error-num').innerHTML=arr3[2];
            });
          });
           }


// Read Cartsian cordinates
function readBase(){
$(document).ready(function(){
    $.ajaxSetup({ cache: false });
      $.get(`5-var-5.htm`, function(result){
        word = ((result.trim()));
        let variab='';
        let neword='';
        arr4=[]; 

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
       
  let strg;

   for (let i = 0; i < arr4.length; i++) {
    strg=arr4[i];
    if (strg[strg.length-9]==='e')
            {
              arr4[i]=0.00;
              if (i<3) {
                document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} mm`;
              }
              else if(i<6)
                document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} &deg;`;
            }
            else if (strg[0]==='&') {
              strg= strg.slice(6,strg.length);
              arr4[i]=strg*-1;
            
              if (i<3) {
                document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} mm`;
              }
              else if(i<6)
                document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} &deg;`;

              } 
    else {

      if (i<3) {
        document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} mm`;
      }
      else if(i<6)
        document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} &deg;`;
        else
        document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i]))} `;
}

}            

      
});

});
}

function readPosition(){
  //READ AXIS POSITIONS
  $(document).ready(function(){
      $.get(`5-var-7.htm`, function(result){
        word = ((result.trim()));
        let variab='';
        let neword='';
        arr5=[]; 

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
      

  let strg;
  for (let i = 0; i < arr5.length; i++) {
    strg=arr5[i];
    if (strg[strg.length-9]==='e')
    {
      arr5[i]=0.00;
      if (i<3) {
        document.querySelector(`.y${i+1}`).value = `${(Number(arr5[i])).toFixed(2)} mm`;
        document.querySelector(`.y${i+1}`).placeholder = `${(Number(arr5[i])).toFixed(2)} mm`;
      }
      else if(i<6)
        document.querySelector(`.y${i+1}`).value = `${(Number(arr5[i])).toFixed(2)}  ${String.fromCharCode(176)} `;
        document.querySelector(`.y${i+1}`).placeholder = `${(Number(arr5[i])).toFixed(2)}  ${String.fromCharCode(176)} `;

    }
    else if (strg[0]==='&') {
      strg= strg.slice(6,strg.length);
      arr5[i]=strg*-1;
    
      if (i<3) {
        document.querySelector(`.y${i+1}`).placeholder = `${(Number(arr5[i])).toFixed(2)} mm`;
      }
      else if(i<6)
        document.querySelector(`.y${i+1}`).placeholder = `${(Number(arr5[i])).toFixed(2)}  ${String.fromCharCode(176)} `;

      } 
    else {

      if (i<3) {
        document.querySelector(`.y${i+1}`).placeholder = `${(Number(arr5[i])).toFixed(2)} mm`;
      }
      else if(i<6)
        document.querySelector(`.y${i+1}`).placeholder = `${(Number(arr5[i])).toFixed(2)}  ${String.fromCharCode(176)} `;

}

}

});
        
});
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
      
 