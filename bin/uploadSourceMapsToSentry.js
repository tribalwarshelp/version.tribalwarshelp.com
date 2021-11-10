const SentryCli = require('@sentry/cli');

async function createReleaseAndUpload() {
  if (process.env.REACT_APP_SENTRY_ENABLED !== 'true') {
    return;
  }

  const version = process.env.REACT_APP_VERSION;
  if (!version) {
    throw new Error(
      'Version not set (you can do it via the REACT_APP_VERSION env variable)'
    );
  }

  const releaseName = 'twhelp-version-website@' + version;

  const cli = new SentryCli();
  await cli.releases.new(releaseName);
  await cli.releases.uploadSourceMaps(releaseName, {
    include: ['build/static/js'],
    urlPrefix: '~/static/js',
    rewrite: false,
  });
  await cli.releases.finalize(releaseName);
}

createReleaseAndUpload();
