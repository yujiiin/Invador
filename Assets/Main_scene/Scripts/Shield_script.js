#pragma strict

var speed : int = 3;

function Start () {

}

function Update () {
	transform.Translate(Vector3(0,(-1) * speed * Time.deltaTime,0));
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject.tag == "Bottom"){
		Destroy(gameObject);
	}

}