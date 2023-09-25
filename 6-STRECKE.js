let arr1=[];
let arr2=[];
let arr=[];
let arr3=[];
let word='' ;
let arr200=[];
let loopFlag=0;
let stepFlag=0;



// WRITE VARIABLES
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


// WRITE POINT NAME
  for(let i=1;i<13;i++){
    document.querySelector(`.js-input-${i}`).addEventListener('keydown',(event)=>{
      if(event.key==='Enter'){
      write(`Applikation.Strecke.Status.Positionen[${i}].Name`,document.querySelector(`.js-input-${i}`).value);
      }
     
      });
      document.querySelector(`.js-11${i-1}`).addEventListener('change',()=>{
        write('Applikation.Strecke.Status.Positionen[12].Bewegungsart',document.querySelector(`.js-11${i}`).value);
    });
    
    document.querySelector(`.js-input-${i}`).addEventListener('click',()=>{
      document.querySelector(`.js-input-${i}`).placeholder='';
     }) ;
     
  }

  //STRECKE LIST BUTTONS

  document.querySelector('.js-move').addEventListener('click',()=>{
    write('Applikation.Strecke.Command.Move_Execute',1);
    setInterval(()=>{
      ReadAvticDone();
    },1500)
  });

  document.querySelector('.js-abort').addEventListener('click',()=>{
    write('Applikation.Strecke.Command.Abbruch',1); 
    write('POWER_ROBOT.Command.Abort',1);
    write('Applikation.Strecke.Command.Abbruch',0);
    write('POWER_ROBOT.Command.Abort',0);
  });

  document.querySelector('.js-loop').addEventListener('click',()=>{
    if (loopFlag===0){
      write('Applikation.Strecke.Command.Schleifenmode',1);
      document.querySelector('.js-loop').classList.add('orange-background');
      loopFlag=1;
    }
    else{
      write('Applikation.Strecke.Command.Schleifenmode',0);
      loopFlag=0;
      document.querySelector('.js-loop').classList.remove('orange-background');
    }
  });

  document.querySelector('.js-strecke-reset').addEventListener('click',()=>{
    write('Applikation.Strecke.Command.Reset',1);
    updateAll();
  });

  document.querySelector('.js-step').addEventListener('click',()=>{
    if (stepFlag===0){
    write('Applikation.Strecke.Command.Stepmode',1);
    stepFlag=1;
    document.querySelector('.js-step').classList.add('orange-background');
    document.querySelector('.js-next-step').classList.add('opacity-ON');

    }
    else {
      write('Applikation.Strecke.Command.Stepmode',0);
    stepFlag=0;
    document.querySelector('.js-step').classList.remove('orange-background');
    document.querySelector('.js-next-step').classList.remove('opacity-ON');
    }
  });

  document.querySelector('.js-next-step').addEventListener('click',()=>{
    write('Applikation.Strecke.Command.Nextstep',1);
  });

  document.querySelector('.js-HOME').addEventListener('click',()=>{
    write('Applikation.Strecke.Command.HomePosition_speichern',1);
    updateFirstLast();
  });

  
  readMode();
  readReduceOnOff();
  updateAll();
  ReadAvticDone();


  // READ VARIABLES

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

        index = Number(arr2[3]);
      });
    });
  }
        
// READ STRECKE AVTIVE DONE 
      function ReadAvticDone(){
      $(document).ready(function(){
        $.ajaxSetup({ cache: false });
          $.get(`6-var-5.htm`, function(result){
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
          
      console.log(arr3);
      if (Number(arr3[0])===1) {
          document.querySelector('.js-active').classList.add('opacity-ON');
          document.querySelector('.js-move').classList.add('orange-background');
      }
          else  
          document.querySelector('.js-active').classList.remove('opacity-ON')
              
          if (Number(arr3[1])===1) {
            document.querySelector('.js-done').classList.add('opacity-ON')
            document.querySelector('.js-move').classList.remove('orange-background');
        }
            else  
            document.querySelector('.js-done').classList.remove('opacity-ON')

            if (Number(arr3[4])===1){
              document.querySelector('.js-loop').classList.add('orange-background');
              loopFlag=1;
            }
            else{
              loopFlag=0;
              document.querySelector('.js-loop').classList.remove('orange-background');
            }
          
            if (Number(arr3[3])===1){
              stepFlag=1;
              document.querySelector('.js-step').classList.add('orange-background');
              document.querySelector('.js-next-step').classList.add('opacity-ON');
          
              }
              else {
              stepFlag=0;
              document.querySelector('.js-step').classList.remove('orange-background');
              document.querySelector('.js-next-step').classList.remove('opacity-ON');
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
  
  
       function write1(varName,value){
        $(document).ready(function(){
        url="variables1.htm";
        name=`"DB_HMI_INTERFACE".`+ varName;
        val=value;
        sdata=escape(name)+'='+val;
        $.post(url,sdata,function(result){});
          });
       }


       function readPoint1(){
          readpoints('6-point-1.htm',1);
       }


       function readPoint2(){
        readpoints('6-point-2.htm',2);
      }
      
      function readPoint3(){
        readpoints('6-point-3.htm',3);
     }


     function readPoint4(){
      readpoints('6-point-4.htm',4);
    }

    function readPoint5(){
       readpoints('6-point-5.htm',5);
    }


    function readPoint6(){
     readpoints('6-point-6.htm',6);
   }
   
   function readPoint7(){
     readpoints('6-point-7.htm',7);
  }


  function readPoint8(){
    readpoints('6-point-8.htm',8);
  }
  function readPoint9(){
  readpoints('6-point-9.htm',9);
  }


  function readPoint10(){
  readpoints('6-point-10.htm',10);
  }

  function readPoint11(){
  readpoints('6-point-11.htm',11);
  }


  function readPoint12(){
  readpoints('6-point-14.htm',12);
  }

  function updateAll(){
    readPoint1();
    readPoint2();
    readPoint3();
    readPoint4();
    readPoint5();
    readPoint6();
    readPoint7();
    readPoint8();
    readPoint9();
    readPoint10();
    readPoint11();
    readPoint12();
  }

function updateFirstLast(){
  readPoint1();
  readPoint12();
}






       function readpoints(foldername,z){
        $(document).ready(function(){
          $.ajaxSetup({ cache: false });
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

          let strg;
         //arr=['&#x27;assadsd&#x27;',0,'&#x2d;18.0','&#x2d;150.0','&#x2d;160.0','&#x2d;170.0',0,'&#x2d;190.0',8,9,5];
        for (let y = 1; y <= arr.length; y++) {
          strg=arr[y-1];
          if(y===1){
            strg= strg.replace('&#x27;','');
            strg= strg.replace('&#x27;','');
            arr[y-1]=strg;
            document.querySelector(`.js-x${y-1}${z-1}`).innerHTML=strg;
          }
         else if(strg[strg.length-9]==='e')
          {
            arr[y-1]=0.00;
            if (y<5 & y>1) {
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${(Number(arr[y-1])).toFixed(2)} mm`;
            }
            else if(y>4 & y<8)
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${(Number(arr[y-1])).toFixed(2)} &deg;`;

          } 
          
          else if (strg[0]==='&') {
            strg= strg.slice(6,strg.length);
            arr[y-1]=Number(strg)*-1;
            if (y<5 & y>1) {
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${Number(arr[y-1]).toFixed(2)} mm`;
            }
            else if(y>4 & y<9)
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${(Number(arr[y-1])).toFixed(2)} &deg;`;

          } 
          else {
            
            if (y<5 & y>1) {
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${(Number(arr[y-1])).toFixed(2)} mm`;
            }
          else if(y>4 & y<8)
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${(Number(arr[y-1])).toFixed(2)} &deg;`;
           else if(y>7 & y<11)
              document.querySelector(`.js-x${y-2}${z-1}`).innerHTML = `${(Number(arr[y-1]))} `;


          
              

              
    }
    

    document.querySelector(`.js-x0${z-1}`).innerHTML =arr[0];
    
    document.querySelector(`.js-11${z-1}`).value=arr[10];
    
    if(Number(arr[1])===1){

      document.querySelector(`.js-x9${z-1}`).classList.add('opacity-ON');
      document.querySelector(`.js-10${z-1}`).classList.remove('opacity-ON');
    } 
    else {

      document.querySelector(`.js-x9${z-1}`).classList.remove('opacity-ON');
      document.querySelector(`.js-10${z-1}`).classList.add('opacity-ON');
    }
  

  }
      }); 
    }); 

        
  
}








/*function readStatus(){
  $(document).ready(function(){
    $.ajaxSetup({ cache: false });
      $.get(`6-var-5.htm`, function(result){
        word = ((result.trim()));
        let variab='';
        let neword='';
        arr200=[]; 
  
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
        arr200.push(variab);
        variab='';
      }
        else variab += neword[i];
    }
    arr200.push(variab);
    arr200=[1,1,1,1,1,1,1,1]
    if(Number(arr200[0]===1))
      document.querySelector('.js-active').classList.add('opacity-on');
    else
    document.querySelector('.js-active').classList.remove('opacity-on');
    if(Number(arr200[1]===1))
    document.querySelector('.js-done').classList.add('opacity-on');
  else
  document.querySelector('.js-done').classList.remove('opacity-on');

  if (Number(arr200[4])===1){
    document.querySelector('.js-loop').classList.add('orange-background');
    loopFlag=1;
  }
  else{
    loopFlag=0;
    document.querySelector('.js-loop').classList.remove('orange-background');
  }

  if (Number(arr200[3])===1){
    stepFlag=1;
    document.querySelector('.js-step').classList.add('orange-background');
    document.querySelector('.js-next-step').classList.add('opacity-ON');

    }
    else {
    stepFlag=0;
    document.querySelector('.js-step').classList.remove('orange-background');
    document.querySelector('.js-next-step').classList.remove('opacity-ON');
    }



  });
});
}


*/