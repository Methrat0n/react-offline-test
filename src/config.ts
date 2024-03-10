class Config {
  public readonly datagrid = {
    url: function(this: Config) {
      if(this.env.isDev()) {
        return "https://api.carbonintensity.org.uk/generation"
      }
      // TODO other envs
      return "https://api.carbonintensity.org.uk/generation"
    }.bind(this)
  }
  public readonly env = {
    isDev: function(this: Config) {
      return true;
      // TODO other envs
    }.bind(this)
  }
}

export default new Config();