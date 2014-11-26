#pragma strict

var speed : int = 2;
var shot : Transform;
var level : int;
var nextShot : float = 0;
var fireRate : float = 3;
var offset : Vector3 = Vector3(0,-0.85,0);

function Start () {

}

function Update () {
	transform.Translate(Vector3(0,(-1) * speed * Time.deltaTime,0));
	
	if(level > 1 && Time.time > nextShot){
		shoot();
		nextShot = Time.time + fireRate;
	}
	if(level > 3 && Time.time > nextShot){
		shoot();
		nextShot = Time.time + fireRate/2;
	}
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject.tag == "Bottom"){
		Destroy(gameObject);
	}
}

function shoot(){
	Instantiate(shot,transform.position + offset,Quaternion.identity);
}