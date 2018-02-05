/**
 * // TODO generated, please specify type and doc for the params
 * @param {String} _tipologia
 *
 * @properties={typeid:24,uuid:"430468D8-CC93-49C8-9A56-E8F5F61EBF7D"}
 */
function setElementiRiclassificazioni(_tipologia)
{
//	var riclassificazioniFs = scopo_to_scopiriclassificazioni;
	if(scopiriclassificazioni_to_sezioniriclassificazioni && scopiriclassificazioni_to_sezioniriclassificazioni.getSize() > 0)
	{
		var _currTabIdx = elements.sezioniriclassificazioni_tabless.tabIndex
		forms[elements.sezioniriclassificazioni_tabless.getTabFormNameAt(_currTabIdx)].setElementiRiclassificazioni(_tipologia)
	}
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSEvent} _event
 * @param {String} _form
 *
 * @properties={typeid:24,uuid:"CC94A30E-0DD3-4576-BB19-7D3AFAFA1814"}
 */
function onRecordSelection(_event, _form)
{
	_super.onRecordSelection(_event,_form)
	
	// Set the correct detail tab
	if(scopiriclassificazioni_to_tipologieelementi && scopiriclassificazioni_to_tipologieelementi.getSize() > 0)
	{
		setElementiRiclassificazioni(scopiriclassificazioni_to_tipologieelementi.descrizione)
	}
//	else
//	{
//		setElementiRiclassificazioni('empty')
//	}
}
