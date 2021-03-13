const path = require('path');
const {
  useBabelRc,
  override,
  addWebpackAlias,
  addWebpackPlugin,
  setWebpackOptimizationSplitChunks,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const eslintConfig = require('./.eslintrc.js');

const env = process.env.NODE_ENV;
const aliasConfig = {
  '@': path.resolve(__dirname, 'src'),
  assets: path.resolve(__dirname, 'src/assets'),
  components: path.resolve(__dirname, 'src/components'),
};
const splitChunksConfig = {
  chunks: 'all', // 默认作用于异步chunk，值为all/initial/async
  minSize: 30000, // 默认值是30kb,代码块的最小尺寸
  maxSize: 30000,
  minChunks: 1, // 被多少模块共享,在分割之前模块的被引用次数
  maxAsyncRequests: 5, // 按需加载最大并行请求数量
  maxInitialRequests: 5, // 一个入口的最大并行请求数量
  name: true, // 打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
  automaticNameDelimiter: '~', // 默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
  cacheGroups: {
    // 设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
    vendors: {
      test: /node_modules/, // 条件
      priority: -10, // 优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
    },
    commons: {
      minSize: 0, // 最小提取字节数
      minChunks: 2, // 最少被几个chunk引用
      priority: -20,
      reuseExistingChunk: true, //    如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
    },
  },
};
const styleLintConfig = {
  context: 'src',
  configFile: path.resolve(__dirname, '.stylelintrc.json'),
  files: '**/*.(s(c|a)ss|css)',
  failOnError: true,
  quiet: true,
  fix: true, // 修复不规范的样式代码
};
const devConfig = { eslint: eslintConfig };
const prodConfig = { shouldUseSourceMap: false };

/**
 * @description 自定义配置
 * @param configRules 自定义配置  config override 传递的配置
 */
const useRc = configRules => config => {
  const { dev, prod } = configRules;
  if (env === 'development') {
    // eslint 配置
    config.module.rules = config.module.rules.map(rule => {
      // Only target rules that have defined a `useEslintrc` parameter in their options
      if (rule.use && rule.use.some(use => use.options && use.options.useEslintrc !== void 0)) {
        const ruleUse = rule.use[0];
        const baseOptions = ruleUse.options;
        const baseConfig = baseOptions.baseConfig || {};
        ruleUse.options = {
          useEslintrc: false,
          ignore: true,
          baseConfig: { ...baseConfig, ...dev.eslint },
        };
        return rule;

        // Rule not using eslint. Do not modify.
      }
      return rule;
    });
  }
  if (env === 'production') {
    // 隐藏源码
    config.devtool = prod.shouldUseSourceMap;
    config.optimization.minimizer = config.optimization.minimizer.map((_, index) => {
      if (index === 0) {
        _.options.sourceMap = prod.shouldUseSourceMap;
      }
      if (index === 1) {
        _.options.cssProcessorOptions.map = prod.shouldUseSourceMap;
      }
      return _;
    });
  }
  return config;
};

const envs = {
  development: override(
    useBabelRc(),
    addWebpackAlias(aliasConfig),
    addWebpackPlugin(new StyleLintPlugin(styleLintConfig)),
    useRc({ dev: devConfig, prod: prodConfig }),
  ),
  production: override(
    useBabelRc(),
    addWebpackAlias(aliasConfig),
    setWebpackOptimizationSplitChunks(splitChunksConfig),
    addWebpackPlugin(new BundleAnalyzerPlugin()),
    useRc({ dev: devConfig, prod: prodConfig }),
  ),
};

module.exports = envs[env];
