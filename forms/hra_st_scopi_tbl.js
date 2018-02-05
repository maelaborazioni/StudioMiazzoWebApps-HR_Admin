/**
 * @properties={typeid:35,uuid:"17EF9ECB-1F81-4903-8084-BE1168544039",variableType:-4}
 */
var _pkTipologia = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B877D995-548C-4C3D-8E4B-43F705314BE2"}
 */
function addTipologia(event) {
	_pkTipologia = null
	
	// 1. Scegli la tipologia per la riclassificazione
	_showLkpTipologia(event)
	
	if(_pkTipologia)
	{
		for(var pk in _pkTipologia)
		{
			var fs = scopo_to_tabscopi.scopi_to_scopitipologieelementi
			var _newRecord = fs.getRecord(fs.newRecord())
			_newRecord.idtipologiaelemento = _pkTipologia[pk]
			_newRecord.codscopo = _newRecord.scopitipologieelementi_to_scopi.codice
			_newRecord.codtipologiaelemento = _newRecord.scopitipologieelementi_to_tipologieelementi.codice
		}
	}
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"A3E36AFC-4029-4C32-9F6A-DF218AB1562A"}
 */
function _showLkpTipologia(_event)
{
	globals.ma_utl_showLkpWindow(
		{
			event: _event
			, lookup: 'HR_Lkp_Tipologia'
			, returnField: '_pkTipologia'
			, returnForm: controller.getName()
			, methodToAddFoundsetFilter: 'filterTipologia'
			, allowInBrowse: true
			, multiSelect: true
		}
	);
}

/**
 * @properties={typeid:24,uuid:"65B391BE-3611-4F44-A4B8-4807C7F64E7C"}
 */
function filterTipologia(fs)
{
	var tipologie = scopi_to_scopitipologieelementi && globals.foundsetToArray(scopi_to_scopitipologieelementi, 'idtipologiaelemento');
	fs.addFoundSetFilterParam('idtipologiaelemento', 'NOT IN', tipologie, 'filterTipologieAssociate');
	
	return fs;
}
