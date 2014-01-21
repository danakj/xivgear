function GearView(gear_db) {
  this.gear_db_ = gear_db;
}

GearView.prototype.GenerateItems = function(elem, slot, job) {
  items = this.gear_db_.GetItemsForSlotAndJob(slot, job);
  if (!items)
    return;

  var category = "";
  category += "<tr>\n";
  category += "<th/>\n"
  category += "<th class='slot name'>" + this.gear_db_.SlotName(slot) + "</th>";
  category += "</tr>\n";
  elem.append(category);

  for (var i in items) {
    var row = "<tr>\n";

    var item = items[i];
    var even_odd = i % 2 == 0 ? "even" : "odd";
    row += "<td class='own'><input type='checkbox' value=\"" + encodeURIComponent(item.name) + "\"/></td>\n"
    row += "<td class='item name " + even_odd + "'>" + item.name + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.dmg) + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.str) + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.dex) + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.vit) + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.int) + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.mnd) + "</td>";
    row += "<td class='primary stat " + even_odd + "'>" + MaybeEmpty(item.pie) + "</td>";
    row += "<td class='secondary stat " + even_odd + "'>" + MaybeEmpty(item.acc) + "</td>";
    row += "<td class='secondary stat " + even_odd + "'>" + MaybeEmpty(item.crit) + "</td>";
    row += "<td class='secondary stat " + even_odd + "'>" + MaybeEmpty(item.det) + "</td>";
    row += "<td class='secondary stat " + even_odd + "'>" + MaybeEmpty(item.spsp) + "</td>";
    row += "<td class='secondary stat " + even_odd + "'>" + MaybeEmpty(item.sksp) + "</td>";

    row += "</tr>\n";
    elem.append(row);

    {
      var es = elem.find("td.item.name");
      var item_elem = es[es.length - 1];
      item_elem.addEventListener('click', curry(OnItemNameClicked, item_elem, item.name));
    }
    {
      var es = elem.find("td input[type=checkbox]");
      var item_elem = es[es.length - 1];
      item_elem.addEventListener('change', curry(OnItemOwnershipChanged, item_elem, item.name));
    }
  }
}

GearView.prototype.PopulateItemsFromDB = function(etable, job) {
  console.log("> GearView.PopulateItemsFromDB");
  if (!this.gear_db_) {
    console.log("Empty database, resetting.");
    this.gear_db_.ResetToDefaults();
    this.gear_db_.Save();
  }

  etable.html("<table cellspacing='0'>\n");

  var header = "";
  header += "<tr>\n";
  header += "<th>Own</th>";
  header += "<th></th>";
  header += "<th class='primary stat'>DMG</th>";
  header += "<th class='primary stat'>STR</th>"; 
  header += "<th class='primary stat'>DEX</th>";
  header += "<th class='primary stat'>VIT</th>";
  header += "<th class='primary stat'>INT</th>";
  header += "<th class='primary stat'>MND</th>";
  header += "<th class='primary stat'>PIE</th>";
  header += "<th class='secondary stat'>ACC</th>";
  header += "<th class='secondary stat'>CRIT</th>";
  header += "<th class='secondary stat'>DET</th>";
  header += "<th class='secondary stat'>SPSD</th>";
  header += "<th class='secondary stat'>SKSD</th>";
  header += "</tr>";
  etable.append(header);

  var slots = this.gear_db_.AllSlots();
  for (var i in slots)
    this.GenerateItems(etable, slots[i], job);
}

GearView.prototype.ResetGearDB = function() {
  this.gear_db_.Reset();
  PopulateGearDB();
}

GearView.prototype.SetOwnership = function(owned) {
  var checkboxes = $("#geartable input[type=checkbox]");
  for (var i = 0; i < checkboxes.length; ++i) {
    var own = owned.indexOf(checkboxes[i].defaultValue) >= 0;
    checkboxes[i].checked = own;
  }
}
