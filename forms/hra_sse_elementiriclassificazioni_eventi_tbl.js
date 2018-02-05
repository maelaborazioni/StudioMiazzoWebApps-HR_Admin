/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"131329D1-B156-4D7B-9C4C-2A8C6EB48FE4"}
 */
function _editElementoRiclassificazione(event)
{
	var form = forms.hra_sse_elementoriclassificazione_edit.controller.getName();
	var cloneForm = globals.preparaElementiRiclassificazione(
		  elementiriclassificazioni_to_sezioniriclassificazioni
		 .sezioniriclassificazioni_to_scopiriclassificazioni
		 .scopiriclassificazioni_to_tipologieelementi
		 .tabella
		, form
		);
	
	forms[cloneForm].elements['navigator'].visible = false;
	
	globals.ma_utl_showEditDialog(cloneForm,foundset,'HR_Req_Elementoriclassificazione','Modifica riclassificazione');
}
