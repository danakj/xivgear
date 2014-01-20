function GearView(gear_db) {
  this.gear_db = gear_db;
}

GearView.prototype.MaybeZero = function(m) {
  return m ? m : 0;
}

GearView.prototype.MaybeEmpty = function(m) {
  return m ? m : "";
}

GearView.prototype.DisplayItems = function(element, slot, job) {
  items = gear_db.GetItemsForSlot(slot, job);
  out = "<table cellspacing='0'>\n";

  slot_name = {
    "head" : "Head",
  }[slot];

  out += "<tr>\n";
  out += "<th class='slot name'>" + slot_name + "</th>";
  out += "<th class='primary stat'>STR</th>";
  out += "<th class='primary stat'>DEX</th>";
  out += "<th class='primary stat'>VIT</th>";
  out += "<th class='primary stat'>INT</th>";
  out += "<th class='primary stat'>MND</th>";
  out += "<th class='primary stat'>PIE</th>";
  out += "<th class='secondary stat'>ACC</th>";
  out += "<th class='secondary stat'>CRIT</th>";
  out += "<th class='secondary stat'>DET</th>";
  out += "<th class='secondary stat'>SPSD</th>";
  out += "<th class='secondary stat'>SKSD</th>";
  out += "</tr>";

  for (var i in items) {
    out += "<tr>\n";

    var item = items[i];
    console.log(item);
    var even_odd = i % 2 == 0 ? "even" : "odd";
    out += "<td class='item name " + even_odd + "'>" + item.name + "</td>";
    out += "<td class='primary stat " + even_odd + "'>" + this.MaybeEmpty(item.str) + "</td>";
    out += "<td class='primary stat " + even_odd + "'>" + this.MaybeEmpty(item.dex) + "</td>";
    out += "<td class='primary stat " + even_odd + "'>" + this.MaybeEmpty(item.vit) + "</td>";
    out += "<td class='primary stat " + even_odd + "'>" + this.MaybeEmpty(item.int) + "</td>";
    out += "<td class='primary stat " + even_odd + "'>" + this.MaybeEmpty(item.mnd) + "</td>";
    out += "<td class='primary stat " + even_odd + "'>" + this.MaybeEmpty(item.pie) + "</td>";
    out += "<td class='secondary stat " + even_odd + "'>" + this.MaybeEmpty(item.acc) + "</td>";
    out += "<td class='secondary stat " + even_odd + "'>" + this.MaybeEmpty(item.crit) + "</td>";
    out += "<td class='secondary stat " + even_odd + "'>" + this.MaybeEmpty(item.det) + "</td>";
    out += "<td class='secondary stat " + even_odd + "'>" + this.MaybeEmpty(item.spsp) + "</td>";
    out += "<td class='secondary stat " + even_odd + "'>" + this.MaybeEmpty(item.sksp) + "</td>";

    out += "</tr>\n";
  }
  element.innerHTML = out;
}

GearView.prototype.PopulateItemsFromDB = function(job) {
  console.log("> PopulateItemsFromDB");
  if (!gear_db) {
    console.log("Empty database, resetting.");
    gear_db.ResetToDefaults();
    gear_db.Save();
  }

  this.DisplayItems(ElementFromId("gear_head"), "head", job);
}

GearView.prototype.ResetGearDB = function() {
  gear_db.Reset();
  PopulateGearDB();
}
