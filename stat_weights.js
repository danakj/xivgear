function StatWeights() {
  this.presets_ = {
    "brd" : {
      "dmg" : 8.6764,
      "dex" : 1,
      "acc" : 0.6732,
      "crit" : 0.2151,
      "det" : 0.3449,
      "sksp" : 0.01,
      "acccap" : 472,
    },
  };
}

StatWeights.prototype.LoadPreset = function(preset) {
  return this.presets_[preset]
}
