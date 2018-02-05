/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3BD645F3-5050-4AC4-9A0A-507DFA2248CB"}
 */
var vRequiredFieldsProgram = 'HR_Req_Scoporiclassificazione';

/**
 * Ordina il foundset dopo un nuovo inserimento
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"677A8569-3D60-4678-B00B-7DC4FB443AA5"}
 */
function dc_save_post(_foundset)
{
	if(_super.dc_save_post(_foundset) != -1)
	{
		_foundset.sort('ordine asc');
		return 0;
	}
		
	return -1;
}
