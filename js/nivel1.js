var jugador;
var plataformas;
var trofeos;
var trofeo1;
var trofeo2;
var trofeo3;
var trofeo4;
var preguntas;
var enemigos;
var cursors;
var puntos = 0;
var dulces;
var vidas = 3;
var terminar = false;
var vidasJuego;
var ban = 0;
var audioP;
var audioPlay;

class nivel1 extends Phaser.Scene{
    constructor() {
        super("nivel1");
    }
  
 
     preload ()
    {
        this.load.image('fondo', 'img/fondoNivel1.png');
        this.load.image('dulce', 'img/dulces.png');
        this.load.image('bomba', 'img/bomba.png');
        this.load.image('trofeo', 'img/trofeo.png');
        this.load.image('vida', 'img/vida.png');
        this.load.image('vida1', 'img/vida1.png');
        this.load.image('ruedita', 'img/rueda.png');
        this.load.image('nunca', 'img/nunca.png');
        this.load.image('casinunca', 'img/casinunca.png');
        this.load.image('pocasveces', 'img/pocasveces.png');
        this.load.image('muchasveces', 'img/muchasveces.png');
        this.load.image('pregunta', 'img/pregunta1.png');
        this.load.image('siempre', 'img/siempre.png');
        this.load.image('pause', 'img/pause.png');
        this.load.image('playI', 'img/play1.png');
        this.load.image('piso', 'img/plataforma1.png');
        this.load.audio("audiopierde","audio/audio2derrota.mp3");
        this.load.audio("play","audio/audio_fondo3.mp3");
        this.load.spritesheet('anima', 'img/sprite.png', { frameWidth: 60, frameHeight: 100 });
    }
    
     create ()
    {
        //Añadir una imagen de fondo
        this.add.image(400, 300, 'fondo');
        // The player and its settings
        jugador = this.physics.add.sprite(100, 450, 'anima');
        plataformas = this.physics.add.staticGroup();
        vidasJuego = this.physics.add.staticGroup();
        
        
        plataformas.create(250,450,"nunca");
        plataformas.create(620,350,"casinunca");
        plataformas.create(150,300,"pocasveces");
        plataformas.create(550,160,"muchasveces");
        plataformas.create(650,550,"siempre");
        audioP = this.sound.add("audiopierde",{loop:false});
        audioPlay = this.sound.add("play",{loop:false});
// 
jugador.setBounce(0.2);
jugador.setCollideWorldBounds(true);
        
        plataformas.create(400,600,"piso").refreshBody();
        enemigos = this.physics.add.group();
        var long = (jugador.x<400)? Phaser.Math.Between(400,800):Phaser.Math.Between(0,400);
        var enemigo = enemigos.create(long,16,"bomba");
        enemigo.setBounce(1);
        enemigo.setCollideWorldBounds(true);
        enemigo.setVelocity(Phaser.Math.Between(-200,200),20);
        vidasJuego.create(690,30,"vida1");
        vidasJuego.create(730,30,"vida1");
        vidasJuego.create(770,30,"vida1");
        
        //  para caminar
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('anima', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'anima', frame: 7 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('anima', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
    
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        dulces = this.physics.add.group({
            key: 'dulce',
            repeat: 10,
            setXY: { x: 30, y: 0, stepX: 70 }
        });
        
        dulces.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(jugador, plataformas);
        this.physics.add.collider(dulces, plataformas);
        this.physics.add.collider(enemigo, plataformas);

        //Cuando chocab
        this.physics.add.overlap(jugador, dulces, this.choque, null, this);
        this.physics.add.collider(jugador,enemigo, this.muerte,null,this);

        this.pause1 = this.add.image(20, 25,'pause').setInteractive();
        this.pause1.setScale(.1);
        this.pause1.on('pointerdown',()=>{
            audioPlay.stop();
            });

        this.play1 = this.add.image(50, 25,'playI').setInteractive();
        this.play1.setScale(.1);
        this.play1.on('pointerdown',()=>{
            audioPlay.play();
            });
    }
    
     update ()
    {
        if (terminar)
        {
            return;
        }
    
        if (cursors.left.isDown)
        {
            jugador.setVelocityX(-160);
            jugador.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            jugador.setVelocityX(160);
            jugador.anims.play('right', true);
        }
        else
        {
            jugador.setVelocityX(0);
            jugador.anims.play('turn');
        }
    
        if (cursors.up.isDown && jugador.body.touching.down)
        {
            jugador.setVelocityY(-340);
        }

        if ((dulces.countActive(true) === 0) && (ban == 0))
                    {
                        preguntas = this.physics.add.staticGroup();
                        preguntas.create(380,30,"pregunta").setScale(.6);
                        trofeos = this.physics.add.staticGroup();
                        trofeo1 = this.physics.add.staticGroup();
                        trofeo2 = this.physics.add.staticGroup();
                        trofeo3 = this.physics.add.staticGroup();
                        trofeo4 = this.physics.add.staticGroup();
                        
                        //trofeo2 = this.physics.add.create(250,410,"ruedita").setScale(.5);
                        trofeos.create(250,410,"ruedita").setScale(.5);
                        trofeo1.create(650,310,"ruedita").setScale(.5);
                        trofeo2.create(150,240,"ruedita").setScale(.5);
                        trofeo3.create(550,120,"ruedita").setScale(.5);
                        trofeo4.create(650,510,"ruedita").setScale(.5);
                        jugador.x = 500;
                        jugador.y = 300;
                        //Cuando chocab
                        this.physics.add.collider(jugador, trofeos, this.choque2, null, this);
                        this.physics.add.collider(jugador, trofeo1, this.choque3, null, this);
                        this.physics.add.collider(jugador, trofeo2, this.choque4, null, this);
                        this.physics.add.collider(jugador, trofeo3, this.choque5, null, this);
                        this.physics.add.collider(jugador, trofeo4, this.choque6, null, this);
                        ban = 1;
                    }
        
    }

    choque (jugador, dulces)
    {
        dulces.disableBody(true, true);
    }
    choque2 ()
    {
        console.log("Eligio -Nunca-")
        this.scene.start('nivel2');
    }
    choque3 ()
    {
        console.log("Eligio -Casi nunca-");
        this.scene.start('nivel2');
    }
    choque4 ()
    {
        console.log("Eligio -Pocas veces-");
        this.scene.start('nivel2');
    }
    choque5 ()
    {
        console.log("Eligio -Muchas veces");
        this.scene.start('nivel2');
    }
    choque6 ()
    {
        console.log("Eligio -Siempre-");
        this.scene.start('nivel2');
    }
    muerte(jugador,enemigos){
        //this.physics.pause();
        //vidasJuego.disableBody(true,true);
        if(vidas==3){
            vidasJuego.create(690,30,"vida");
            
        }else if(vidas==2){
            vidasJuego.create(730,30,"vida");
        }
        else{
            vidasJuego.create(770,30,"vida");
            this.physics.pause();
            audioPlay.stop();
            this.scene.start('perdio');
             
        }
        vidas-=1;
        enemigos.x = 300;
        enemigos.y=20;
    }
}