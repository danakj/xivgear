function GearDB() {
  this.slots_ = {
    "head" : "Head",
  };
  this.jobs_ = {
    "brd" : "Bard",
  };
  this.db_ = null;
}

GearDB.prototype.AllSlots = function() {
  var out = [];
  for (var i in this.slots_)
    out.push(i);
  return out;
}

GearDB.prototype.SlotName = function(slot) {
  return this.slots_[slot];
}

GearDB.prototype.GetItemsForSlotAndJob = function(slot, job) {
  console.log("> GearDB.GetItemsForSlot " + slot);
  if (!this.slots_[slot])
    console.log("GearDB.GetItemsForSlot has invalid slot: " + slot);
  var items_for_job = db_[slot].filter(function(i) { return i.job.indexOf(job) >= 0; });
  return items_for_job.sort(function(a,b) { return b.ilevel - a.ilevel; });
}

GearDB.prototype.ToString = function() {
  return JSON.stringify(db_)
}

GearDB.prototype.Save = function() {
  console.log("> GearDB.Save");
  localStorage.setItem('gear_db', ToString());
}

GearDB.prototype.Load = function() {
  console.log("> GearDB.Load");
  this.LoadDefaults();
}

GearDB.prototype.Reset = function() {
  console.log("> GearDB.Reset");
  localStorage.removeItem('gear_db');
  Load();
}

GearDB.prototype.LoadDefaults = function() {
  console.log("> GearDB.LoadDefaults");

  db_ = {
    "head" : [
      {
	"name" : "Allagan Visor Of Aiming",
	"ilevel" : 90,
	"def" : 61,
	"mdef" : 61,
	"dex" : 18,
	"vit" : 20,
	"crit" : 15,
	"acc" : 21,
	"job" : [ "brd" ],
	"default" : true,
      },
      {
	"name" : "Ballad Crown",
	"ilevel" : 80,
	"def" : 60,
	"mdef" : 60,
	"dex" : 15,
	"vit" : 17,
	"sksp" : 13,
	"det" : 13,
	"job" : [ "brd" ],
	"default" : true,
      },
      {
	"name" : "Darklight Eyepatch Of Aiming",
	"ilevel" : 70,
	"def" : 58,
	"mdef" : 58,
	"dex" : 12,
	"vit" : 14,
	"acc" : 11,
	"crit" : 16,
	"job" : [ "brd" ],
	"default" : true,
      },
    ],
  };
}
