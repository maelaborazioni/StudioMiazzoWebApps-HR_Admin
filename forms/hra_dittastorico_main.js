/**
 * @type {Array}
 * 
 * @properties={typeid:35,uuid:"2D415ECF-CAFD-4124-A237-B1DE50ED4D12",variableType:-4}
 */
var dittePks = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DFAE70C3-EA49-4064-829D-CA04B0C869D0",variableType:4}
 */
var vCodice = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C3D082B7-F2FC-4DDB-A823-E7E99C836077",variableType:4}
 */
var vIdDitta = 0;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"59CAC140-A35B-4C9C-BF39-F126F49FF242"}
 */
var vRagioneSociale = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7514CBC0-B44B-47B7-BC7A-8BDF69043D91",variableType:4}
 */
var vStorico = 1;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9AD206A9-E435-4292-8F07-E083AD48B846"}
 * @AllowToRunInFind
 */
function onDataChangeCodDitta(oldValue, newValue, event) 
{
	if(newValue)
	{
		if(doUpdateDitta(null, newValue))
			filter(event);
		else
			return false;
	}
	else
	{
		vRagioneSociale = null;
		foundset.loadAllRecords();
		globals.lookupFoundset(vIdDitta, foundset);
	}
	
	return true;
}

/**
 * @AllowToRunInFind
 * 
 * @param {Number} idDitta
 * @param {Number} codDitta
 * 
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"ED7041AF-8CF4-4033-AEE6-5F571AE32F2B"}
 */
function doUpdateDitta(idDitta, codDitta)
{
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte>} */
	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, globals.Table.DITTE);
	if(fs.find())
	{
		if(idDitta)
			fs.idditta = idDitta;
		else if(codDitta)
			fs.codice = codDitta;
		
		if(fs.search() > 0)
		{
			elements.fld_ftr_ragionesociale.bgcolor = 'DEFAULT';
			elements.fld_ftr_ragionesociale.fgcolor = 'DEFAULT';
			vIdDitta = fs.idditta;
			vCodice = fs.codice;
			vRagioneSociale = fs.ragionesociale;
			
			return true;
		}
		else
		{
			elements.fld_ftr_ragionesociale.bgcolor = '#FF0000';
			elements.fld_ftr_ragionesociale.fgcolor = '#FFFFFF';
			vRagioneSociale = 'Codice non riconosciuto';
			
			return false;
		}
	}
	
	return false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"33239F88-C6EF-46A4-8052-A5A8E79CF6D1"}
 * @AllowToRunInFind
 */
function filter(event)
{
	var fs = foundset;
	if(fs && fs.find())
	{		
		fs.ditte_storico_to_ditte.codice = vCodice;
		fs.search();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"23CEC5F8-663F-42BC-91DE-6B1E47BB312B"}
 */
function unfilter(event) 
{
	var fs = foundset;
	fs.loadAllRecords();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"38861BF9-ECD3-467C-8D30-14FF8E338816"}
 */
function onShowForm(firstShow, event) 
{
	_super.onShowForm(firstShow, event);
	controller.readOnly = false;
}

/**
 * @properties={typeid:24,uuid:"14D8A574-D858-4813-96EE-2C061933E0A9"}
 */
function updateDitta()
{
	doUpdateDitta(vIdDitta, vCodice);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"442D08B8-C7E4-4CE0-AD71-51C8165E825B"}
 */
function loadNew(event)
{
	var sqlQuery = 'INSERT INTO DittaStorico (idDitta, abilitataStorico)\
					(\
						SELECT Result.idDitta, 0 FROM\
						(\
							SELECT idDitta FROM Ditte\
							EXCEPT\
							SELECT idDitta FROM DittaStorico\
						) Result\
					)';
	
	if(!plugins.rawSQL.executeSQL(globals.Server.MA_HR, 'dittastorico', sqlQuery))
	{
		globals.ma_utl_showErrorDialog(plugins.rawSQL.getException().getMessage(), 'i18n:svy.fr.lbl_excuse_me');
	}
	else
	{
		databaseManager.refreshRecordFromDatabase(foundset, -1);
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A71A01F7-DD0F-4547-9DFD-DA4988DC4637"}
 */
function removeAll(event)
{
	var answer = globals.ma_utl_showYesNoQuestion('Eliminare tutte le associazioni?', 'i18n:hr.msg.attention');
	if(answer)
	{
		var sqlQuery = 'DELETE FROM DittaStorico';
		if(!plugins.rawSQL.executeSQL(globals.Server.MA_HR, 'dittastorico', sqlQuery))
		{
			globals.ma_utl_showErrorDialog(plugins.rawSQL.getException().getMessage(), 'i18n:svy.fr.lbl_excuse_me');
		}
		else
		{
			databaseManager.refreshRecordFromDatabase(foundset, -1);
		}
	}
}

/** *
 * @param _event
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"4D4BAE46-9CC6-4533-AA9A-2F43157CAB83"}
 */
function dc_new(_event, _triggerForm, _forceForm)
{
	dittePks = globals.ma_utl_showLkpWindow(
		{
			returnForm: controller.getName(),
			returnField: 'dittePks',
			lookup: 'AG_Lkp_Ditta',
			methodToAddFoundsetFilter: 'filterDitta',
			allowInBrowse: true,
			multiSelect: true
		}
	);
	
	if(dittePks && dittePks.length > 0)
	{
		bulkInsert(dittePks);
	}
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"48A5D58F-E966-4876-885D-7477CBCDECA6"}
 */
function filterDitta(fs)
{
	fs.addFoundSetFilterParam('idditta', 'NOT IN', globals.foundsetToArray(foundset, 'idditta'), 'dittaFilter');
	return fs;
}

/**
 * @param {Array} idDitte
 *
 * @properties={typeid:24,uuid:"0DB4582B-D105-4D55-84B6-4C9BCD8DD366"}
 */
function bulkInsert(idDitte)
{
	var sqlQuery = 'INSERT INTO ' + globals.Table.DITTE_STORICO + ' (idDitta, abilitataStorico) VALUES ' + idDitte.map(function(item){ return '(' + item + ', 0)' }).join(',');
	if(!plugins.rawSQL.executeSQL(globals.Server.MA_ANAGRAFICHE, globals.Table.DITTE_STORICO, sqlQuery))
	{
		globals.ma_utl_showErrorDialog(plugins.rawSQL.getException().getMessage(), 'i18n:svy.fr.lbl_excuse_me');
	}
	else
	{
		databaseManager.refreshRecordFromDatabase(foundset, -1);
	}
}
