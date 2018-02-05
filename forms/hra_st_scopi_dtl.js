/**
 * @properties={typeid:24,uuid:"0E94E21F-6CD8-4C89-8B6E-BD12C26B4F50"}
 */
function getButtonObject()
{
	var _btnObj = _super.getButtonObject()
	
	_btnObj.btn_new = new Object()
	_btnObj.btn_new.enabled = false
	_btnObj.btn_edit = new Object()
	_btnObj.btn_edit.enabled = false
	_btnObj.btn_delete = new Object()
	_btnObj.btn_delete.enabled = false
	_btnObj.btn_duplicate = new Object()
	_btnObj.btn_duplicate.enabled = false
	
	return _btnObj
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"15B80724-0D68-42DF-A111-0568523EA580"}
 */
function onLoad(event)
{
	foundset.loadAllRecords()
}
