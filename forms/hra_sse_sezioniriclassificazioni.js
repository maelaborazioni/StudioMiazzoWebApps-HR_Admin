/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7A90C8FD-F429-4273-A132-EFAAA11EFACD"}
 */
var vRequiredFieldsProgram = 'HR_Req_Sezionericlassificazione';

/**
 * Ordina il foundset dopo un nuovo inserimento
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"B9EEC4CB-78D0-40A3-B686-0C622BBD0146"}
 */
function dc_save_post(_foundset)
{
	if(_super.dc_save_post(_foundset) != -1)
	{
		_foundset.sort('ordine asc')
		return 0
	}
		
	return -1
}
