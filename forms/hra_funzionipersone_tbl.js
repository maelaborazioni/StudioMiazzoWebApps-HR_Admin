/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AB0E67C0-E500-4653-B570-C48661C1DCBC"}
 */
function setAltraFigura(event) 
{
	if(globals.nav.mode === globals.Status.EDIT || !controller.readOnly)
	{
		var pkRuolo = globals.ma_utl_showLkpWindow(
			{
				event: event,
				lookup: 'AG_Lkp_Ruolo',
				methodToAddFoundsetFilter: 'filterRuolo'
			}
		);
		
		if(pkRuolo)
		{
			abilitatoaltrafigura = pkRuolo;
		}
	}
}

/**
 * @properties={typeid:24,uuid:"922225DC-59F0-4237-BED4-04F8FD563A56"}
 */
function filterRuolo(fs)
{
	fs.addFoundSetFilterParam('idTipoFunzione', '!=', idtipofunzione, 'ftr_Ruolo');
	return fs;
}
