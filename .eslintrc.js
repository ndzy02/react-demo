module.exports = {
  extends: [
    'airbnb',
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:markdown/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'babel', 'jest', '@typescript-eslint', 'react-hooks', 'unicorn', 'markdown'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // 禁止未使用过的变量
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        // 禁止未使用过的表达式
        'no-unused-expressions': 0,
        '@typescript-eslint/no-unused-expressions': 2,
      },
    },
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'], // 禁止使用拖尾逗号
    //------------
    'default-case': 0, // 要求 Switch 语句中有 Default 分支
    //------------
    'eol-last': 0, // 禁止文件末尾保留一行空行
    //------------
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
    //------------
    'prefer-rest-params': 0, // 建议使用剩余参数代替 arguments
    //------------
    'max-classes-per-file': 0, // 强制每个文件中包含的的类的最大数量
    //------------
    'no-console': 0, // 禁止打印
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // 禁止使用一元操作符 ++ 和 --
    'no-script-url': 0, // 禁止脚本网址
    'no-param-reassign': 0, // 禁止对函数参数再赋值
    'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线
    'no-continue': 0, // 禁用 continue
    'no-restricted-globals': 0, // 禁用特定的全局变量
    'no-use-before-define': 0, // 禁止在定义前使用
    'no-shadow': 0, // 禁止变量声明覆盖外层作用域的变量
    'no-undef': 0, // 禁用未声明的变量
    //------------
    'react/no-access-state-in-setstate': 0,
    'react/no-multi-comp': 0,
    'react/no-array-index-key': 0,
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/destructuring-assignment': 0,
    //------------
    'unicorn/better-regex': 2,
    'unicorn/prefer-string-trim-start-end': 2,
    'unicorn/expiring-todo-comments': 2,
    'unicorn/no-abusive-eslint-disable': 2,
    //------------
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'site/**',
          'tests/**',
          'scripts/**',
          '**/*.test.js',
          '**/__tests__/*',
          '*.config.js',
          '**/*.md',
        ],
      },
    ],
    //------------
    'jest/no-test-callback': 0,
    'jest/no-done-callback': 0,
    'jest/no-conditional-expect': 0,
    'jest/expect-expect': 0,
    'jest/valid-title': 0,
    //------------
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/label-has-for': 0,
    //------------
    '@typescript-eslint/no-use-before-define': 2, // 禁止在定义前使用
    '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }], // 禁止变量声明覆盖外层作用域的变量
    //------------
  },
};
