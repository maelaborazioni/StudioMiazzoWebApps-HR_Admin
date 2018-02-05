/**
 * @param {String} _tipologia
 *
 * @properties={typeid:24,uuid:"70074F4F-E342-4649-BFC6-44C2D70DE22D"}
 */
function setElementiRiclassificazioni(_tipologia)
{
	elements.elementiriclassificazioni_tabless.tabIndex = _tipologia.toLowerCase() + '_tab';
	
//	// First remove all current tabs
//	elements.elementiriclassificazioni_tabless.removeAllTabs();
//	
//	// Then add the new one
//	var _tipologiaLower = _tipologia.toLowerCase()
//	elements.elementiriclassificazioni_tabless.addTab(
//		 'hra_sse_elementiriclassificazioni_' + _tipologiaLower + '_tbl'	// form
//		,_tipologiaLower + '_tab'											// tabname
//		,null																// tabtext
//		,null																// tooltip
//		,null																// iconurl
//		,'#FFFFFF'															// fg
//		,'#BBCCEE'															// bg
//		,'sezioniriclassificazioni_to_elementiriclassificazioni'			// relation
//	);
}
