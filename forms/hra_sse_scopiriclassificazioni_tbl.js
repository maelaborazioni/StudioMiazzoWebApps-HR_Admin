/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A748F7B5-6F94-4BA0-B9A7-BFF5C013203A"}
 */
function addSezioneRiclassificazione(event) {
	// 2. Presenta la maschera d'inserimento
	globals._addSezioneRiclassificazione(iddittascoporiclassificazione, forms.hra_sse_sezionericlassificazione_edit.controller.getName(), vRequiredFieldsProgram, null, 'Aggiungi riclassificazione')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8AA7A91C-09EF-4616-8BDB-43E6D7EDD593"}
 */
function editScopoRiclassificazione(event) {
	globals.ma_utl_showEditDialog(forms.hra_sse_scoporiclassificazione_edit.controller.getName(), foundset, vRequiredFieldsProgram, 'Modifica riclassificazione')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"82BCBD0F-8988-45DE-B89D-A73F8D99CBB5"}
 */
function dc_delete(event, _triggerForm, _forceForm) {
	_super.dc_delete(event, _triggerForm, controller.getName(), true)
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 *
 * @properties={typeid:24,uuid:"1843C351-14E9-4489-BF60-0185CE8BFA33"}
 */
function dc_delete_pre(_foundset, _multiDelete)
{
	if(_super.dc_delete_pre(_foundset,_multiDelete))
	{
		var _answer = globals.ma_utl_showYesNoQuestion('i18n:hr.msg.deleteChildren','i18n:hr.msg.attention')
		return _answer ? 0 : -1
	}
	
	return -1
}
