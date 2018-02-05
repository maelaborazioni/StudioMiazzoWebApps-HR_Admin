/**
 * @properties={typeid:35,uuid:"31A6D271-2CEC-40E3-B74D-A440AF814D18",variableType:-4}
 */
var _pkTipologia = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F083F73A-BE4D-4439-8B2F-C51C652CCC5A"}
 */
var vRequiredFieldsProgram = 'HR_Req_Scoporiclassificazione';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7D1FA6ED-CFDC-42D3-8DB0-402781C63BE2"}
 */
function addScopoRiclassificazione(event) {
	try
	{
		var newRecord = dittascopo_to_scopiriclassificazioni.getRecord(dittascopo_to_scopiriclassificazioni.newRecord());
		globals.ma_utl_showEditDialog(forms.hra_sse_scoporiclassificazione_edit.controller.getName(), newRecord.foundset, vRequiredFieldsProgram, 'Aggiungi riclassificazione scopo');
//		globals._addScopoRiclassificazione(idditta, idscopo, _pkTipologia, forms.hra_sse_scoporiclassificazione_edit.controller.getName(), vRequiredFieldsProgram, null, 'Aggiungi riclassificazione')
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message);		
	}
	
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"E3B7D31D-A0D5-4B61-8353-6453D1585D72"}
 */
function _showLkpTipologia(_event)
{
	globals.ma_utl_showLkpWindow({ event: _event, lookup: 'HR_Lkp_tipologia', returnField: '_pkTipologia', returnForm: controller.getName(), methodToAddFoundsetFilter: 'filterTipologia', allowInBrowse: true });
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"C9D2093F-AFE2-4B79-9C1F-EBFF228EAC3E"}
 */
function filterTipologia(_foundset)
{
	var _tipologieFs = scopo_to_tabscopi.scopi_to_scopitipologieelementi
	if(_tipologieFs != null)
	{
		_foundset.addFoundSetFilterParam('idtipologiaelemento','in',globals.foundsetToArray(_tipologieFs,'idtipologiaelemento'),'scopoTipologiaFilter')
	}
	
	return _foundset
}

/**
 * @properties={typeid:24,uuid:"F72DA8A9-EF87-4DA9-B8EC-716D15891E84"}
 */
function gotoEdit()
{
//	elements.btnDelete.enabled = false
//	elements.btnEdit.enabled = false
	elements.btnAdd.enabled = false
}

/**
 * @properties={typeid:24,uuid:"785FC626-8A32-4BEA-8EB0-F57B1FC91A98"}
 */
function gotoBrowse()
{
//	elements.btnDelete.enabled = true
//	elements.btnEdit.enabled = true
	elements.btnAdd.enabled = true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"053A324C-A969-41D7-AC08-B9BF4D55463B"}
 */
function onActionBtnDelete(event) 
{
	dc_delete(event, controller.getName(), controller.getName());
}
