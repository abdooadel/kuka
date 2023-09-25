let arr1=[];
let arr2=[];
let arr3=[];
let arr4=[];
let arr5=[];
let arr6=[];
let word='' ;
let index;
let arr200=[];
let smothFlag=0;

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
   

document.querySelector('.js-select-movement-type').addEventListener('change',()=>{
  write('Applikation.Strecke.Status.Nach_Position.Bewegungsart',document.querySelector('.js-select-movement-type').value);
  if(Number((document.querySelector('.js-select-movement-type').value)) === 2){
    document.querySelector('.js-show-grid').classList.add('opacity-on')
  }
  else
    document.querySelector('.js-show-grid').classList.remove('opacity-on')
});

document.querySelector(`.js-target-point-name`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`Applikation.Strecke.Status.Nach_Position.Name`,document.querySelector(`.js-target-point-name`).value);
  }
});

document.querySelector(`.js-target-point-nameHP`).addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
  write(`Applikation.Strecke.Status.Nach_Position.NameHP`,document.querySelector(`.js-target-point-name`).value);
  //console.log(document.querySelector(`.js-target-point-nameHP`).value)
  }
});

document.querySelector('.js-save-button').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Speichern',1);
});

document.querySelector('.js-back-button').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Speichern',1);
  write('Applikation.Strecke.Command.Zurueck_Execite',1);
  write('Applikation.Strecke.Command.NeuLaden',1);
  write('Applikation.Strecke.Command.Zurueck_Execite',0);
  write('Applikation.Strecke.Command.NeuLaden',0);
  readFromPoint();
  readToPoint();
  readReduceOnOff();
  write('Applikation.Strecke.Command.Speichern',1);
  if(index> 1)
  write('JOG.Command.TouchUp_Index',(index-1));
  readStatus();

});

document.querySelector('.js-next-button').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Speichern',1);
  write('Applikation.Strecke.Command.Weiter_Execute',1);
  write('Applikation.Strecke.Command.NeuLaden',1);
  readReduceOnOff();
  if (index<13)
    write('JOG.Command.TouchUp_Index',(index+1));
  write('Applikation.Strecke.Command.Weiter_Execute',0);
  write('Applikation.Strecke.Command.NeuLaden',0);
  readFromPoint();
  readToPoint();
  readReduceOnOff();
  document.querySelector(`.js-b7`).placeholder='';
  readStatus();
});

document.querySelector('.js-read-tp').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Zielpunkt_AktPos_Lesen',1);
  readToPoint();
  write('Applikation.Strecke.Command.Zielpunkt_AktPos_Lesen',0);

});

document.querySelector('.js-learn-tp').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Zielpunkt_TP_Lesen',1);
  readToPoint();
  write('Applikation.Strecke.Command.Zielpunkt_TP_Lesen',0);

});

document.querySelector('.js-read-hp').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Hilfspunkt_AktPos_Lesen',1);
  readHpPoint();
  write('Applikation.Strecke.Command.Hilfspunkt_AktPos_Lesen',0);
});

document.querySelector('.js-learned-hp').addEventListener('click',()=>{
  write('Applikation.Strecke.Command.Hilfspunkt_TP_Lesen',1);
  readHpPoint();
  write('Applikation.Strecke.Command.Hilfspunkt_TP_Lesen',0);
});

document.querySelector('.js-smothing').addEventListener('click',()=>{
  readStatus();
  if (smothFlag===0)
  write('Applikation.Strecke.Status.Nach_Position.Ueberschleifen',1);
  else
  write('Applikation.Strecke.Status.Nach_Position.Ueberschleifen',0);
  readStatus();
});
//GRIPPER
document.querySelector('.js-open-gripper').addEventListener('click',()=>{
  write1('"DB_HMI_INTERFACE".Ex1',1);
  write1('"DB_HMI_INTERFACE".Ex1',0);
})
document.querySelector('.js-close-gripper').addEventListener('click',()=>{
  write1('"DB_HMI_INTERFACE".Ex2',1);
  write1('"DB_HMI_INTERFACE".Ex2',0);
})


 

    readMode();
    readReduceOnOff();
    readPosition();
    readFromPoint();
    readToPoint();
    readHpPoint();
    readStatus();
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
        index = Number(arr2[3]);
        document.querySelector('.js-input').placeholder=arr2[3];
        document.querySelector('.js-input').value=arr2[3];

        if(Number(arr2[4]) ===0){
          document.querySelector('.js-from').classList.add('opacity-on');
       }
        else
          document.querySelector('.js-from').classList.remove('opacity-on');
      
      });
    });
  }


        

        
              
      function readPosition(){
      // Read Cartsian cordinates
      $(document).ready(function(){
          $.ajaxSetup({ cache: false });
            $.get(`6-var-4.htm`, function(result){
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
      });

      });
      }     

// READ FROM POINT
      function readFromPoint(){
      $(document).ready(function(){
        $.ajaxSetup({ cache: false });
          $.get(`6-from-point.htm`, function(result){
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
      for (let i = 0; i < arr3.length; i++) {
        strg=arr3[i];
         if(i===7){
          strg= strg.replace('&#x27;','');
          strg= strg.replace('&#x27;','');
          strg=strg.replace('&#x20;',' ');
          arr3[i]=strg;
          document.querySelector(`.js-a${i}`).innerHTML = `${arr3[i]} `;
          }
          else if(strg[strg.length-9]==='e')
            {
            arr3[i]=0.00;
            if (i<4) {
            document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i])).toFixed(2)} mm`;
            }
            else if(i<7)
            document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i])).toFixed(2)} &deg;`;

            } 
         else if (strg[0]==='&') {
          strg= strg.slice(6,strg.length);
          arr3[i]=strg*-1;

          if (i<4) {
            document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i])).toFixed(2)} mm`;
          }
          else if(i<7)
            document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i])).toFixed(2)} &deg;`;
        }
            
           
          
          else if(i===7){
            strg= strg.replace('&#x27;','');
            strg= strg.replace('&#x27;','');
            strg=strg.replace('&#x20;',' ');
            arr3[i]=strg;
            document.querySelector(`.js-a${i}`).innerHTML = `${arr3[i]} `;
            }
        else {

          if(i===0)
          document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i]))} `;

          else if (i<4) {
            document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i])).toFixed(2)} mm`;
          }
          else if(i<7)
            document.querySelector(`.js-a${i}`).innerHTML = `${(Number(arr3[i])).toFixed(2)} &deg;`;
            
            if(i===7)
              document.querySelector(`.js-a${i}`).innerHTML = `${arr3[i]} `;

              if(i===8)
              document.querySelector(`.js-a${i}`).innerHTML = `${arr3[i]} `;
      }

      }            
      });

      });
      }


// READ TO POINT
      function readToPoint(){
      $(document).ready(function(){
        $.ajaxSetup({ cache: false });
          $.get(`6-to-point.html`, function(result){
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
      //arr6=[1,12,16,17,5,'&#x27;10',500,'&#x27;ss&#x20;sd&#x27;',10,5]
      for (let i = 0; i < arr6.length; i++) {
        strg=arr6[i];

      
        if(strg[strg.length-9]==='e')
                {
                  arr6[i]=0.00;
                  if (i<4) {
                    document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i])).toFixed(2)} mm`;
                  }
                  else if(i<7)
                    document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i])).toFixed(2)} &deg;`;

                } 
                else if(i===7){
                  strg= strg.replace('&#x27;','');
                  strg= strg.replace('&#x27;','');
                  strg=strg.replace('&#x20;',' ');
                  arr6[i]=strg;
                  document.querySelector(`.js-b${i}`).placeholder = `${arr6[i]} `;
                  document.querySelector(`.js-b${i}`).value = `${arr6[i]} `;
                }
                else if (strg[0]==='&') {
                  strg= strg.slice(6,strg.length);
                  arr6[i]=strg*-1;
              
                  
                  if (i<4) {
                    document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i])).toFixed(2)} mm`;
                  }
                  else if(i<7)
                    document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i])).toFixed(2)} &deg;`;
                  
                } 
        
        else {

          if(i===0)
          document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i]))} `;

          else if (i<4) {
            document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i])).toFixed(2)} mm`;
          }
          else if(i<7)
            document.querySelector(`.js-b${i}`).innerHTML = `${(Number(arr6[i])).toFixed(2)} &deg;`;
        
              else if(i===8)
              document.querySelector(`.js-b${i}`).innerHTML = `${arr6[i]} `;
      }

      }
      document.querySelector('.js-select-movement-type').value=arr6[9];
      if (Number(arr6[10])===1)
        document.querySelector('.')
      });

      });
      }

      // READ HP POINT
      function readHpPoint(){
      $(document).ready(function(){
        $.ajaxSetup({ cache: false });
          $.get(`6-hp.html`, function(result){
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
      for (let i = 0; i < arr5.length; i++) {
        strg=arr5[i];
        strg=strg.replace('&#x20;',' ');
        
         if(strg[strg.length-9]==='e')
                {
                  arr5[y]=0.00;
                  if (y<4) {
                    document.querySelector(`.js-c${i}`).innerHTML = `${(Number(arr5[y])).toFixed(2)} mm`;
                  }
                  else if(y<7)
                    document.querySelector(`.js-c${i}`).innerHTML = `${(Number(arr5[y])).toFixed(2)} &deg;`;

                } 
        else if(i===7){
            strg= strg.replace('&#x27;','');
            strg= strg.replace('&#x27;','');
            strg=strg.replace('&#x20;',' ');
            arr5[i]=strg;
            document.querySelector(`.js-b${i}`).placeholder = `${arr5[i]} `;
        } 
        else if (strg[0]==='&') {
          strg= strg.slice(6,strg.length);
          arr5[i]=strg*-1;

          if (i<4) {
            document.querySelector(`.js-c${i}`).innerHTML = `${(Number(arr5[i])).toFixed(2)} mm`;
          }
          else if(i<7)
            document.querySelector(`.js-c${i}`).innerHTML = `${(Number(arr5[i])).toFixed(2)} &deg;`;
          i++;
        } 
        else {

          if(i===0)
          document.querySelector(`.js-c0`).innerHTML = `${(Number(arr5[i]))} `;

          else if ( i<4) {
            document.querySelector(`.js-c${i}`).innerHTML = `${(Number(arr5[i])).toFixed(2)} mm`;
          }
          else if(i<7)
            document.querySelector(`.js-c${i}`).innerHTML = `${(Number(arr5[i])).toFixed(2)} &deg;`;
            
            else if(i===7)
              document.querySelector(`.js-c${i}`).placeholder = `${arr5[i]} `;

              else if(i===8)
              document.querySelector(`.js-c8`).innerHTML = `${arr5[i]} `;
      }

      }

      });
      });
      }

      function readStatus(){
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
          console.log(arr200);
          if (Number(arr200[2])===1){
            document.querySelector('.js-smothing').classList.add('green');
            smothFlag=1;
          }
          else
          {
          smothFlag=0;
          document.querySelector('.js-smothing').classList.remove('green');
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
      name= varName;
      val=value;
      sdata=escape(name)+'='+val;
      $.post(url,sdata,function(result){});
        });
     }
       document.querySelector(`.js-b7`).addEventListener('click',()=>{
        document.querySelector(`.js-b7`).placeholder='';
        document.querySelector(`.js-b7`).value='';

       }) ;
    
       document.querySelector(`.js-c7`).addEventListener('click',()=>{
        document.querySelector(`.js-c7`).placeholder='';
       }) ;
       
