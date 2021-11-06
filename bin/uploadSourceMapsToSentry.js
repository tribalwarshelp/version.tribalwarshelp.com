const SentryCli = require('@sentry/cli');

async function createReleaseAndUpload() {
  if (process.env.REACT_APP_ENABLE_SENTRY !== 'true') {
    return;
  }

  const version = process.env.REACT_APP_VERSION;
  if (!version) {
    throw new Error(
      'Version not set (you can do it via the REACT_APP_VERSION env variable)'
    );
  }

  const cli = new SentryCli();
  await cli.releases.new(version);
  await cli.releases.uploadSourceMaps(version, {
    include: ['build/static/js'],
    urlPrefix: '~/static/js',
    rewrite: false,
  });
  await cli.releases.finalize(version);
}

createReleaseAndUpload();
