const gulp = require('gulp');
const zip = require('gulp-zip');
const filter = require('gulp-filter');
const bump = require('gulp-bump');
const crx = require('gulp-crx-pack');
const del = require('del');
const argv = require('minimist')(process.argv.slice(2));
const log = require('fancy-log');
const c = require('ansi-colors');
const manifest = require('./extension/manifest.json');
const config = require('./build.json');
const fs = require('fs');
const semver = require('semver');

// version bump task - should only be used with major/minor/patch version type
// as semver is not supported by extension manifest
gulp.task('bump', () => {
    const versionType = argv.type || 'patch';
    const newVer = semver.inc(manifest.version, versionType);
    log(`Bumping version: ${c.yellow(versionType)} from ${c.cyan(manifest.version)} to ${c.magenta(newVer)}`);

    // uses gulp-filter
    const manifestFilter = filter('**/manifest.json', {restore: true});
    const regularJsons = filter(['**', '!**/manifest.json']);

    return gulp.src(['extension/manifest.json', 'package.json', 'package-lock.json'])
        .pipe(bump({version: newVer}))
        .pipe(manifestFilter)
        .pipe(gulp.dest('./extension'))
        .pipe(manifestFilter.restore)
        .pipe(regularJsons)
        .pipe(gulp.dest('./'));
});

gulp.task('zip', () => {
    const packageName = getPackageName() + '.zip';
    log(`Packaging extension ${c.magenta(packageName)}`);
    return gulp.src('./extension/**/*')
        .pipe(zip(packageName))
        .pipe(gulp.dest('./dist'));
});

gulp.task('crx', () => {
    const packageName = getPackageName() + '.crx';
    log(`Packaging extension ${c.magenta(packageName)}`);
    return gulp.src('./extension')
        .pipe(crx({
            privateKey: fs.readFileSync(config.keyfile, 'utf8'),
            filename: packageName
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.parallel('zip', 'crx'));

function getPackageName() {
    return `${manifest.name.toLowerCase().replace(/ /g, '_')}_${manifest.version_name ? manifest.version_name : manifest.version}`;
}