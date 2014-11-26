#pragma strict

var health : int = 200;
var nextFrameTime : float = 0.0;
var animationSpeed : float = 0.1;
var frameOffset : float;
var blowUp : boolean = false;
var speed : int = 2;
var bossShots : Transform;
var nextShot : float;
var manager : Manager_script;

function Start () {
	manager = GameObject.FindGameObjectWithTag("Manager").GetComponent(Manager_script);
}

function Update () {

	
	if(transform.position.y >= 2.2){
		transform.Translate(Vector3(0,(-1) * speed * Time.deltaTime,0));
	}
	

	if(health <= 0){
			Destroy(gameObject);
			manager.thisScore+=1000;
			manager.HighScore();
			Application.LoadLevel(1);

	}
	
	if(transform.position.y <= 2.2){
		frameOffset = renderer.material.mainTextureOffset.y;
		transform.Translate(Vector3(speed * Time.deltaTime,0,0));

			if(Time.time > nextFrameTime){
				frameOffset = frameOffset - 0.025641;
				//normal mode
				if(frameOffset < 0.641026 && health >= 100){
					frameOffset = 0.974359;		
				}
				//blow up
				if(health < 100 && blowUp == false){
					frameOffset = 0.615385;
					blowUp = true;
					speed *= 1.5;
				}
				//rage mode
				if(frameOffset <= 0){
					frameOffset = 0.205129;
				}		
				nextFrameTime = Time.time + animationSpeed;
				renderer.material.mainTextureOffset.y = frameOffset;
			}
	}
	
	if(Time.time > nextShot){
		fire();
		nextShot = Time.time + Random.Range(2.0,5.0);
	}
	
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject.tag == "Left"){
		speed *= (-1);
	}
	if(col.gameObject.tag == "Right"){
		speed *= (-1);
	}	
}


function fire(){
	var shots : int;
	shots = Random.Range(3.0,5.0);
	
	for(var x=0;x<=shots;x++){
		Instantiate(bossShots,Vector3(transform.position.x,transform.position.y - 3,transform.position.z),Quaternion.identity);
	}
}

// frame 0.025641
// frame 1-14
// frame 14
// frame 15-31
// frame 31-39