/**
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"8A260B8A-8C15-42A3-A95D-442AC2537DAE"}
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
 * @properties={typeid:24,uuid:"73D08639-8708-43A9-9CA9-928D59C90B63"}
 * @AllowToRunInFind
 */
function editElementoRiclassificazione(event)
{
	var _form = forms.hra_sse_elementoriclassificazione_edit.controller.getName();
		_form = globals.preparaElementiRiclassificazione(
			elementiriclassificazioni_to_sezioniriclassificazioni
			.sezioniriclassificazioni_to_scopiriclassificazioni
			.scopiriclassificazioni_to_tipologieelementi
			.codice, 
			_form);
		
	forms[_form].elements['navigator'].visible = false;
	forms[_form].elements['btn_copyall'].visible = false;
		
	globals.ma_utl_showEditDialog(_form, foundset,'HR_Req_Elementoriclassificazione','Modifica riclassificazione');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D6C5031F-77FA-4A37-96CE-D21EEEE33D37"}
 */
function onActionBtnDelete(event) 
{
	globals.deleteRecord(foundset);
}
