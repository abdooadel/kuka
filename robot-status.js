let arr1=[];
let arr2=[];
let arr3=[];
let arr4=[];
let arr5=[];
let word1='' ;
let word2='' ;
let word3='' ;
let word4='' ;
let word5='' ;
let word='' ;



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

document.querySelector('.js-start-connection-button').addEventListener('click',()=>{
  write('POWER_ROBOT.Command.Abort',0);
  write('POWER_ROBOT.Command.Power_OFF',0);
  write('POWER_ROBOT.Command.Power_ON',1);
  write('POWER_ROBOT.Command.Power_ON',0);
  write('POWER_ROBOT.Command.Power_ON',1);
  write('POWER_ROBOT.Command.Power_ON',0);
  write('POWER_ROBOT.Command.Power_ON',1);
  write('POWER_ROBOT.Command.Power_ON',0);
  write('POWER_ROBOT.Command.Power_ON',1);
  write('POWER_ROBOT.Command.Power_ON',0);
  write('POWER_ROBOT.Command.Power_ON',1);
  write('POWER_ROBOT.Command.Power_ON',0);

  setIntervalBar();
  readCartisian();

});

document.querySelector('.js-end-connection-button').addEventListener('click',()=>{
  write('POWER_ROBOT.Command.Power_ON',0);
  write('POWER_ROBOT.Command.Power_OFF',1);
  write('POWER_ROBOT.Command.Power_OFF',0);
  readStatusBar();
});

readReduceOnOff();
readStatusBar();
readCartisian();
readAxis();



setInterval(()=>{
  readMode()
},1800);
















// READ VARIABLES
 // setInterval(()=>{

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
                document.querySelector('.js-robot-status').innerHTML='Robot is switched ON';
                document.querySelector('.js-robot-status-container')
                  .classList.add('status-ON');
                document.querySelector('.js-robot-status-container').classList.remove('status-OFF');
                setTimeout(()=>{
                  clearInterval(lock);

                },1000);
              }
              else {
              document.querySelector('.js-robotFF').classList.add('robotOFF-01');
              document.querySelector('.js-robotON').classList.remove('robotON-01');
              document.querySelector('.js-robot-status').innerHTML='Robot is switched OFF';
              document.querySelector('.js-robot-status-container').classList.remove('status-ON');
                document.querySelector('.js-robot-status-container').classList.add('status-OFF');
           
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
        // READ connection Bar & Status Text
        function readStatusBar(){
        $(document).ready(function(){
            $.get(`var-3.htm`, function(result){
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
             
    
       

        // CHECK STATUS BAR
          if(Number(arr3[4])===1)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar1`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar1`);
             if(Number(arr3[4])===2)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar2`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar2`);
             if(Number(arr3[4])===3)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar3`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar3`);
             if(Number(arr3[4])===4)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar4`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar4`);
             if(Number(arr3[4])===5)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar5`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar5`);
             if(Number(arr3[4])===6)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar6`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar6`);
             if(Number(arr3[4])===7)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar7`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar7`);
             if(Number(arr3[4])===8)
             document.querySelector('.js-progress-bar').classList.add(`progress-bar8`);
            else
             document.querySelector('.js-progress-bar').classList.remove(`progress-bar8`);

            if (Number(arr3[4]) ===1) {
              document.querySelector('.js-interface-status').innerHTML='Interface is initialised';
              document.querySelector('.js-robot-interface-container').classList.remove('status-OFF');
              document.querySelector('.js-robot-interface-container').classList.add('status-ON');
            } 
            if (Number(arr3[5]) === 1)  {
              document.querySelector('.js-interface-status').innerHTML='Interface is not initialised';
              document.querySelector('.js-robot-interface-container').classList.add('status-OFF');
              document.querySelector('.js-robot-interface-container').classList.remove('status-ON');
            }

            if (Number(arr3[2]) === 1) {
              document.querySelector('.js-interface-status').innerHTML='Robot has no errors';
              document.querySelector('.js-robot-interface-container').classList.remove('status-OFF');
              document.querySelector('.js-robot-interface-container').classList.add('status-ON');
            }
            if (Number(arr3[1]) === 1) {
              document.querySelector('.js-robot-connection').innerHTML='Communication is established';
              document.querySelector('.js-robot-connection-container').classList.remove('status-OFF');
              document.querySelector('.js-robot-connection-container').classList.add('status-ON');
            } 
            else {
              document.querySelector('.js-robot-connection').innerHTML='Communication is not established';
              document.querySelector('.js-robot-connection-container').classList.add('status-OFF');
              document.querySelector('.js-robot-connection-container').classList.remove('status-ON');
            }

            if (Number(arr3[0]) === 1) {
              document.querySelector('.js-robot-connection').innerHTML='Robot is ready to move';
              document.querySelector('.js-robot-connection-container').classList.remove('status-OFF');
              document.querySelector('.js-robot-connection-container').classList.add('status-ON');
            }
            if (Number(arr3[6]) === 1){
              document.querySelector('.js-robotON').classList.add('robotON-01');
              document.querySelector('.js-robotFF').classList.remove('robotOFF-01');
              document.querySelector('.js-robot-status').innerHTML='Robot is switched ON';
              document.querySelector('.js-robot-status-container')
                .classList.add('status-ON');
              document.querySelector('.js-robot-status-container').classList.remove('status-OFF');
    
            }
            else {
            document.querySelector('.js-robotFF').classList.add('robotOFF-01');
            document.querySelector('.js-robotON').classList.remove('robotON-01');
            document.querySelector('.js-robot-status').innerHTML='Robot is switched OFF';
            document.querySelector('.js-robot-status-container').classList.remove('status-ON');
              document.querySelector('.js-robot-status-container').classList.add('status-OFF');
         
            }

          });
        });
      }

            function readCartisian(){
            // Read Cartsian cordinates
            $(document).ready(function(){
                $.get(`var-4.html`, function(result){
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
        }
      }
      document.querySelector(`.x6`).innerHTML = arr4[6];
      document.querySelector(`.x7`).innerHTML = arr4[7];


         });
        });
      }

      function readAxis(){
      $(document).ready(function(){
          $.get(`var-5.html`, function(result){
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
  
        for (var i = 0; i < neword.length ; i++) {
          if(neword[i] === ' '){
            arr5.push(variab);
            variab='';
          }
            else variab += neword[i];
        }
        arr5.push(variab);
        //console.log(arr5);
            
            for (let i = 0; i < ((arr5.length) ); i++) {
              strg=arr5[i];
              if (strg[strg.length-9]==='e')
            {
              arr5[i]=0.00;

                document.querySelector(`.A${i}-value`).innerHTML = `${(Number(arr5[i])).toFixed(2)} &deg;`;
            }
            else if (strg[0]==='&') {
              strg= strg.slice(6,strg.length);
              arr5[i]=strg*-1;
                document.querySelector(`.A${i}-value`).innerHTML = `${(Number(arr5[i])).toFixed(2)} &deg;`;

              } 
              else {
                  document.querySelector(`.A${i}-value`).innerHTML = `${(Number(arr5[i])).toFixed(2)} &deg;`;
        }
      }
      });
    });

 }

 let lock;
    function setIntervalBar(){
      lock = setInterval(()=>{
        readStatusBar();
        console.log('repeat');
      },1200)
    };

    


    
  //},1500);


  













function write(varName,value){
  $(document).ready(function(){
  url="write-var-control.html";
  name=`"DB_HMI_INTERFACE".ROBOT[1].`+ varName;
  val=value;
  sdata=escape(name)+'='+val;
  $.post(url,sdata,function(result){});
    });
 }




    function read(fileName){
      $(document).ready(function(){
       // setInterval(function() {
          $.get(`${fileName}`, function(result){
            handel ((result.trim()));
            });
      });
    }
    

    function handel(str){
      let variab='';
      let neword='';
      word = str;
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
          arr.push(variab);
          variab='';
        }
          else variab += neword[i];
      }

    
    }
 