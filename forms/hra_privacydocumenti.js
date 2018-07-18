/**
 * @AllowToRunInFind
 * 
 * @properties={typeid:24,uuid:"0B3BD6CB-18E9-4547-AF3F-D878288C90B6"}
 */
function dc_save_validate(_foundset,_program)
{
	try
	{
		if(_super.dc_save_validate(_foundset,_program) !== -1)
		{
			/** @type {JSFoundSet<db:/ma_hr/tabprivacytipodocumento>} */
			var fs = _foundset.duplicateFoundSet();
			if(fs && fs.find())
			{
				fs.codice = _foundset.codice;
				if(fs.search() > 0)
					throw 'Il codice inserito è già presente';
				
				return 0;
			}
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
