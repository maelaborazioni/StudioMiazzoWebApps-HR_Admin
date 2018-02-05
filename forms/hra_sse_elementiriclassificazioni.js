/**
 * Ritorna un nuovo data source contenente l'unico record che abbia identificativo <code>idElemento</code>
 * @param {String} [table]
 * @param {Array} [idElementi]
 * @param {String} [pkName]
 * 
 * @return {String} the data source
 *
 * @properties={typeid:24,uuid:"D7A0DD84-5B23-4AD8-9CAF-A44A7F155C7A"}
 * @AllowToRunInFind
 */
function getElementiDataSource(table, idElementi, pkName)
{	
	// Nessuna riclassificazione
	if(!table && (!elementiriclassificazioni_to_sezioniriclassificazioni || elementiriclassificazioni_to_sezioniriclassificazioni.getSize() === 0))
		return null;
		
	var tabellaTipologia = table ? table : elementiriclassificazioni_to_sezioniriclassificazioni.sezioniriclassificazioni_to_scopiriclassificazioni.scopiriclassificazioni_to_tipologieelementi.tabella;
	var sqlQuery = 'SELECT * FROM ' + tabellaTipologia + ' WHERE ' + pkName + ' IN (' + idElementi.map(function(){ return '?'; }).join(',') + ')';
	
	return databaseManager.createDataSourceByQuery('elementiDataSource_' + tabellaTipologia, globals.Server.MA_HR, sqlQuery, idElementi, -1);
}
