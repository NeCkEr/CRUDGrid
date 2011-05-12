// This is an example of one possible way to make a reusable component (or 'plugin'), consisting of:
//  * A view model class, which gives a way to configure the component and to interact with it (e.g., by exposing currentPageIndex as an observable, external code can change the page index)
//  * A custom binding (ko.bindingHandlers.simpleGrid in this example) so a developer can place instances of it into the DOM
//     - in this example, the custom binding works by rendering some predefined templates using the ko.jqueryTmplTemplateEngine template engine
//
// There are loads of ways this grid example could be expanded. For example,
//  * Letting the developer override the templates used to create the table header, table body, and page links div
//  * Adding a "sort by clicking column headers" option
//  * Creating some API to fetch table data using Ajax requests
//  ... etc

(function () {
    // Private function
    function getColumnsForScaffolding(data) {
        if ((typeof data.length != 'number') || data.length == 0)
            return [];
        var columns = [];
        for (var propertyName in data[0])
            columns.push({ headerText: propertyName, rowText: propertyName });
        return columns;
    }

    ko.simpleGrid = {
        // Defines a view model class you can use to populate a grid
        viewModel: function (configuration) {
			this.mostraEditar = configuration.mostraEditar || false;
			this.functionAddNewObj = configuration.functionAddNewObj;
			this.editarClick= configuration.editarClick;
            this.data = configuration.data;
            this.currentPageIndex = ko.observable(0);
            this.pageSize = configuration.pageSize || 5;

            // If you don't specify columns configuration, we'll use scaffolding
            this.columns = configuration.columns || getColumnsForScaffolding(ko.utils.unwrapObservable(this.data)); 

            this.itemsOnCurrentPage = ko.dependentObservable(function () {
                var startIndex = this.pageSize * this.currentPageIndex();
                return this.data.slice(startIndex, startIndex + this.pageSize);
            }, this);

            this.maxPageIndex = ko.dependentObservable(function () {               
                return Math.ceil(ko.utils.unwrapObservable(this.data).length / this.pageSize);
            }, this);
           
			this.criaNovoObjfromTemplate = function(){
				var newObj = {};
				for(var key in this.data()[0]){
					if(key != 'updateObj'){
						newObj[key] = $('#asd'+key).val();
					}
				}
				this.functionAddNewObj(newObj)
				
			}
          
        }
    };

    // Templates used to render the grid
    var templateEngine = new ko.jqueryTmplTemplateEngine();
    templateEngine.addTemplate("ko_simpleGrid_grid", "\
                    <table class=\"ko-grid\" cellspacing=\"0\">\
                        <thead>\
                            <tr>\
                                {{each(i, columnDefinition) columns}}\
                                    <th>${ columnDefinition.headerText }</th>\
                                {{/each}}\
								{{if mostraEditar}}\
									<th>Editar</th>\
								{{/if}}\
                            </tr>\
                        </thead>\
                        <tbody>\
                            {{each(i, row) itemsOnCurrentPage()}}\
                                <tr class=\"${ i % 2 == 0 ? 'even' : 'odd' }\">\
                                    {{each(j, columnDefinition) columns}}\
                                        <td>{{html typeof columnDefinition.rowText == 'function' ? columnDefinition.rowText(row,i) : row[columnDefinition.rowText] }}</td>\
                                    {{/each}}\
									{{if mostraEditar}}\
										<td><button class='btnEditar' data-bind=\"click: function() { this.editarClick(this.itemsOnCurrentPage()[i]); }\">Editar</button></td>\
									{{/if}}\
                                </tr>\
                            {{/each}}\
                        </tbody>\
                    </table>");

    templateEngine.addTemplate("ko_simpleGrid_pageLinks", "\
                    <div class=\"ko-grid-pageLinks\">\
                        <span><!--Page:--></span>\
                        {{each(i) ko.utils.range(1, maxPageIndex)}}\
                            <a href=\"#\" data-bind=\"click: function() {  currentPageIndex(i); }, css: { selected: i == currentPageIndex() }\">\
                                ${ i + 1 }\
                            </a>\
                        {{/each}}\
                    </div>");

    templateEngine.addTemplate("form_add_newObj", "\
                    <form>\
						<fieldset>\
							{{each(i, objProp) data()[0]}}\
								{{if  i != 'updateObj'}}\
									<label for=\"${ i }\">${ i }</label>\
										<input type=\"text\" name=\"${ i }\" id=\"asd${ i }\" class=\"text ui-widget-content ui-corner-all\" />\
									<br/>\
								{{/if}}\
							{{/each}}\
							<button class='btnEditar' data-bind=\"click: function() {\
									criaNovoObjfromTemplate()\
								 }\">Adicionar</button>\
						</fieldset>\
						</form>");
		

    // The "simpleGrid" binding
    ko.bindingHandlers.simpleGrid = {
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor) {
			var teste = function(){
				$('button').button();
			};
        	var viewModel = viewModelAccessor();
            element.innerHTML = "";

            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate("ko_simpleGrid_grid", viewModel, { templateEngine: templateEngine, afterRender: teste }, gridContainer, "replaceNode");

            var pageLinksContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate("ko_simpleGrid_pageLinks", viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
         	
			
        }

    };
})();