/**
 * @type {Array}
 * 
 * @properties={typeid:35,uuid:"36419734-FF4A-4779-8A73-17DDE01B10A8",variableType:-4}
 */
var scopoPks = null;

/** *
 * @param _event
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"65133E64-100F-48E1-8236-529A52F37D3F"}
 */
function dc_new(_event, _triggerForm, _forceForm) 
{
	try
	{
		scopoPks = showLkpScopo(_event);
		
		if(scopoPks)
		{
			for(var i = 0; i < scopoPks.length; i++)
			{
				var newRecord = ditta_to_scopo.getRecord(ditta_to_scopo.newRecord());
					newRecord.idscopo = scopoPks[i];
			}
		}
	}
	catch(ex)
	{
		databaseManager.revertEditedRecords(ditta_to_scopo);
		globals.ma_utl_showErrorDialog(ex.message, 'Errore');
	}
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6ADA915C-EC91-4C5A-85B7-AE97F7ECC013"}
 */
function showLkpScopo(event)
{
	return globals.ma_utl_showLkpWindow(
		{
			  returnForm: controller.getName()
			, lookup: 'HR_Lkp_Scopo'
			, methodToAddFoundsetFilter: 'filterScopo'
			, allowInBrowse: true
			, multiSelect: true
			, noRecordMessage: 'Tutti gli scopi riclassificati'
		}
	);
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"711DFF1D-2DE5-4B45-861A-6BB9927AA199"}
 */
function filterScopo(fs)
{
	fs.addFoundSetFilterParam('idscopo', 'NOT IN', globals.foundsetToArray(ditta_to_scopo, 'idscopo'), 'filterScopoDitta');
	return fs;
}

/** *
 * @param _event
 * @param _triggerForm
 * @param _forceForm
 * @param _noConfirm
 *
 * @properties={typeid:24,uuid:"48D19A27-07C9-4F41-8447-44488ADCFFD6"}
 */
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	try
	{
		databaseManager.startTransaction();
		
		var answer = globals.ma_utl_showYesNoQuestion('Eliminare tutte le riclassificazioni presenti?', 'Elimina riclassificazioni');
		if(answer)
		{
			var fs = ditta_to_scopo;
			if(!fs.deleteAllRecords())
				throw 'Errore durante l\'eliminazione';
		}
	}
	catch(ex)
	{
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog(ex.message, 'Errore');
	}
}
