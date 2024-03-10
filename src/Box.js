import * as THREE from 'three';

export class Box extends THREE.Mesh{
    constructor({width,height,depth,color='#00ff00',velocity={x:0,y:0,z:0}, position={x:0,y:0,z:0}})
    {
    super(
        new THREE.BoxGeometry(width,height,depth),
        new THREE.MeshLambertMaterial({color:color})
        );
        this.height=height;
        this.width=width;
        this.depth=depth;

        this.position.set(position.x,position.y,position.z)
        
        this.bottom=this.position.y-this.height/2;
        this.top=this.position.y+this.height/2;

        this.velocity=velocity
        
    }

update(ground){

    this.bottom=this.position.y-this.height/2;
    this.top=this.position.y+this.height/2;
    
    //updating velocity to include acceleration
    this.velocity.y+=-0.005;
        
    if(this.bottom+this.velocity.y<=ground.top)
    {
        this.velocity.y=-this.velocity.y;
    }
    else
    {
        this.position.y+=this.velocity.y;
    }
}

}