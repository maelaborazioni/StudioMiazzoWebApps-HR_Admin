/**
 * @properties={typeid:24,uuid:"45AC0560-BE69-4779-956F-D338FD4025F0"}
 */
function dc_new_post(fs)
{
	if(fs)
		fs.codtipo = globals.codATECO;
	
	return 0;
}

/**
 * @properties={typeid:24,uuid:"0583AB64-305E-43D1-9E97-3A27D908BCA4"}
 */
function dc_save_validate(_foundset,_program)
{
	try
	{
		if(_super.dc_save_validate(_foundset,_program) !== -1)
		{
			return globals.validateLivelloSicurezza(_foundset.getSelectedRecord()) ? 0 : -1;
		}
	
		return -1;
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		globals.ma_utl_showErrorDialog(ex.message);
		
		return -1;
	}
}
