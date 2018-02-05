/**
 * @properties={typeid:24,uuid:"A8382D54-C329-4EF4-934E-0F4030A2C349"}
 */
function dc_new_post(fs)
{
	if(fs)
	{
		fs.codtipo = globals.codINCENDIO;
		fs.macrocodice = 0;
	}
	
	return 0;
}

/**
 * @properties={typeid:24,uuid:"589D197E-3CA1-46B2-944E-8EC81DB50B0A"}
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
