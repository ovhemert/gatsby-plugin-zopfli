const fs = require('fs')
const path = require('path')
const test = require('tap').test

const tested = require('../src/worker')

test('zopfli compresses test file', t => {
  const cwd = t.testdir({
    public: {
      'test.js': 'contents'
    }
  })
  const from = path.join(cwd, 'public/test.js')
  const to = path.join(cwd, 'public/test.js.gz')

  tested({ from, to })
    .then(res => {
      const compressed = path.join(cwd, 'public/test.js.gz')
      t.ok(fs.existsSync(compressed))
    })
    .catch(err => t.fail(err))
    .finally(() => t.end())
})
