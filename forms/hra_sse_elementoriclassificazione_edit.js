
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"55BB7319-DE58-4DC5-8308-762F85557BB7"}
 */
function copiaTutti(event) 
{
	var dataproviders = ['moltiplicatore', 'segno', 'ammettestorico'];
	globals.copyAll(event, null, false, dataproviders);
}
