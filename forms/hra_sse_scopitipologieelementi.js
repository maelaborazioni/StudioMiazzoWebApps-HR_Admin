/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"F82BE662-EF83-4626-8460-4A5B348297B8"}
 */
function dc_delete(event, _triggerForm, _forceForm) {
	_super.dc_delete(event, _triggerForm, controller.getName(), true)
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 *
 * @properties={typeid:24,uuid:"EC8D7DDF-8D50-4C93-85DF-F52689947D31"}
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
