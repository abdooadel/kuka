let arr1=[];
let arr2=[];
let arr3=[];
let arr4=[];
let arr5=[];
let arr6=[];
let arr7=[];
let arr8=[];
let arr9=[];
let word='' ;

setInterval(()=>{
  readMode()
},1000);
document.querySelector('.js-jog-axis-pressed').addEventListener('click',()=> {
  write('JOG.Command.Mode',0);
});

document.querySelector('.js-jog-base-pressed').addEventListener('click',()=> {
  write('JOG.Command.Mode',1);

});
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



  document.querySelector('.js-reset-gripper').addEventListener('click',()=>{
    write1('"IDB_ROBOT_1".St_Greifer_Buffermode',1);

  });

  document.querySelector('.js-set-t1').addEventListener('click',()=>{
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T1',1);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T1',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T2',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_AUT',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_EXT',0);

  });
  document.querySelector('.js-set-t2').addEventListener('click',()=>{
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T1',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T2',1);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T2',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_AUT',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_EXT',0);

  });
  document.querySelector('.js-set-aut').addEventListener('click',()=>{
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T1',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T2',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_AUT',1);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_AUT',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_EXT',0);

  });

  document.querySelector('.js-set-ext').addEventListener('click',()=>{
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T1',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_T2',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_AUT',0);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_EXT',1);
    write1('"DB_HMI_INTERFACE".ROBOT[1].POWER_ROBOT.Command.AutoExtern.ENABLE_EXT',0);


  });



  

  readMode();
  readReduceOnOff();
  READ1();
  READ2();
  READ3();
  READ4();
  READ5();
  read10();
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
                  document.querySelector('.js-mode-ext').classList.add('mode-ON');

                }
                else {
                  document.querySelector('.js-ext').classList.remove('ModeON');
                  document.querySelector('.js-mode-ext').classList.remove('mode-ON');
                }
              
                if (Number(arr1[0]) === 1){
                  document.querySelector('.js-mode-t1').classList.add('mode-ON');
                  document.querySelector('.js-T1').classList.add('ModeON');

                  }
                else 
                {
                document.querySelector('.js-T1').classList.remove('ModeON'); 
                document.querySelector('.js-mode-t1').classList.remove('mode-ON'); 

              }
                if (Number(arr1[1]) === 1){
                  document.querySelector('.js-T2').classList.add('ModeON');
                  document.querySelector('.js-mode-t2').classList.add('mode-ON');

                }
                else 
                {
                document.querySelector('.js-T2').classList.remove('ModeON');
                document.querySelector('.js-mode-t2').classList.remove('mode-ON');
              }
                
                if (Number(arr1[2]) === 1){
                  document.querySelector('.js-mode-aut').classList.add('mode-ON');
                  document.querySelector('.js-aut').classList.add('ModeON');

                }
                else 
                {
                document.querySelector('.js-mode-aut').classList.remove('mode-ON');
                document.querySelector('.js-aut').classList.remove('ModeON');
              }
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
        });
      });
  
    }




        function READ1(){
         $(document).ready(function(){
          $.ajaxSetup({ cache: false });
            $.get(`3-var-5.htm`, function(result){
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
              

         for (let i = 0; i< arr5.length; i++)
          {
           
            if(Number(arr5[i])  === 1){
              document.querySelector(`.js-select-a${i}`).classList.add('mode-ON');
          
            }
            else if(Number(arr5[i])  === 0)
            document.querySelector(`.js-select-a${i}`).classList.remove('mode-ON');
         }
        });
    
      });
    }


          function READ4(){
         $(document).ready(function(){
          $.ajaxSetup({ cache: false });
            $.get(`3-var-6.htm`, function(result){
              word = ((result.trim()));
              let variab='';
              let neword='';
              arr6=[]; 
    
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
              
         for (let i = 0; i< arr6.length; i++)
          {
           
            if(Number(arr6[i])  === 1){
              document.querySelector(`.js-select-b${i}`).classList.add('mode-ON');
          
            }
            else if(Number(arr6[i]) === 0)
            document.querySelector(`.js-select-b${i}`).classList.remove('mode-ON');
         }

        });
    
      });
    }




          function READ2(){
         // READ ROBOT INFO
         $(document).ready(function(){
          $.ajaxSetup({ cache: false });
            $.get(`3-var-7.htm`, function(result){
              word = ((result.trim()));
              let variab='';
              let neword='';
              arr7=[]; 
    
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
             
         console.log(arr7);
         for (let i = 0; i< arr7.length; i++)
          {

                document.querySelector(`.js-c${i}`).innerHTML=arr7[i];

         }
        });
    
      });
    }



    function READ3(){
         // READ ROBOT INFO
         $(document).ready(function(){
          $.ajaxSetup({ cache: false });
            $.get(`3-var-3.htm`, function(result){
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
              

         for (let i = 0; i< arr3.length; i++)
          {

              document.querySelector(`.js-d${i}`).innerHTML=arr3[i];

         }
        });
    
      });
            }

    function read10(){
      $(document).ready(function(){
      $.ajaxSetup({ cache: false });
        $.get(`3-var-8.htm`, function(result){
          word = ((result.trim()));
          let variab='';
          let neword='';
          arr8=[]; 

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
      

      for (let i = 0; i< arr8.length; i++)
      {

          document.querySelector(`.js-selec-c${i+1}`).innerHTML=arr8[i];

      }




    });

  });
}

    function READ5(){
      $(document).ready(function(){
        $.ajaxSetup({ cache: false });
          $.get(`3-var-4.htm`, function(result){
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
            
      console.log(arr4);
      for (let i = 0; i< arr4.length; i++)
        {
          console.log(i);
          if(Number(arr4[i]) === 1){
            document.querySelector(`.js-selec-${i}`).classList.add('mode-ON');
            console.log('on');
          }
          else 
          document.querySelector(`.js-selec-${i}`).classList.remove('mode-ON');
          console.log('off');
      }

      });

    });
    }












    function write(varName,value){
        $(document).ready(function(){
        url="variables1.htm";
        name='"DB_HMI_INTERFACE".ROBOT[1].'+ varName;
        val=value;
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
          });
       }
       
       function write1(varName,value){
        $(document).ready(function(){
        url="variables1.htm";
        name= varName;
        val=value;
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
          });
       }