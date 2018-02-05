/**
 * @param {JSFoundset} [_foundset]
 * @param {String} [_program]
 *
 * @properties={typeid:24,uuid:"86B8397D-85EF-4342-9D5B-B27BF83D89A4"}
 */
function dc_save_validate(_foundset, _program)
{
	try
	{
		var _fs = _foundset  && _foundset.getDataSource() == foundset.getDataSource() ? _foundset : foundset
		var _prg = _program ? _program : 'HR_Req_Elementoriclassificazione'
		return (globals.validateElementoRiclassificazione(_fs.getSelectedRecord()) && _super.dc_save_validate(_fs,_prg) != -1) ? 0 : - 1
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message,'i18n:hr.msg.attention')
		return -1
	}
}

/**
 * @properties={typeid:24,uuid:"45F38EE0-8931-4677-B1FA-C3B4D6E4EC2E"}
 */
function gotoEdit()
{
	_super.gotoEdit()
	
	if(foundset.elementiriclassificazioni_to_sezioniriclassificazioni.sezioniriclassificazioni_to_scopiriclassificazioni.scopiriclassificazioni_to_tipologieelementi.codice == globals.codEVENTI)
		elements.fld_moltiplicatore.enabled = false;
}
