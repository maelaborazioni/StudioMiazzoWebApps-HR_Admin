/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"10380D5B-1507-4E21-8DF0-3DFDE7296D69",variableType:4}
 */
var vAbilita = 1;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8C2BDE66-F692-43F3-96D9-0EFBEB8807A2"}
 */
function selectUnselectAll(event) 
{
	// TROPPO LENTO!
//	var fsUpdater = databaseManager.getFoundSetUpdater(foundset);
//		fsUpdater.setColumn('abilitatastorico', vAbilita);
//		fsUpdater.performUpdate();

	var sqlQuery = 'UPDATE DittaStorico SET abilitataStorico = ?';
	if(!plugins.rawSQL.executeSQL(globals.Server.MA_HR, 'dittastorico', sqlQuery, [vAbilita]))
	{
		globals.ma_utl_showErrorDialog(plugins.rawSQL.getException().getMessage(), 'i18n:svy.fr.lbl_excuse_me');
	}
	else
	{
		vAbilita = !vAbilita;
		databaseManager.refreshRecordFromDatabase(foundset, -1);
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"818285ED-C639-49C7-9745-7099C2832388"}
 */
function onShowForm(firstShow, event) 
{
	_super.onShowForm(firstShow, event);
	controller.readOnly = false;
}
