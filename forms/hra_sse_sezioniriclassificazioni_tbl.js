/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"37EE50CE-D0A8-4FA5-AB41-D48DF077D798"}
 */
function editSezioneRiclassificazione(event) {
	globals.ma_utl_showEditDialog(forms.hra_sse_sezionericlassificazione_edit.controller.getName(), foundset, vRequiredFieldsProgram, 'Modifica riclassificazione')
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"000F37B0-EE4B-486C-9290-12A7BCF369E4"}
 */
function addElementoRiclassificazione(event)
{
	try
	{
		//1. Recupera la lookup e la tipologia degli elementi
		var scopiRiclassificazioniFs = sezioniriclassificazioni_to_scopiriclassificazioni;
		if(scopiRiclassificazioniFs && scopiRiclassificazioniFs.scopiriclassificazioni_to_tipologieelementi)	
		{
			var lookupProgram    = scopiRiclassificazioniFs.scopiriclassificazioni_to_tipologieelementi.lookup;
			var lookupFilter     = scopiRiclassificazioniFs.scopiriclassificazioni_to_tipologieelementi.filter;
			var tipologia        = scopiRiclassificazioniFs.scopiriclassificazioni_to_tipologieelementi.descrizione;
			var tabellaTipologia = scopiRiclassificazioniFs.scopiriclassificazioni_to_tipologieelementi.tabella;
		}
		else
		{
			globals.ma_utl_showWarningDialog('Nessuna tipologia definita per questa riclassificazione');
			return;
		}
		
		//1. Imposta la form di dettaglio corretta
		forms[globals.ma_utl_getParentForm(controller.getName())].setElementiRiclassificazioni(tipologia);
		
		//2. Visualizza la lkp degli elementi
		/** @type {Array} */
		var pkElementi = showLkpElementi(event, lookupProgram, 'filterElementi', lookupFilter);
		if(pkElementi)
		{
			databaseManager.setAutoSave(false);
			
			var fs = sezioniriclassificazioni_to_elementiriclassificazioni.duplicateFoundSet();
			for(var i = 0; i < pkElementi.length; i++)
			{
				var newRecord = fs.getRecord(fs.newRecord());
					newRecord.idtabella = pkElementi[i];
			}
			
			//3. Crea la nuova riclassificazione per l'elemento selezionato
			var cloneForm = globals.preparaElementiRiclassificazione(tabellaTipologia, forms.hra_sse_elementoriclassificazione_edit.controller.getName());
			
			forms[cloneForm].elements['navigator'].visible = true;
			forms[cloneForm].elements['btn_copyall'].visible = true;
			
			globals.ma_utl_showEditDialog(cloneForm, fs, 'HR_Req_Elementoriclassificazione', 'Aggiungi riclassificazione', globals.Status.ADD);
		}
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message,'i18n:hr.msg.attention')
	}
}

/**
 * @properties={typeid:24,uuid:"26CEBA8F-38B6-4472-BDD5-B1022A502EA0"}
 */
function showLkpElementi(event, program, methodToAddFoundsetFilter, lookupFilter)
{
	return globals.ma_utl_showLkpWindow(
		{
			 event: event
			,returnField: 'pkElementi'
			,lookup: program
			,methodToAddFoundsetFilter: 'filterElementi'
			,allowInBrowse: true
			,multiSelect: true
		}
	);
//	return globals.ma_utl_showMultiSelectLookup(event, 'pkElementi', program, null, methodToAddFoundsetFilters, null, true);
}

/**
 * @param {JSFoundset} fs the foundset to filter
 *
 * @properties={typeid:24,uuid:"7DF9C9EB-D2A4-4E0A-8A23-4157DB47C624"}
 */
function filterElementi(fs)
{
	// Recupera solo gli elementi relativi alla ditta ed alle sezioni correnti
	if(globals.contains(fs.alldataproviders, 'idditta'))
		fs.addFoundSetFilterParam('idditta', '=', sezioniriclassificazioni_to_scopiriclassificazioni.idditta, 'ftr_elementiDitta');
	
	// Rimuovi gli elementi già riclassificati per questa ditta e per questo scopo
	/** @type {JSFoundSet<db:/ma_hr/ditteelementiriclassificazioni>} */
	var elementiRiclassificatiFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'ditteelementiriclassificazioni')
		elementiRiclassificatiFs.addFoundSetFilterParam('iddittasezionericlassificazione', 'IN', globals.foundsetToArray(foundset, 'iddittasezionericlassificazione'));
		elementiRiclassificatiFs.loadAllRecords();
	
	var pkName = databaseManager.getTable(fs.getDataSource()).getRowIdentifierColumnNames()[0];
	fs.addFoundSetFilterParam(pkName, 'NOT IN', globals.foundsetToArray(elementiRiclassificatiFs, 'idtabella'), 'ftr_elementiRiclassificati');
	
	// Filtra ulteriormente, se necessario
	var filter = sezioniriclassificazioni_to_scopiriclassificazioni.scopiriclassificazioni_to_tipologieelementi.filter;
	if(filter && this[filter])
		fs = this[filter](fs);
	
	return fs;
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"E437FBCD-F500-44EA-8637-E463D38B949C"}
 */
function filterElementiRetributivi(fs)
{
	var sqlQuery = "SELECT \
	 					idContrattoElemento \
					FROM \
						[dbo].[HRF_FiltroElementi](?)";
	
	var idDitta = sezioniriclassificazioni_to_scopiriclassificazioni.idditta;
	var ds = databaseManager.getDataSetByQuery(globals.Server.MA_HR, sqlQuery, [idDitta], -1);
	
	if(ds && ds.getValue(1,1) >= 0)
	{
		fs.addFoundSetFilterParam('idcontrattoelemento', 'IN', ds.getColumnAsArray(1), 'ftr_ContrattiElementi');
//		fs.addFoundSetFilterParam('codcontratto', 'IN', ds.getColumnAsArray(2), 'ftr_ContrattiElementi_Contratto');
//		fs.addFoundSetFilterParam('codelemento', 'IN', ds.getColumnAsArray(3), 'ftr_ContrattiElementi_Elementi');
	}
	
	return fs;
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"5D7DF7FC-B843-450B-8FBD-B6083598E0D1"}
 */
function filterVoci(fs)
{
	var sqlQuery = "SELECT \
						idContrattoVoce \
	 				FROM \
	 					[dbo].[HRF_FiltroVoci](?)";

	var idDitta = sezioniriclassificazioni_to_scopiriclassificazioni.idditta;
	var ds = databaseManager.getDataSetByQuery(globals.Server.MA_HR, sqlQuery, [idDitta], -1);
	
	if(ds && ds.getValue(1,1) >= 0)
	{
		fs.addFoundSetFilterParam('idcontrattovoce', 'IN', ds.getColumnAsArray(1), 'ftr_ContrattiVoci');
//		fs.addFoundSetFilterParam('codcontratto', 'IN', ds.getColumnAsArray(2), 'ftr_ContrattiElementi_Contratto');
//		fs.addFoundSetFilterParam('codvoce', 'IN', ds.getColumnAsArray(3), 'ftr_ContrattiElementi_Elementi');
	}
	
	return fs;
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"C70CD10C-2B1F-49B5-9881-0F0A8FCA1E35"}
 */
function filterEventi(fs)
{
	var sqlQuery = "SELECT \
						idEventoProprieta \
					FROM \
						[dbo].[HRF_FiltroEventi](?)";

	var idDitta = sezioniriclassificazioni_to_scopiriclassificazioni.idditta;
	var ds = databaseManager.getDataSetByQuery(globals.Server.MA_HR, sqlQuery, [idDitta], -1);
	
	if(ds && ds.getValue(1,1) >= 0)
	{
		fs.addFoundSetFilterParam('ideventoproprieta', 'IN', ds.getColumnAsArray(1), 'ftr_Eventi');
//		fs.addFoundSetFilterParam('idevento', 'IN', ds.getColumnAsArray(2), 'ftr_ContrattiEventi_IdEvento');
//		fs.addFoundSetFilterParam('proprieta', 'IN', ds.getColumnAsArray(3), 'ftr_ContrattiEventi_Proprieta');
	}

	return fs;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _triggerForm
 * @param _forceForm
 *
 * @properties={typeid:24,uuid:"5A4B173B-B5C5-400D-9291-FCEE7D297B25"}
 */
function dc_delete(event, _triggerForm, _forceForm) {
	_super.dc_delete(event, _triggerForm, controller.getName(), true)
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSFoundset} _foundset
 * @param {Boolean} _multiDelete
 *
 * @properties={typeid:24,uuid:"548B1330-3AF8-4FB7-9AF6-648C0837970C"}
 */
function dc_delete_pre(_foundset, _multiDelete)
{
	if(_super.dc_delete_pre(_foundset,_multiDelete))
	{
		var _answer = globals.ma_utl_showYesNoQuestion('i18n:hr.msg.deleteChildren','i18n:hr.msg.attention')
		return _answer ? 0 : -1
	}
	
	return -1
}
