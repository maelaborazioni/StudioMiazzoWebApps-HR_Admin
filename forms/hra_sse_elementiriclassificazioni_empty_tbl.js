/**
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"F75E306C-AEB7-4B64-AF12-1DBB86F3C5A3"}
 */
function dc_delete(_event, _triggerForm, _forceForm)
{
	_super.dc_delete(_event,_triggerForm,controller.getName())
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BBF4DEBD-8621-4164-881E-8FB433A1F81F"}
 */
function _editElementoRiclassificazione(event)
{
	//TODO editElementoRiclassificazione : copiata dalla form hra_sse_elementiriclassificazioni_eventi_tbl
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
