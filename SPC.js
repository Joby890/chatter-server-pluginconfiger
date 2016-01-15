module.exports = function(chatter) {
  this.onEnable = function() {

    chatter.listenToAll("PluginStateSwitch", function(data) {
      var plugin = chatter.pluginManager.getPlugin(data.name);
      if(plugin.isEnabled()) {
        console.log("Running Disable!");
        chatter.pluginManager.disablePlugin(plugin);
      }  else {
        console.log("Running enable");
        chatter.pluginManager.enablePlugin(plugin);
      }
      update();
    });
    chatter.listenToAll("ServerPluginList", function(data) {
      update();
    });
    chatter.pluginManager.registerEvent(this, "UserConnectEvent", function(event) {
      update(event.user);
    });
  };

  function update(user) {
    var plugins = chatter.pluginManager.getPlugins().map(function(plugin) {
      return {name: plugin.name, enabled: plugin.isEnabled()};
    });
    chatter.send("ServerPluginList", plugins, user);
  }
};
