/*
 This program is free software; you can redistribute it and/or modify it under the terms of the 
 GNU General Public License as published by the Free Software Foundation; either version 2 of 
 the License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 See the GNU General Public License for more details.
 You should have received a copy of the GNU General Public License along with this program; 
 if not, see <https://www.gnu.org/licenses/> or write to the Free Software Foundation, Inc., 
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA. 
*/

var currentNode=0;
var nextNodes;
var textmain;
var btnOption1, btnOption2, btnOption3;
var imagenAdorno;
var displayOriginal=""

var debug=false;

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
	btnOption1=document.getElementById("btn1");
	btnOption2=document.getElementById("btn2");
	btnOption3=document.getElementById("btn3");
	imagenAdorno=document.getElementById("imagen-adorno");
	//metods extra
	btnOption1.xshow = showButton;
	btnOption2.xshow = showButton;
	btnOption3.xshow = showButton;
	btnOption1.setText=setText;
	btnOption2.setText=setText;
	btnOption3.setText=setText;
	btnOption1.xshow(false);
	btnOption2.xshow(false);
	btnOption3.xshow(false);

	if(debug)
	{
		nextNodes=[0,25];
		btnOption2.setText("directo al fin");
		btnOption2.xshow(true);
		btnOption2.onclick=onButton;
	}

	document.getElementById("story_title").style.visibility="visible";
	document.getElementById("story_tagline").style.visibility="visible";
	document.getElementById("story_title").innerHTML=storydata.story_title;
	document.getElementById("story_tagline").innerHTML=storydata.story_subtitle;
	textmain.innerHTML=storydata.instr;
	btnOption1.setText(storydata.instr_button);
	btnOption1.onclick=onStartButton;
	btnOption1.xshow(true);
}

function onStartButton()
{
	sb1=sb2=sb3=false;
	btnOption1.xshow(false);
	btnOption2.xshow(false);
	btnOption3.xshow(false);
	//imagenAdorno.src = "";
	//imagenAdorno.style.visibility="hidden";
	btnOption1.onclick=null;
	currentNode=0;
	//ahora si rellenar historia y primeras opciones
	textmain.innerHTML = storydata.story_nodes[currentNode].text;
	nextNodes=storydata.story_nodes[currentNode].next;
	if(Array.isArray(nextNodes))
	{
		//console.log(nextNodes);
		btnOption1.setText( storydata.story_nodes[nextNodes[0]].text);
		sb1=true;
		btnOption1.onclick=onButton;
		if( storydata.story_nodes[currentNode].next[1] !== undefined ){
			btnOption2.setText( storydata.story_nodes[nextNodes[1]].text);
			sb2=true;
			btnOption2.onclick=onButton;
		}
		if( storydata.story_nodes[currentNode].next[2] !== undefined ){
			btnOption3.setText( storydata.story_nodes[nextNodes[2]].text);
			sb3=true;
			btnOption3.onclick=onButton;
		}
	}
	else //nextnodes es un numero, solo se debe mostrar un boton
	{
		btnOption1.setText( storydata.story_nodes[nextNodes].text);
		sb1=true;
		btnOption1.onclick=onButton;
	}
	const revealtimer= setTimeout( ()=>{
		console.log("reveal btn");
		if(sb1) btnOption1.xshow(true);
		if(sb2) btnOption2.xshow(true);
		if(sb3) btnOption3.xshow(true);
	}, 1000);
}

function onButton(clickdata)
{
	sb1=sb2=sb3=false;
	btnOption1.xshow(false);
	btnOption2.xshow(false);
	btnOption3.xshow(false);
	btnOption1.onclick=null;
	if(clickdata.target.parentElement == btnOption1)
	{
		//console.log("b1");
		if(Array.isArray(nextNodes))
			currentNode = storydata.story_nodes[nextNodes[0]].next;
		else
			currentNode = storydata.story_nodes[nextNodes].next;
		nextNodes=storydata.story_nodes[currentNode].next;
		img=storydata.story_nodes[currentNode].img;
	}
	else if(clickdata.target.parentElement == btnOption2)
	{
		//console.log("b2");
		currentNode=storydata.story_nodes[nextNodes[1]].next;
		nextNodes=storydata.story_nodes[currentNode].next;
		img=storydata.story_nodes[currentNode].img;
	}
	else if(clickdata.target.parentElement == btnOption3)
	{
		//console.log("b3");
		currentNode=storydata.story_nodes[nextNodes[2]].next;
		nextNodes=storydata.story_nodes[currentNode].next;
		img=storydata.story_nodes[currentNode].img;
	}
	textmain.innerHTML = storydata.story_nodes[currentNode].text;
	if(img!=undefined)
	{
		console.log("imagen "+img);
		imagenAdorno.style.backgroundImage="url("+img+")";
		//imagenAdorno.style.visibility="visible";
	}
	else
	{
		imagenAdorno.style.backgroundImage="";
		//imagenAdorno.style.visibility="hidden";
	}

	if( Array.isArray(nextNodes))
	{
		btnOption1.setText( storydata.story_nodes[nextNodes[0]].text);
		sb1=true;
		btnOption1.onclick=onButton;
		//ocultar botones si no hay next 1 y 2
		if( storydata.story_nodes[currentNode].next[1] !== undefined ){
			btnOption2.setText( storydata.story_nodes[nextNodes[1]].text);
			sb2=true;
			btnOption2.onclick=onButton;
		}
		if( storydata.story_nodes[currentNode].next[2] !== undefined ){
			btnOption3.setText( storydata.story_nodes[nextNodes[2]].text);
			sb3=true;
			btnOption3.onclick=onButton;
		}
	}
	else if( typeof nextNodes === 'number' )
	{
		if(storydata.story_nodes[nextNodes].fin )
		{
			//btnOption1.onclick=onStartButton;
			btnOption1.onclick=function(){
					location.reload();
			}
			sb1=true;
			btnOption1.setText("Volver a empezar");
		}
		else
		{
			btnOption1.setText( storydata.story_nodes[nextNodes].text);
			sb1=true;
			btnOption1.onclick=onButton;
		}	
	}
	setTimeout( ()=>{
		console.log("boton reveal");
		if(sb1) btnOption1.xshow(true);
		if(sb2) btnOption2.xshow(true);
		if(sb3) btnOption3.xshow(true);
	}, 900 + Math.random()*200);
}

//This work is licensed under a Creative Commons Attribution-NonCommercial 2.0 Generic License.
//Esta obra est?? bajo una Licencia Creative Commons Atribuci??n-NoComercial 2.0 Gen??rica.
storydata={
	"story_title":"Buscando a Helena",
	"story_subtitle":"Una experiencia interactiva sobre la desaparici??n de mujeres en <span style=\"color:var(--color-ansi-red-bright)\">M??xico</span>",
	"instr":"Buscando a Helena es una experiencia interactiva que busca retratar el infortunio que miles de madres y padres experimentan durante la desaparici??n de una hija.<br><br>Este juego no tiene como fin banalizar las miles de desapariciones y feminicidios que se est??n llevando a cabo en M??xico.  El objetivo de esta experiencia interactiva es ilustrar las dificultades que presentan los familiares al tratar de buscar sus seres queridos y c??mo esta b??squeda muchas veces es dificultada por las mismas autoridades.",
	"instr_button":"Comienza haciendo click aqu??",
	"story_nodes":[
		{"id":0, "next":1,
		"text":"Eres una mujer  de alrededor de 50 a??os. Llevas ropa de dormir y te encuentras sentada en la sala de estar de tu casa.  Tu atenci??n se concentra en el reloj colocado a unos metros de ti.  Te das cuenta que Helena no ha regresado a casa. Ella te hab??a dicho que iba a ir a una fiesta con una amiga, pero que regresar??a a las doce.<br><br>El reloj marca las dos de la ma??ana."},
		{"id":1, "next":2,
		"text":"Siguiente"},
		{"id":2, "next":[3,4,5],
		"text":"Te levantas y comienzas a caminar en c??rculos. Repites en silencio la hora acordada en la que iba a llegar Helena.  Notas que unas gotas de sudor comienzan a resbalar de tu frente.  ???Helena no suele llegar tan tarde, algo est?? pasando???, dice una voz en tu interior. Te detienes unos minutos, antes de continuar ese hilo de pensamiento. ???Estoy exagerando???, dice otra voz dentro de ti, hasta que te detienes.<br><br>??Qu?? haces?"},
		{"id":3, "next":6,
		"text":"Enciendes la cafetera."},
		{"id":4, "next":22,
		"text":"Le marcas a una amiga de Helena"},
		{"id":5 , "next":40,
		"text":"Le marcas a Helena"},
		{"id":6 , "next":[7,8],
		"text":"Te diriges hacia la cocina. Pones agua en la cafetera y una vez que est?? listo el caf??, lo viertes en tu taza.  Notas que el caf?? est?? m??s oscuro que  de costumbre y recuerdas que probablemente de ese color est?? el cielo que Helena est?? mirando en estos momentos. Sola, en un lugar que desconoces.<br><br>??Qu?? haces?"},
		{"id":7,"next":9,
		"text":"Sales a buscar a tu hija"},
		{"id":8,"next":22,
		"text":"Le marcas a una amiga de Helena"},
		{"id":9 ,"next":10,
		"text":"Tomas un abrigo, las llaves y abres la puerta.  La noche se abre frente a ti sin previo aviso. Las l??mparas de la calle destilan una luz que te hace temblar y no sabes el por qu??. "},
		{"id":10 ,"next":11,
		"text":"Siguiente"},
		{"id":11 ,"next":12, "img":"11.avif",
		"text":"Intentas detener a algunas personas que te encuentras en tu camino y cuando menos lo esperas, est??s en una calle que no conoces. Piensas en caminar unas cuadras m??s, pero la idea de que Helena tal vez ya haya regresado te detiene. As?? que decides volver."},
		{"id":12 ,"next":13,
		"text":"Regresas a casa"},
		{"id":13 ,"next":14,
		"text":"De vuelta a casa, miras una vez m??s el reloj. Han pasado m??s de tres horas desde que Helena no ha regresado."},
		{"id":14 ,"next":15,
		"text":"Llamas a la polic??a"},
		{"id":15 ,"next":16,
		"text":"<p>Marcas al 911 en tu tel??fono. Contesta una grabadora:</p><p>???Est?? llamando al 911 por favor, espere un momento, un operador la atender??.???</p><p>Pasan los instantes.</p><p>Quieres colgar, pero la ausencia de Helena te persigue. Ella no ha regresado, ??por qu?? no ha regresado?</p>"},
		{"id":16 ,"next":17,
		"text":"Siguiente"},
		{"id":17 ,"next":18,
		"text":"<p>Est??s a punto de colgar, cuando una voz te responde desde el otro lado de la l??nea.</p><p>???Hola, acaba de llamar al 911. ??Cu??l es su emergencia? ???dice el operador con un tono que te hace sentir fr??o. </p><p>???Hola. Llamo porque no ha llegado mi hija Helena. Estoy muy asustada, ella no...</p><p>?????Nombre completo de su hija? </p><p>???Oh, su nombre es Helena Gonz??lez. Por favor, yo no s?? qu?? hacer y...</p><p>???Se??ora ???interrumpe una vez m??s el operador ???. Ante todo, tiene que conservar la calma, no se agite. ??Cu??nto tiempo lleva desaparecida su hija?</p><p>???Lleva m??s de tres horas. Ap??rense, por favor. Ella no suele ser as??. Es una chica muy centrada.</p><p>???Se??ora, lamentamos mucho su caso. Pero ninguna persona se puede considerar desaparecida a menos que lleve 24 horas sin contacto con alg??n familiar. </p><p>???Pero, ??no me ha escuchado? Ella no suele ser as??. Es una chica muy tranquila. S??lo sali?? de fiesta. </p><p>???Lo lamentamos mucho, pero no se puede hacer nada. Llame dentro de 24 horas.</p><p>La comunicaci??n se interrumpe y vuelves al sonido de la l??nea intermitente, como un martilleo. </p>"},
		{"id":18 ,"next":19,
		"text":"Siguiente"},
		{"id":19 ,"next":21,"img":"19.gif",
		"text":"Vas al cuarto de Helena. Observas los peluches que tiene sobre su cama. Recuerdas su af??n por coleccionarlos, los nombres tan rid??culos que les pon??a y unas l??grimas rondan por tus mejillas. <br><br>Sin darte cuenta, las horas pasan. El reloj de la sala marca las ocho de la ma??ana.<br><br>Desde esa hora, te das cuenta que Helena ya no va a regresar.<br><br><center><h2>FIN</h2></center>"},
		{"id":20 ,"next":21,
		"text":"unido con 19"},
		{"id":21 , "fin":true,
		"text":"<center>FIN</center>"},
		{"id":22 ,"next":23,"img":"22.avif",
		"text":"Recuerdas que Helena te dej?? un papelito con el n??mero de una de sus amigas sobre el bur?? de la sala. Corres hacia ese mueble, encuentras el papel y digitas los n??meros."},
		{"id":23 ,"next":24,
		"text":"Siguiente"},
		{"id":24 ,"next":25,
		"text":"Comienza a sonar la l??nea, pero nadie responde del otro lado. Piensas que tal vez es in??til, que deber??as salir, preguntar de calle en calle y...<br><br>?????Hola? ??Qui??n es? ???dice la voz de una mujer joven al otro lado de la l??nea."},
		{"id":25 ,"next":26,
		"text":"Siguiente"},
		{"id":26 ,"next":[27,31],
		"text":"<p>?????Eres amiga de Helena? ??Helena est?? contigo? ???dices en un s??lo respiro, como si temieras que en cualquier momento, ella tambi??n desapareciera. </p><p>???Si no me dices qui??n eres voy a colgar. </p><p>???Oh, perd??n, perd??name mucho ???comienzas a decirle, con un dolor en el pecho que empieza a punzarte. Pero eso no te detiene???. Soy yo... la madre de Helena. Perd??n por llamarte a estas horas de la noche. Pero ella no ha llegado a casa. ??Sabes d??nde est???</p><p>???Ah, Helena??? </p><p>Notas como al s??lo pronunciar su nombre, el tono de voz de aquella joven cambia.</p><p>??? ??Le dijo que estaba conmigo? ???pregunt??.</p><p>???S??, me dijo que hab??a ido a visitarte, que juntas iban a ir a un baile y???</p><p>???S??, Helena y yo fuimos a una fiesta, pero eso ya tiene como tres horas. Al final, ambas nos fuimos caminos aparte. No sabr??a decirle algo m??s, se??ora.</p><p>?????Sabes a qu?? hora fue eso? </p><p>???Mmm??? ???la voz de la amiga se vuelve otra vez dubitativa??? No sabr??a decirle, tal vez como a las once o doce. No recuerdo muy bien. </p><p>?????A las once? ??Eso fue hace m??s de cuatro horas! ??Helena ya tendr??a que haber llegado a casa! ??En serio no est?? contigo?<br><br>Silencio."},
		{"id":27 ,"next":28,
		"text":"Insistes. Sabes que la amiga de Helena est?? ocultando algo y no te lo quiere decir."},
		{"id":28 ,"next":29,
		"text":"<p>???Se??ora, ya le dije todo. No es mi culpa que no conozca a su hija.</p><p>?????De qu?? hablas? ??Insin??as que debo saber algo? Por favor, dime, yo s??lo quer??a...</p><p>La amiga de Helena te cuelga el tel??fono.</p>"},
		{"id":29 ,"next":30,
		"text":"Siguiente"},
		{"id":30 ,"next":14,
		"text":"Te has dado cuenta que han pasado m??s de cuatro horas desde que Helena se fue. No responde a su tel??fono y nadie sabe su paradero. No te queda otra opci??n."},
		{"id":31 ,"next":33,
		"text":"Le pides a la amiga de Helena que te mande mensaje por si sabe algo de ella y te despides."},
		{"id":32 ,"next":33,
		"text":"Siguiente"},
		{"id":33 ,"next":34,"img":"33.avif",
		"text":"Te sirves un caf?? y enciendes el televisor, pero no prestas atenci??n a ninguno de los canales. A cada oportunidad que tienes miras hacia el reloj de la sala. Cuentas los segundos, los minutos que prontamente se transforman en otra hora en la que Helena no est?? aqu??. Tu atenci??n se concentra en esa rutina.<br><br>Hasta que el tel??fono suena."},
		{"id":34 ,"next":35,
		"text":"Siguiente"},
		{"id":35 ,"next":36,
		"text":"<p>?????Bueno? ??Helena, eres t??? ???preguntas con una semilla de esperanza dentro de tu pecho.</p><p>???Hola, soy yo, la amiga de Helena. Hablamos hace unos minutos.</p><p>?????Sabes d??nde est?? Helena? Por eso me llamaste, ??verdad? Por favor, dime...</p><p>???No s?? d??nde est?? Helena, pero estuve preguntando. Al parecer la vieron con un chico.</p><p>?????Un chico? Helena no ten??a novio. ??Sabes algo m??s?</p><p>???No, es todo lo que s??. Bueno...</p><p>?????Qu?? pasa? Dime, dime por favor.</p><p>???La llevaban cargando. Estaba muy borracha.</p><p>???Pero, ??qui??n es este tipo? ??A d??nde la llev???</p><p>???No lo s??, se??ora. Es todo lo que pude averiguar, lo siento.</p><p>???Pero no me puedes dejar as??, por favor. ??Tienes que saber algo m??s de mi Helena! ??La he estado esperando desde hace horas y...</p><p>???Se??ora, lo siento. No puedo hacer nada ???escuchas su voz mientras dice est??s palabras, sientes que realmente est?? apenada contigo.</p><p>Aunque no te importa. Sabes que hay algo mal. Nada cuadra con lo que ella te dijo.</p><p>Cuelgas.</p>"},
		{"id":36 ,"next":37,
		"text":"Llamas a la polic??a"},
		{"id":37 ,"next":38,
		"text":"Marcas el 911 en tu tel??fono. Contesta una grabadora:<p>???Est?? llamando al 911 por favor, espere un momento, un operador la atender?????</p><p>Pasan los instantes.</p><p>???Bueno, ??cu??l es su emergencia? ???dice el operador con un tono que te hace sentir fr??o.</p><p>???Hola. Llamo porque no ha llegado mi hija Helena. Estoy muy asustada, ella no...</p><p>?????Nombre completo de su hija? </p><p>???Oh, su nombre es Helena Gonz??lez. Por favor, yo no s?? qu?? hacer y...</p><p>???Se??ora ???interrumpe una vez m??s el operador ???. Ante todo, tiene que conservar la calma, no se agite. ??Cu??nto tiempo lleva desaparecida su hija?</p><p>???Lleva m??s de cuatro horas. Ap??rense, por favor. Ella no suele ser as??. Es una chica muy centrada.</p><p>???Se??ora, lamentamos mucho su caso. Pero ninguna persona se puede considerar desaparecida a menos que lleve 24 horas sin contacto con alg??n familiar.</p><p>?????No me ha escuchado? Ella no suele ser as??. Justo habl?? con una de sus amigas. ??Dice que un tipejo se la llev?? cargando a no s?? d??nde! Por favor, haga algo.</p><p>???Se??ora, no pierda la calma. Seguramente se fue con el novio. Muchas jovencitas hacen eso.</p><p>?????Ella no ten??a ning??n novio! De ser as??, me lo hubiera dicho.</p><p>???No podemos hacer nada hasta que pasen 24 horas. Lo sentimos, pero as?? es el protocolo. Llame dentro de 24 horas.</p><p>???No, por favor. ??Hagan algo! ??Deben hacer algo!</p><p>???Lo sentimos, se??ora.</p><p>El operador cuelga y vuelves al sonido de la l??nea intermitente, como un martilleo.</p>"},
		{"id":38 ,"next":39,
		"text":"Siguiente"},
		{"id":39 ,"next":21,
		"text":"Miras el reloj y te das cuenta que faltan m??s de 12 horas para que puedas reportar a tu hija como desaparecida. Sin decir otra palabra o marcar otro n??mero de tel??fono, te sientas en la sala y esperas. <br><br>Pero en el fondo sientes que algo no est?? bien. Sientes que Helena ya nunca regresar??.<br><br>No est??s equivocada."},
		{"id":40 ,"next":41,"img":"40.avif",
		"text":"Terminas de teclear los d??gitos en el tel??fono, cuando un sonido de espera comienza a responderte del otro lado de la l??nea. "},
		{"id":41 ,"next":42,
		"text":"Siguiente"},
		{"id":42 ,"next":[4,43],
		"text":"<p>Un tintineo.</p><p>Piensas que ??sta no ser??a la primera vez que Helena  tarda en comunicarse.</p><p>Dos tintineos. </p><p>Ya lo ha hecho otras veces, todas las jovencitas lo hacen.</p><p>Tres tintineos. </p><p>Cuando me conteste no me voy a enojar, todas hemos estado all?? alguna vez??? </p><p>Cuatro tintineos. </p><p>Ella es as??, siempre ha sido as?? y nunca le ha importado lo que piensen los dem??s.</p><p>Cinco tintineos.</p><p>A veces podr??a decir que es una soberbia, una arrogante, no le importa lo que yo sienta.</p><p>Seis tintineos. </p><p>Espero se encuentre bien.</p><p>Siete tintineos. </p><p>??Puta madre, que contestes!</p><p>SILENCIO</p><p>Se escucha la voz de buz??n de voz: Hola, soy Helena. Si escuchas esto d??jame un mensaje y no tardar?? en llamarte de vuelta.</p>"},
		{"id":43 ,"next":44,
		"text":"Dejas un mensaje de voz"},
		{"id":44 ,"next":45,
		"text":"?????Hola? ??Helena? Soy mam??, ??d??nde est??s? ???comienzas a decir, como si el buz??n de voz pudiera responderte. Aunque pronto te das cuenta que no es as?? y prosigues ???. No has llegado y no s?? a qui??n llamar, por favor, si escuchas esto ll??mame, ya es muy tarde y??? </p><p>La l??nea se pierde y quieres romper a llorar, pero no puedes. Sabes que si algo le pas?? a Helena, necesitas ser fuerte. Fuerte para ti, para ella.</p><p>Entonces escuchas un ruido que proviene de fuera. Sin pensarlo corres hacia la puerta.</p><p>?????Helena! ???comienzas a gritar, cuando antes de pensarlo, ya giraste la perilla.</p><p>La puerta se abre y no puedes creer lo que est??s viendo.</p>"},
		{"id":45 ,"next":46,
		"text":"Siguiente"},
		{"id":46 ,"next":14,"img":"46.avif",
		"text":"Es el gato de la vecina, que al igual que como otras noches, fue a merodear fuera de tu puerta.</p><p>Decepcionada de que no es Helena, cierras la puerta y regresas a la sala. Planeas encender la televisi??n, hasta que observas el reloj. Ha pasado m??s tiempo.</p><p>Sabes que es momento de hablarle a la polic??a</p>"}
	]
}



