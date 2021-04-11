/*GLOBAL VARIABLES*/
var game_counter=1;
var random=new Array;
var pos_of_true=[];
var yelow_counter=0;
/*global variables for counting of inputs*/
var colors=["assets/icons/skocko.png","assets/icons/skocko.png","assets/icons/herz.png","assets/icons/karo.png","assets/icons/pik.png","assets/icons/treff.png","assets/icons/treff.png"];
window.onload=random_init;
var j="url('"+colors[2]+"')";
/*initializing background images of chooses*/
var selections= new Array;
for(x=0;x<7;x++){
	selections[x]={
	name: "selection_"+x,
	color:colors[x]
	}
for(x in selections){
	var color_url=color_to_url(selections[x].color);
	var name=name_to_query_name(selections[x].name);
	$(name).css("background-image",color_url);
}
}
/*initializing object of Choosen objects*/
	var choosen=new Array;
	for(x=0;x<25;x++){
		choosen[x]={
			name:"put_"+x,
			color:"blue"
		}
	}
/*intializing object for guessed colors[right table]*/
var guessed_4_colors=new Array;
	for(x=0;x<25;x++){
		guessed_4_colors[x]={
			name:"color_"+x,
			color:"blue"
		}
	}
/*initializing 4 random objects*/
function random_init(){
	for(let x=1;x<5;x++){
		///generating some colors
		// var rand;
		// while(rand===undefined){
		// 	rand=Math.floor((Math.random()*10)%5);
		// }
		var rand=Math.floor(((Math.random()*10)%5)+1);
		///console.log("Rand iznosi: "+rand+"\n");
		random[x]={
			name:"random_obj_"+x,
			color:colors[rand]
		}
		console.log("rand colors are:"+random[x].color);
	}
	///stops undefined rand color
		init_objects_right();
		fill_true_colors();
}
/*			FILLING OBJECTS WHO ARE RIGHT WITH RANDOM 				*/
function init_objects_right(){
	var x,y;
	for(x=1;x<25;x++){
		if(x%4==0)
			y=4;
		else y=x%4;
		guessed_4_colors[x].color=random[y].color;
	}
}
function fill_true_colors(){
	for(x=1;x<=4;x++){
		let m=color_to_url(random[x].color);
		let j=name_to_query_name("t_c_");
		$(j+x).css("background-image",m);
		///alert(j+x+":"+m);
	}
}
/*FUNCTION WHICH SUPOSE TO CHECK WINNER*/
// 
/*finally filling colours*/
function filling_colours(color1,color2){
	var red,yellow;
	red=color1;
	yellow=color2;
	var c=red;
	var start=game_counter-3;
	console.log("yellow iznosi: "+yellow);
	console.log("\n crvena iznosi :"+c+"\n");
	for(x=start;x<start+red;x++){
				$(name_to_query_name("color_")+x).css("background-color","red");
				console.log("crvena: "+red+"\n");
			}
	for(x=start+red;x<start+red+yellow;x++){
			$(name_to_query_name("color_")+x).css("background-color","yellow");
			console.log("zuta : "+yellow+"\n");
	}
	yelow_counter=0;
}

/*winner functionn*/
function winner(){
	alert("pobjeda");
}
/*function from color object to url*/
function color_to_url(color){
	return "url('"+color+"')";
}
/*function which filling query name from object name*/
function name_to_query_name(name){
	return "#"+name;
}
function fill_div(div_id){
	for(let x in selections){
		if(selections[x].name===div_id){
			$(name_to_query_name(choosen[game_counter].name)).css("background-image",color_to_url(selections[x].color));
			choosen[game_counter].color=selections[x].color;
		}
	}
	if(!(game_counter%4)){
		check_true();
	}
	game_counter++;
}
var count_same=0;
var yellow_sum=0;
var yellow_array=[];
function check_true(){
	///console.log("game counter iznosi: "+game_counter+"\n");
	for(let x=game_counter-3;x<=game_counter;x++){
		if(x===game_counter-3){
			if(choosen[x].color===guessed_4_colors[x].color)
				pos_of_true.push(x);
			else{
				for(let s=game_counter-3;s<=game_counter;s++){
					if(choosen[x].color===guessed_4_colors[s].color && choosen[s].color!==guessed_4_colors[s].color){
						console.log("usao u prvi if kad je jednako 1");
						yellow_sum+=1;
						yellow_array.push(x);
						break;
					}
				}
			}
		}
		else{
			if(choosen[x].color===guessed_4_colors[x].color)
				pos_of_true.push(x);
			else{
				for(let s=game_counter-3;s<=game_counter;s++){
					if(choosen[x].color==choosen[s].color && x!=s){
						count_same++;
						///alert("brojac povecan!");
					}
				}
				for(let s=game_counter-3;s<=game_counter;s++){
					if(choosen[x].color===guessed_4_colors[s].color){
						if(!count_same){
							yellow_sum+=1;
							yellow_array.push(x);
							console.log("usao ovamo regularno da poveca");
							count_same-=1;
						}
						else count_same-=1;
					///console.log("yellow is: "+yellow_sum+"\n");
					}
				}
			count_same=0;
			}
		}
	}
	yellow_sum=0;
	filling_colours(pos_of_true.length,yellow_array.length);
	yellow_array=[];
	pos_of_true=[];
}
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// 								MAINE POKUSAJ 
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// function fill_div(div_id){
// 	//console.log("id diva je : "+div_id+" \n");
// 	for(let x in selections){
// 		if(selections[x].name===div_id){
// 			$(name_to_query_name(choosen[game_counter].name)).css("background-image",color_to_url(selections[x].color));
// 			choosen[game_counter].color=selections[x].color;
// 			console.log("unio si: "+selections[x].color+"\n");
// 			//console.log("choosen["+game_counter+"] bi trebalo da bude:"+choosen[game_counter].color+"\n");
// 			/*if are filled all 4*/
// 			if(!(game_counter%4))
// 				true_check();
// 			else pos_of_true=[];
// 			game_counter+=1;
// 		}
// 	}
// }
// /*check if are or not same as random*/
// function true_check(){
// 	var pos=game_counter;
// 		///console.log(pos);
// 	check_same(pos);
// 	//console.log("pozicija je: "+pos+"\n");
// return pos;
// }
// function check_same(pos){
// 	for(x=pos;x>pos-4;x--){
// 		check_for_red(x);
// 	}
// 	if(pos_of_true.length===4){winner();}
// 	else check_same_in_not_good_pos();
// }
// /*check if same 2 elements*/
// function check_for_red(position){
// 	let x=position;
// 	///console.log("proslijedio je :"+x+"\n");
// 	let r;
// 	if(!(x%4))
// 		r=4;
// 	else r=x%4;
// 	if(choosen[x].color===random[r].color){
// 		pos_of_true.push(r);
// 		console.log("isti su!");
// 		return true;
// 	}
// 	else return false;
// }
// var t_y;
// function check_same_in_not_good_pos(){
// 	if(pos_of_true.length==2){
// 		for(let x=game_counter-3;x<game_counter;x++){
// 			for(let y=game_counter-3;y<game_counter;y++){
// 				if(!(y%4))
// 					t_y=4;
// 				else t_y=y%4;
// 				if(((x!=y && x!=pos_of_true[0])&&(x!=pos_of_true[1]))&&((y!=pos_of_true[0])&&(y!=pos_of_true[1]))){
// 					if (choosen[x].color===random[t_y].color){
// 						yelow_counter++;
// 						console.log(x);
// 					}
// 				}
// 			}
// 		}
// 	filling_colours(pos_of_true.length,yelow_counter);
// 	}
// 	if(pos_of_true.length==3){
// 		filling_colours(pos_of_true.length,0);	
// 	}
// 	if(pos_of_true.length==1){


// 	}
// }
// -----------------------------------------------------------------------------------
// 					NESTO STARIH POKUSAJA
// -----------------------------------------------------------------------------------
// if(!(red+1) && !(yellow+1)) {
// 				console.log("usao u plavu \n");
// 				///$(name_to_query_name("color_")+x).css("background-color","blue");
// 			}
// function check_same_in_not_good_pos(){
// 	var pos=game_counter;
// 	var trx;
// 	var tr_y;
// 	/*if 1 is true there are 3 possibility to are true but not good position*/
// 	if(pos_of_true.length==1){
// 		for(let x=pos-3;x<pos;x++){
// 			if(!(pos%4))
// 				trx=4;
// 			else trx=pos%4;
// 			if(trx!=pos_of_true[0]){
// 				for(let y=pos-3;y<pos;y++){
// 					if(!(pos%4))
// 						tr_y=4;
// 					else tr_y=pos%4;
// 					if(x!=y && tr_y!=pos_of_true[0]){
// 						if(choosen[x].color===random[x].color)
// 							if(choosen[x].color!=choosen[x+1].color && choosen[x].color!=choosen[x+2]){
// 							yelow_counter++;
// 							x++;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }
// function start(){
// 	var chooses_color=document.getElementById('selection_');
// 	var back;
// 	for(var x=1;x<7;x++){
// 		var color_url="url('"+colors[x-1]+"')";
// 		$("#selection_"+x).css("background-image",color_url);
// 		back=color_url;
// 	}
// return back;
// }