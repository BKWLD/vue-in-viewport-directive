module.exports = function({ config, mode }) {
  
  // Add to resolve extensions
  config.resolve.extensions.push('.coffee')
  
  // Add Coffeescript
  config.module.rules.push({
    test: /\.coffee$/,
    loader: 'babel-loader!coffee-loader',
  })
  
  return config
};
