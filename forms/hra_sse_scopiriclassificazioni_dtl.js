/**
 * @param {JSFoundset} _foundset
 * @param {String} [_program]
 *
 * @properties={typeid:24,uuid:"F83B49C4-A044-4BF6-ABE2-16A808C35A82"}
 * @SuppressWarnings(wrongparameters)
 */
function dc_save_validate(_foundset, _program)
{
	try
	{
		var _fs = _foundset  && _foundset.getDataSource() == foundset.getDataSource() ? _foundset : foundset
		var _prg = _program ? _program : vRequiredFieldsProgram;
		return (_super.dc_save_validate(_fs,_prg) != -1 && globals.validateScopoRiclassificazione(_fs.getSelectedRecord())) ? 0 : - 1
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message)
		return -1
	}
}

/**
 * Ordina il foundset dopo un nuovo inserimento
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"65C77E2A-B392-4B30-812C-9D5FD53A7C88"}
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
