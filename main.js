var currentNode=0;
var nextNodes;
var storydata;
var textmain;
var btnPanel;
var btnOption1, btnOption2, btnOption3;
var displayOriginal=""

function showButton( b ) 
{  
	if(b)
	{
		this.classList.remove("d-none");
	}
	else
	{
		this.classList.add("d-none");
	}
}

function setText(texto)
{
	this.querySelector("div").innerHTML=texto;
	//console.log(texto);
}

window.onload=function(){

	//Al iniciar todo, ocultar textos
	document.getElementById("story_title").style.visibility="hidden";
	document.getElementById("story_tagline").style.visibility="hidden";
	//sconder opciones
	//document.getElementById("botonera").childNodes.forEach( (child)=>{
	//		child.style.visibility="hidden";
	//} )
	textmain=document.getElementById("text-main");
	btnPanel=document.getElementById("botonera");
	btnOption1=document.getElementById("btn1");
	btnOption2=document.getElementById("btn2");
	btnOption3=document.getElementById("btn3");
	//metods extra
	btnPanel.xshow = showButton;
	btnOption1.xshow = showButton;
	btnOption2.xshow = showButton;
	btnOption3.xshow = showButton;
	btnOption1.setText=setText;
	btnOption2.setText=setText;
	btnOption3.setText=setText;
	btnOption1.xshow(false);
	btnOption2.xshow(false);
	btnOption3.xshow(false);

	fetch("./data.json")
	.then( response=> {
		return response.json();
	} )
	.then(jsondata =>{
		storydata=jsondata;
		document.getElementById("story_title").style.visibility="visible";
		document.getElementById("story_tagline").style.visibility="visible";
		document.getElementById("story_title").innerHTML=storydata.story_title;
		document.getElementById("story_tagline").innerHTML=storydata.story_subtitle;
		textmain.innerHTML=storydata.instr;
		btnOption1.xshow(true);
		btnOption1.setText(storydata.instr_button);
		btnOption1.onclick=onStartButton;
	}
		
		);
	//console.log(data);
	document.getElementById("story_title").innerHTML="Hola Mundo";
	document.getElementById("story_tagline").innerHTML="Una historia sobre queso, pan y vino";
	document.getElementById("text-main").innerHTML="Problemas al cargar data.json";
	//Una historia sobre queso, pan y vino.
}

function onStartButton()
{
	console.log("cuac");
	btnOption1.onclick=null;
	currentNode=0;
	//ahora si rellenar historia y primeras opciones
	textmain.innerHTML = storydata.story_nodes[currentNode].text;
	btnPanel.xshow(false);
	nextNodes=storydata.story_nodes[currentNode].next;
	//console.log(nextNodes);
	btnOption1.setText( storydata.story_nodes[nextNodes[0]].text);
	btnOption1.xshow(true);
	btnOption1.onclick=onButton;
	if( storydata.story_nodes[currentNode].next[1] !== undefined ){
		btnOption2.setText( storydata.story_nodes[nextNodes[1]].text);
		btnOption2.xshow(true);
		btnOption2.onclick=onButton;
	}
	if( storydata.story_nodes[currentNode].next[2] !== undefined ){
		btnOption3.setText( storydata.story_nodes[nextNodes[2]].text);
		btnOption3.xshow(true);
		btnOption3.onclick=onButton;
	}

	const revealtimer= setTimeout( ()=>{
		console.log("reveala");
		btnPanel.xshow(true);
	}, 1000);
}

function onButton(clickdata)
{
	btnPanel.xshow(false);
	btnOption1.xshow(false);
	btnOption2.xshow(false);
	btnOption3.xshow(false);
	if(clickdata.target.parentElement == btnOption1)
	{
		//console.log("b1");
		currentNode = storydata.story_nodes[nextNodes[0]].next;
		nextNodes=storydata.story_nodes[currentNode].next;
	}
	else if(clickdata.target.parentElement == btnOption2)
	{
		//console.log("b2");
		currentNode=storydata.story_nodes[nextNodes[1]].next;
		nextNodes=storydata.story_nodes[currentNode].next;
	}
	else if(clickdata.target.parentElement == btnOption3)
	{
		//console.log("b3");
		currentNode=storydata.story_nodes[nextNodes[2]].next;
		nextNodes=storydata.story_nodes[currentNode].next;
	}
	console.log(nextNodes);
	textmain.innerHTML = storydata.story_nodes[currentNode].text;
	console.log(storydata.story_nodes.length);
	if( Array.isArray(nextNodes))
	{
		btnOption1.setText( storydata.story_nodes[nextNodes[0]].text);
		btnOption1.xshow(true);
		btnOption1.onclick=onButton;
		if( storydata.story_nodes[currentNode].next[1] !== undefined ){
			btnOption2.setText( storydata.story_nodes[nextNodes[1]].text);
			btnOption2.xshow(true);
			btnOption2.onclick=onButton;
		}
		if( storydata.story_nodes[currentNode].next[2] !== undefined ){
			btnOption3.setText( storydata.story_nodes[nextNodes[2]].text);
			btnOption3.xshow(true);
			btnOption3.onclick=onButton;
		}
	}
	else if( typeof nextNodes === 'number' )
	{
		btnOption1.setText( storydata.story_nodes[nextNodes].text);
		btnOption1.xshow(true);
		btnOption1.onclick=onButton;
	}
	else
	{
		console.log("finis");
	}

	setTimeout( ()=>{
		console.log("reveala");
		btnPanel.xshow(true);
	}, 1000);
}

