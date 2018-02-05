/**
 * @param {JSRecord<db:/ma_hr/tabsictabelle>} record
 *
 * @properties={typeid:24,uuid:"F33A9991-BD5B-4BE4-8023-B17F3BA454A4"}
 * @AllowToRunInFind
 */
function validateLivelloSicurezza(record)
{
	var not_valid = false;
	
	var fs = record && record.foundset.duplicateFoundSet();
	if(fs && fs.find())
	{
		fs.idsic_tipotabella = '!=' + record.idsic_tipotabella;
		fs.codice = record.codice;
		fs.codtipo = record.codtipo;
		fs.macrocodice = record.macrocodice;
		
		not_valid = fs.search() > 0;
	}
	
	if(not_valid)
		throw 'Il codice inserito è già presente';
	
	return true;
}
