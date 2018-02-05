/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"6B4BC30B-1129-46E7-BB77-7DFB674C6110"}
 */
function dc_delete(event, _triggerForm, _forceForm) {
	_super.dc_delete(event, _triggerForm, controller.getName())
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 *
 * @properties={typeid:24,uuid:"6B2D84E7-2D30-44C2-B510-587FB2CC44DD"}
 */
function dc_delete_pre(_foundset, _multiDelete)
{
	if(_super.dc_delete_pre(_foundset,_multiDelete))
	{
//		var _answer = globals.ma_utl_showYesNoQuestion('i18n:hr.msg.deleteChildren','i18n:hr.msg.attention')
		var _answer = globals.ma_utl_showYesNoQuestion('Tutte le riclassificazioni collegate a questo scopo saranno eliminate. Continuare? ','i18n:hr.msg.attention')
		return _answer ? 0 : -1
	}
	
	return -1
}
