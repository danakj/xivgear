function GearDB() {
  this.slots_ = {
    "head" : "Head",
    "body" : "Body",
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

  // Most fields should be straight forward.
  // sksp: Skill Speed
  // spsp: Spell Speed
  // occupies: Slots other than the main slot which the item occupies
  // default: Always true. Will be false for user-added items.
  db_ = {
    "head" : [
      {
	"name" : "Bard's Chapeau",
	"ilevel" : 90,
	"def" : 61,
	"mdef" : 61,
	"dex" : 18,
	"vit" : 20,
	"acc" : 15,
	"crit" : 21,
	"job" : [ "brd" ],
	"occupies" : [],
	"default" : true,
      },
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
	"occupies" : [],
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
	"occupies" : [],
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
	"occupies" : [],
	"default" : true,
      },
    ],
    "body" : [
      {
	"name" : "Bard's Shirt",
	"ilevel" : 90,
	"def" : 86,
	"mdef" : 86,
	"dex" : 29,
	"vit" : 33,
	"acc" : 24,
	"crit" : 34,
	"job" : [ "brd" ],
	"occupies" : [],
	"default" : true,
      },
      {
	"name" : "Allagan Cuirass Of Aiming",
	"ilevel" : 90,
	"def" : 86,
	"mdef" : 86,
	"dex" : 29,
	"vit" : 33,
	"crit" : 24,
	"sksd" : 34,
	"job" : [ "brd" ],
	"occupies" : [],
	"default" : true,
      },
      {
	"name" : "Ballad Corselet",
	"ilevel" : 80,
	"def" : 84,
	"mdef" : 84,
	"dex" : 25,
	"vit" : 27,
	"acc" : 30,
	"det" : 15,
	"job" : [ "brd" ],
	"occupies" : [],
	"default" : true,
      },
      {
	"name" : "Darklight Corselet Of Aiming",
	"ilevel" : 70,
	"def" : 81,
	"mdef" : 81,
	"dex" : 20,
	"vit" : 22,
	"acc" : 27,
	"crit" : 19,
	"job" : [ "brd" ],
	"default" : true,
      },
    ],
  };
}
