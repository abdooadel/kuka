let arr1=[];
let arr2=[];
let arr3=[];
let arr4=[];
let arr100=[];
let word='' ;
let lock;


// WRITE VARIABLES
document.querySelector('.js-jog-axis-pressed').addEventListener('click',()=> {
  write('JOG.Command.Mode',0);
});

//GRIPPER
document.querySelector('.js-open-gripper').addEventListener('click',()=>{
  write1('Ex1',1);
  write1('Ex1',0);
})
document.querySelector('.js-close-gripper').addEventListener('click',()=>{
  write1('Ex2',1);
  write1('Ex2',0);
})

document.querySelector('.js-jog-base-pressed').addEventListener('click',()=> {
  write('JOG.Command.Mode',1);

});

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



for (let i = 1; i < 7; i++){
  document.querySelector(`.js-a${i}-minus-dir-start`).addEventListener('click',()=>{
    write(`JOG.Command.Mode`,0);
    write(`JOG.Command.JOG_0${i}_Minus`,1);

  });

  document.querySelector(`.js-a${i}-minus-dir-stop`).addEventListener('click',()=>{
    write(`JOG.Command.Mode`,0);
    write(`JOG.Command.JOG_0${i}_Minus`,0);
    readMovementStatus();
  });
  document.querySelector(`.js-a${i}-pos-dir-start`).addEventListener('click',()=>{
    write(`JOG.Command.Mode`,0);
    write(`JOG.Command.JOG_0${i}_Plus`,1);

  });
  document.querySelector(`.js-a${i}-pos-dir-stop`).addEventListener('click',()=>{
    write(`JOG.Command.Mode`,0);
    write(`JOG.Command.JOG_0${i}_Plus`,0);
  });
}

document.querySelector('.js-save-pos').addEventListener('click',()=>{
  
  write('JOG.Command.TouchUp_execute',1 );
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
 
 document.querySelector('.js-move-home').addEventListener('click',()=>{
  write('SINGLE_MOVEMENT.Command.MovetoHome',1);
  write('SINGLE_MOVEMENT.Command.MovetoHome',0);

});


 readMode();
 readReduceOnOff();
 readMovementStatus();
 readAxis();
let lock1;

setInterval(()=>{
  loop();
  readAxis();
},2000);

// READ VARIABLES

    // READ Modes
    
    function readMode(){
      $(document).ready(function(){
        $.ajaxSetup({ cache: false });
       // setInterval(function() {
          $.get(`var-1.htm`, function(result){
            word1 = ((result.trim()));
            console.log(result);
  
  
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
                 
              console.log(arr1);
         
              
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

          console.log(arr2);

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
        });
      });
  
    }




      function readMovementStatus(){
      // READ MOVEMENT STATUS

      $(document).ready(function(){
          $.get(`1-var-3.htm`, function(result){
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
                document.querySelector('.js-busy').classList.remove('error-on');
              if(Number(arr3[1])===1)
                document.querySelector('.js-error').classList.add('error-on');
              else
                document.querySelector('.js-error').classList.remove('error-on');
            document.querySelector('.js-error-num').innerHTML=arr3[2];
          });
        });
      }



      
      function readAxis(){
            //READ AXIS POSITIONS
            $(document).ready(function(){
                $.get(`1-var-4.htm`, function(result){
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
               document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} &deg`;
            }
            else if (strg[0]==='&') {
              strg= strg.slice(6,strg.length);
              arr4[i]=strg*-1;
              document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} &deg;`;
              } 
            else {
                  document.querySelector(`.x${i}`).innerHTML = `${(Number(arr4[i])).toFixed(2)} &deg;`;
        }
      }

    });
                  
  });
      }

      function loop(){
        $(document).ready(function(){
          $.get(`variable.htm`, function(result){
            word = ((result.trim()));
            let variab='';
            let neword='';
            arr100=[]; 
  
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
            arr100.push(variab);
            variab='';
          }
            else variab += neword[i];
        }
        arr100.push(variab);
        if (Number(arr100[0]) === 1){
          document.querySelector('.js-robotON').classList.add('robotON-01');
          document.querySelector('.js-robotFF').classList.remove('robotOFF-01');
        }
        else {
        document.querySelector('.js-robotFF').classList.add('robotOFF-01');
        document.querySelector('.js-robotON').classList.remove('robotON-01');
     
        }
        if(Number(arr100[1])===1)
        document.querySelector('.js-busy').classList.add('error-on');
        else
        document.querySelector('.js-busy').classList.remove('error-on');

    });
                  
  });
      }

      function interval(){
      
    }



    /*setTimeout(()=>{
      document.querySelector('.js-input').value=arr1[4];
    },3500)
*/
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

  