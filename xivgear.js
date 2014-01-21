var g_gear_db;
var g_gear_ownership;
var g_gear_view;
var g_stat_weights;

function OnPageLoad() {
  g_gear_db = new GearDB();
  g_gear_ownership = new GearOwnership();
  g_gear_view = new GearView(g_gear_db);
  g_stat_weights = new StatWeights();

  g_gear_view.PopulateItemsFromDB($("#geartable"), "brd");
  g_gear_view.SetOwnership(g_gear_ownership.All());

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
  var values = g_stat_weights.LoadPreset(preset);
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
  console.log("OnItemNameClicked", encodeURIComponent(name));
  var e = $("#geartable input.own[type=checkbox][value=\""+encodeURIComponent(name)+"\"]");
  console.log(e);
  var own = !e.prop("checked");
  e.prop("checked", own);
  OnItemOwnershipChanged(name);
}

function OnItemOwnershipChanged(name) {
  console.log("OnItemOwnershipChanged", encodeURIComponent(name));
  var e = $("#geartable input.own[type=checkbox][value=\""+encodeURIComponent(name)+"\"]");
  var own = e.prop("checked");
  if (own)
    g_gear_ownership.Add(name);
  else
    g_gear_ownership.Remove(name);
  g_gear_ownership.Save();
}
