var gear_db;
var gear_view;

function OnPageLoad() {
  gear_db = new GearDB();
  gear_view = new GearView(gear_db);

  gear_db.Load();
  gear_view.PopulateItemsFromDB("brd");
}
