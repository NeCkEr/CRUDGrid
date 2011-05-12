$(function(){
	$( "#tabs" ).tabs({ modal: true });
	//################Dialog Box's################################# 
	$( "#dialog-form" ).dialog({
		autoOpen: true,
		height: 300,
		width: 350,
		modal: true
	});
	
	var criaObj = function(a, b, c){
		return  {
			nome:ko.observable(a),
			nPessoas:ko.observable(b),
			id:ko.observable(c),
			
			updateObj:function(novoNome){
				//TODO:ServerSide Stuff
				this.nome(novoNome);
			}
		};
		
		
	}

	var myModel = 
	{
	
		quartos: ko.observableArray
		([
			new criaObj('teste1',1,1),
			new criaObj('teste2',2,2),
			new criaObj('teste3',7,3),
			new criaObj('teste4',5,4),
			new criaObj('teste5',2,5),
			new criaObj('teste6',3,6)
			
		]),
		addNewObj: function(obj){
			//TODO:ServerSide Stuff
			var newObj = criaObj(obj.nome, obj.nPessoas, obj.id);
			myModel.quartos.push(newObj);
			
	  	}
	};
	
	
	
	
	myModel.gridViewModel = new ko.simpleGrid.viewModel({
	    data: myModel.quartos,
		functionAddNewObj: myModel.addNewObj,
	    columns: 
		[
	        { headerText: "Nome", rowText: "nome" },
	        { headerText: "Numero Maximo pessoas", rowText: "nPessoas" }
		],
	    pageSize: 3,
		editarClick: function(objClicked){
			objClicked.mudaNome('novoNome');
		},
		mostraEditar: true
	});
	
	ko.applyBindings(myModel);

});
