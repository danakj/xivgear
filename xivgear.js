var gear_db;
var gear_view;
var stat_weights;

function OnPageLoad() {
  gear_db = new GearDB();
  gear_view = new GearView(gear_db);
  stat_weights = new StatWeights();

  gear_db.Load();
  gear_view.PopulateItemsFromDB($("#geartable"), "brd");

  $("#weights-preset ").val("brd");
  OnStatWeightPresetChanged();
}

function OnStatWeightPresetChanged() {
  var select = $("#weights-preset");
  var preset = select.find(":selected").val();
  if (!preset) {
    console.log("OnStatWeightPresetChanged has invalid preset: " + preset);
    return;
  }
  var values = stat_weights.LoadPreset(preset);
  if (!values) {
    console.log("OnStatWeightPresetChanged has invalid preset: " + preset);
    return;
  }
  var compute = $("#compute");
  compute.find("input[name=dmg]").val(MaybeEmpty(values.dmg));
  compute.find("input[name=str]").val(MaybeEmpty(values.str));
  compute.find("input[name=dex]").val(MaybeEmpty(values.dex));
  compute.find("input[name=int]").val(MaybeEmpty(values.int));
  compute.find("input[name=mnd]").val(MaybeEmpty(values.mnd));
  compute.find("input[name=pie]").val(MaybeEmpty(values.pie));
  compute.find("input[name=vit]").val(MaybeEmpty(values.vit));
  compute.find("input[name=acc]").val(MaybeEmpty(values.acc));
  compute.find("input[name=crit]").val(MaybeEmpty(values.crit));
  compute.find("input[name=det]").val(MaybeEmpty(values.det));
  compute.find("input[name=sksp]").val(MaybeEmpty(values.sksp));
  compute.find("input[name=spsp]").val(MaybeEmpty(values.spsp));
  compute.find("input[name=acccap]").val(MaybeEmpty(values.acccap));
}

function OnItemNameClicked(name) {
  console.log(name);
  var e = $("#geartable input[type=checkbox][value=\""+escape(name)+"\"]");
  e.prop("checked", !e.prop("checked"));
}
