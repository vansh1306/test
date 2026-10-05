const { spawnSync } = require('child_process');

const result = spawnSync('npx', ['jest', '--ci', '--colors'], {
  stdio: 'inherit',
  shell: true,
});

if (result.status === 0) {
  console.log('\n✅ All tests passed');
  process.exit(0);
} else {
  console.error('\n❌ Tests failed — check the output above');
  process.exit(result.status || 1);
}