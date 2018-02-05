/**
 * @param {JSFoundset} _foundset
 * @param {String} [_program]
 *
 * @properties={typeid:24,uuid:"F6A97670-C577-406E-8925-6F6DC8F18012"}
 */
function dc_save_validate(_foundset, _program)
{
	try
	{
		var _fs = _foundset  && _foundset.getDataSource() == foundset.getDataSource() ? _foundset : foundset
		var _prg = _program ? _program : vRequiredFieldsProgram;
		/** @type {JSRecord<db:/ma_hr/dittesezioniriclassificazioni>}*/
		var rec = _fs.getSelectedRecord();
		return (_super.dc_save_validate(_fs,_prg) != -1 && globals.validateSezioneRiclassificazione(rec)) ? 0 : - 1
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message,'i18n:hr.msg.attention')
		return -1
	}
}
