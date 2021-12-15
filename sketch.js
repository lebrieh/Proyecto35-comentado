var balloon,balloonImage1,balloonImage2;

// **crea aquí la variable base de datos y la variable de posición (aqui es pura variable)
var database, height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  //se crea la base de datos
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  //**aquí es donde se llama la base de datos (como en el paso 4 del proyecto) ejemplo:
  // **esta linea es para conectarnos a la base de datos y decirle qué dato queremos revisar con ".ref": y va la base de datos que quieres accesar ej:
  var globopos= database.ref('balloon/height'); //revisar que los nombres sean los correctos de tu base de datos estaba como ballon en lugar de balloon n.n
  //**esta linea es para tener un escucha de los datos que llamamos con ref: se usa ".on" con las funciones creadas en el sketch:, faltaba la funcion de readHeight
  globopos.on("value", readHeight, showError);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    update(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
  }
  else if(keyDown(RIGHT_ARROW)){
    update(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
  }
  else if(keyDown(UP_ARROW)){
    update(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.01;
    //escribe el código para mover el globo aerostático en dirección ascendente
  }
  else if(keyDown(DOWN_ARROW)){
    update(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.01;
    //escribe el código para mover el globo aerostático en dirección descendente
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}

function update(x,y){
  //llamar base de dator
  database.ref('balloon/height').set({
    //actualización de la base de datos:
    'x':height.x +x,
    'y':height.y + y
  })
}

//aqui se crea la funcion para sacar los datos de la base y darselos a la posicion del globo, era la función que faltaba:
function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("error al escribir en la base de datos")
}