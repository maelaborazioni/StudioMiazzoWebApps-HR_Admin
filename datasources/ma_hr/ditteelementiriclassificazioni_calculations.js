/**
 * @properties={type:12,typeid:36,uuid:"997659F7-F22A-42F5-B921-CB4E1356288E"}
 */
function tipologia()
{
	return   elementiriclassificazioni_to_sezioniriclassificazioni
			.sezioniriclassificazioni_to_scopiriclassificazioni
			.scopiriclassificazioni_to_tipologieelementi.codice;
}

/**
 * @properties={type:12,typeid:36,uuid:"AE66C4CB-7354-437B-9507-D20305010619"}
 */
function segno_string()
{
	return application.getValueListDisplayValue('vls_segno', segno);
}
