
numTimes = 0; 
var x = new Boolean(false);
var myVar= setInterval(startClock, 1000);
var selectionFunc= setInterval(checkSelect, 41);

var xPos =0; 
var yPos =0; 
var zPos =0;

var totalBalls =0;
var currentSelected = "newid"+ totalBalls.toString();
var idName = "newid"+ totalBalls.toString();
function getRandomInt() {
  return Math.floor(Math.random() * 5);
}


  document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        console.log('Space pressed')
  
        var sceneEl = document.querySelector('a-scene');
        /**create new object */
        var entityEl = document.createElement('a-entity'); 
        
        xPos = getRandomInt();
        yPos = getRandomInt();
        zPos = getRandomInt();
        /** set attributes to it so it is not empty */
        entityEl.setAttribute('geometry', {primitive: 'sphere', radius:1.5 },  true);
        entityEl.setAttribute('material', {src: 'assets/Earth.jpg'});
        entityEl.setAttribute('position', {x: xPos, y: yPos, z: zPos});
        totalBalls= totalBalls+1;
        idName = "newid"+ totalBalls.toString();
        entityEl.id = "newid"+ idName;
        entityEl.class = "interactive";
        /**append it to the document */
        sceneEl.appendChild(entityEl);
      }

    })

  window.addEventListener('load', (event) => {
    x = true;
  });
  
var sec=0;


document.addEventListener('keyup', event => {
  if (event.code === 'KeyZ') {
    console.log('Z pressed')
    if(totalBalls >0 ){
      var sceneEl = document.querySelector('a-scene');
      idName = "newid"+ totalBalls.toString();
      var entityEl = document.getElementById(idName)
      entityEl.parentNode.removeChild(entityEl);
      totalBalls= totalBalls-1;
    }

  }
})

function startClock(){
    sec=sec+1;
    console.log(sec);
    console.log("hello!");
}   

'use strict'

AFRAME.registerComponent('ball-effect',{
    schema: {
        duration: {type: 'number', default:20000}
    },

    init : function(){
        //setup in Openframeworks 
        //only called once 

        const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
       
        CONTEXT_AF.el.addEventListener('click', function(){
  
          var sceneEl = document.querySelector('a-scene');
          /**create new object */
          var entityEl = document.createElement('a-entity'); 
          
          xPos = getRandomInt();
          yPos = getRandomInt();
          zPos = getRandomInt();

          entityEl.setAttribute('gltf-model', "#mushroom_model1");
          entityEl.setAttribute('scale', "0.01 0.01 0.01");
          entityEl.setAttribute('position', {x: xPos, y: yPos, z: zPos});
          entityEl.setAttribute('pick-up');
          totalBalls= totalBalls+1;
          idName = "newid"+ totalBalls.toString();
          entityEl.id = idName;

          sceneEl.appendChild(entityEl);
          document.getElementById(idName).setAttribute('pick-up', '');
          document.getElementById(idName).setAttribute('class', 'interactive');
          //now it moves towards you, but only 1
       });

    }
    
});


AFRAME.registerComponent('move-effect',{
  schema: {
      duration: {type: 'number', default:20000}
  },

  init : function(){
      //setup in Openframeworks 
      //only called once 
      var sceneEl = document.querySelector('a-scene');
      const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
     
      CONTEXT_AF.el.addEventListener('click', function(){
        
        if(totalBalls >0 ){
          var sceneEl = document.querySelector('a-scene');
          idName = "newid"+ totalBalls.toString();
          var entityEl = document.getElementById(idName)
          entityEl.parentNode.removeChild(entityEl);
          totalBalls= totalBalls-1;
        }
    
     });

  }
  
});


function checkSelect(){
  var sceneEl = document.querySelector('a-scene');
  var nameToSelect= '#'+currentSelected.toString();
  var currentSelectObj = sceneEl.querySelector(nameToSelect);
  var CAMERA = sceneEl.querySelector('#mainCamera')

  //if nothing is selected
 if( currentSelected === "newid0"){

    for (let i = 1; i <= totalBalls; i++) {
      var ballId= "#newid"+ i.toString();
      var noneSelected= sceneEl.querySelector(ballId);
      console.log("ballId is");
      console.log(ballId);

        var yPosition= noneSelected.object3D.position.y;
        //check the mushrooms to see if it is on the ground
        if(yPosition>0){
          noneSelected.object3D.position.y-=0.1;
        }
        else
        {
          noneSelected.object3D.rotation.y += 0.009;//if it is on the ground, spin 
        }

    }
 }
 else{  
    //if something is selected
    var X= CAMERA.object3D.position.x
    var Y= CAMERA.object3D.position.y;
    var Z= CAMERA.object3D.position.z; 
    X = X + 1.7; 
    Z = Z - 4; 

    currentSelectObj.setAttribute('position', {x: X, y: Y, z: Z});

    console.log(totalBalls);

    for (let i = 1; i <= totalBalls; i++) {
      var ballId= "#newid"+ i.toString();
      var noneSelected= sceneEl.querySelector(ballId);

      if(nameToSelect!==ballId){

        noneSelected.setAttribute('rotation', '0 0 0');

        var yPosition= noneSelected.object3D.position.y; 
        if(yPosition>0){
          noneSelected.object3D.position.y-=0.1;//if it is not on the ground yet, drop
        }

      }
      else{
        currentSelectObj.setAttribute('rotation', '-45 0 0');//if it being picked up move it to a 45 degree angle 
      }
    }

 }
}   

function followMouse(){
  sec=sec+1;

}   

AFRAME.registerComponent('pick-up',{
  schema: {
      duration: {type: 'number', default:20000}
  },

  init : function(){
      //setup in Openframeworks 
      //only called once 
      var sceneEl = document.querySelector('a-scene');
      var mouseEl = document.querySelector('#cursorObj').object3D;
      var CAMERA = sceneEl.querySelector('#mainCamera')

      const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
      
      CONTEXT_AF.isSpinning =false; 
     
     CONTEXT_AF.el.addEventListener('click', function(evt){
      console.log("click");

      if(CONTEXT_AF.isSpinning=== true){  
        currentSelected= "newid0";

        this.setAttribute('rotation', '0 0 0');
        //This does not work
        CONTEXT_AF.isSpinning =false;

      }
      else{
        CONTEXT_AF.isSpinning = true;
        currentSelected= this.id;
      }

      
   });


  }
  
});


AFRAME.registerComponent('move-forwards',{
  schema: {
    duration: {type: 'number', default:10}
},

init : function(){
    //setup in Openframeworks 
    //only called once 
    var sceneEl = document.querySelector('a-scene');
    var CAMERA = sceneEl.querySelector('#mainCamera')
    const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
    CONTEXT_AF.el.addEventListener('click', function(){
      //Move the camera forwards 
      CAMERA.object3D.position.z -= 3.0;
      console.log("CLICK");
   });

}
  
});

AFRAME.registerComponent('move-left',{
  schema: {
      duration: {type: 'number', default:10}
  },

  init : function(){
      //setup in Openframeworks 
      //only called once 
      var sceneEl = document.querySelector('a-scene');
      var CAMERA = sceneEl.querySelector('#mainCamera')
      const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
      CONTEXT_AF.el.addEventListener('click', function(){
        //Move the camera left
        CAMERA.object3D.position.x -= 3.0;
        console.log("CLICK");
     });

  }
  
});


AFRAME.registerComponent('move-right',{
  schema: {
      duration: {type: 'number', default:10}
  },

  init : function(){
      //setup in Openframeworks 
      //only called once 
      var sceneEl = document.querySelector('a-scene');
      var CAMERA = sceneEl.querySelector('#mainCamera')
      const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
      CONTEXT_AF.el.addEventListener('click', function(){
        //Move the camera right
        CAMERA.object3D.position.x += 3.0;
     });

  }
  
});

AFRAME.registerComponent('move-backwards',{
  schema: {
    duration: {type: 'number', default:10}
},

init : function(){
    //setup in Openframeworks 
    //only called once 
    var sceneEl = document.querySelector('a-scene');
    var CAMERA = sceneEl.querySelector('#mainCamera')
    const CONTEXT_AF = this; //this compoment bc this in an a event lisener means smtg else
    CONTEXT_AF.el.addEventListener('click', function(){
      //Move the camera back
      CAMERA.object3D.position.z += 3.0;
      console.log("CLICK");
   });

}
  
});