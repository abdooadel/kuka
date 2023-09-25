let arr1=[];
let arr2=[];
let word1='' ;
let word2='' ;

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


readReduceOnOff();
setInterval(()=>{
  readMode()
},1800);

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
              setTimeout(()=>{
                clearInterval(lock);

              },1000);
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
    });
  });

}