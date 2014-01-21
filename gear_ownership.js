function GearOwnership() {
  this.own_ = [];
  this.Load();
}

GearOwnership.prototype.Add = function(name) {
  name = encodeURIComponent(name);
  if (this.own_.indexOf(name) < 0)
    this.own_.push(name);
}

GearOwnership.prototype.Remove = function(name) {
  name = encodeURIComponent(name);
  var i = this.own_.indexOf(name);
  if (i >= 0)
    this.own_.splice(i, 1);
}

GearOwnership.prototype.Save = function() {
  localStorage.setItem('gear_ownership', JSON.stringify(this.own_));
}

GearOwnership.prototype.Load = function() {
  var v = localStorage.getItem('gear_ownership');
  this.own_ = JSON.parse(v);
  if (!this.own_)
    this.own_ = [];
}

GearOwnership.prototype.All = function() {
  return this.own_;
}

