#pragma strict

var direction : int = 1;
var speed : int = 3;
var distance : float;
var enemy : Transform;
var lastSpawn : float;
var nextSpawn : float;
var manager : Manager_script;
var level : int;
var isOn : boolean = true;
var boss : Transform;
var enemyCreated : Transform;


function Start () {
	manager = GameObject.FindGameObjectWithTag("Manager").GetComponent(Manager_script);
}

function Update () {
	if(isOn){
		transform.Translate(Vector3(direction * speed * Time.deltaTime,0,0));
		if(Time.time > lastSpawn + nextSpawn){
			enemyCreated = Instantiate(enemy, transform.position, Quaternion.identity);
			enemyCreated.GetComponent(Enemy_script).level = level;
			level = manager.ShipCounter();
			lastSpawn = Time.time;
			nextSpawn = Random.Range(1.0,3.0 - (0.2 * level));
		}
	}
	if(level == 6 && isOn == true){
		isOn = false;
		Instantiate(boss,Vector3(0,8,2),Quaternion.identity);
	}
}

function OnCollisionEnter(col : Collision){
	if(col.gameObject.tag == "Left"){
		direction = 1;
	}
	if(col.gameObject.tag == "Right"){
		direction = (-1);	
	}
}
