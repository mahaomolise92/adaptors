# OpenFn Adaptors ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/ci.yaml/badge.svg)

The new home for all @openfn language adaptors.

**N.B.: We hope to migrate our 60+ adaptors here over the coming weeks.**

This repo requires [pnpm](https://pnpm.io/installation) to be installed globally
on your machine.

## Getting Started

A few first time repo steps:

Install tool versions with [asdf](https://github.com/asdf-vm/asdf)

```
asdf install
```

Install pnpm:

```
npm install -g pnpm
```

And run the setup command:

```
pnpm run setup
```

## Running scripts

Every repo provides a common set of npm scripts:

To run them for all scripts in `packages`, call
`pnpm --filter "./packages/** <script>`.

For example:

```
pnpm --filter "./packages/**" build
pnpm --filter "./packages/**" test
```

## Changesets

Any submitted PRs should have an accompanying
[`changeset`](https://github.com/changesets/changesets).

A changeset is a text file with a list of what you've changed and a short
summary. Changesets are stored in a temporary folder until a release, at which
point they are merged into the changelogs of the affected packges.

Adding a changeset is really easy thanks to a very friendly CLI.

To create a changeset, run this from the repo root:

```
pnpm changeset
```

Look in the `.changesets` folder to see your change.

Commit the changeset to the repo when you're ready.

## Releases

To release, run this from the root:

```
pnpm changeset version
```

This will bump all changed packages and update their release notes.

Then install packages and commit changes with:

```
pnpm install
```

Build the adaptors with:

```
pnpm -r run build
```

To publish the release, run:

```
pnpm changeset publish
```

And finally, push the tags to Github so that the source code can be browsed for
each new release with:

```
git push --follow-tags
```

## Development

You can develop a new adaptor from scratch or extend an existing one.

### Extending an adaptor

Extending an adaptor equals adding one or multiple new operations. The new
operations can be added inside the `src/Adaptor.js` file of the adaptor.

<img src="/img/srcfolder.png" width="400" />

### Developing a new adaptor

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Copy a template `cp packages/template packages/{adaptor-name}`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`

### Default operation

This template contains a default `create` operation that can be customized
according to the objectives of the new adaptor.

```js
export function create(path, params, callback) {
  return state => {
    // expand references for the data argument with state
    // do the work
    // return state
  };
}
```

### Using language-common

To leverage the last tested available version of our language-common adaptor,
consider importing the one published in `npm` through `@openfn/language-common`.

Accordingly, your `package.json` should add a dependency to that version as this
(snippet taken from `language-postgresql`):

```json
{
  "dependencies": {
    "@openfn/language-common": "^1.4.0",
    "pg": "^8.3.2",
    "pg-format": "^1.0.4"
  },
  ...rest
}
```

In many cases, it's useful to be able to execute regular HTTP requests inside a
specialized adaptor (e.g. posting the output of a Primero case fetch to an
OpenFn inbox). Considering these types of situations, `language-common`
implements and exports an `http` module. To use `http` in any job executed with
a specific adaptor consider exporting it directly from `language-common`.

```js
...
export {
  fn,
  ...
  http,
  ...
  sourceValue,
} from '@openfn/language-common';
```

### Tests

Tests can be written with nock under the path `test/index.js`.

```js
describe('createPatient', () => {
  before(() => {
    nock('https://fakepatient.server.com')
      .post('/api/patients')
      .reply(200, (uri, requestBody) => {
        return { ...requestBody, fullName: 'Mamadou', gender: 'M' };
      });
  });

  it('makes a post request to the patient endpoint', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fakepatient.server.com',
        username: 'hello',
        password: 'there',
      },
      data: {
        fullName: 'Mamadou',
        gender: 'M',
      },
    };

    const finalState = await execute(
      create('api/patients', {
        name: dataValue('fullName')(state),
        gender: dataValue('gender')(state),
      })
    )(state);

    expect(finalState.data).to.eql({
      fullName: 'Mamadou',
      gender: 'M',
    });
  });
});
```

Run your tests with `npm run test`. Tests are written to assess dummy calls on
the available helper functions.

```sh
 ~/devtools/adaptors/adaptor > npm run test

> language-template@1.0.0 test /home/taylor/devtools/adaptors/adaptor
> mocha --require @babel/register



  execute
    ✓ executes each operation in sequence
    ✓ assigns references, data to the initialState

  create
    ✓ makes a post request to the right endpoint
    ✓ throws an error for a 404
    ✓ handles and throws different kinds of errors

  createPatient
    ✓ makes a post request to the patient endpoint


  6 passing (16ms)

 ~/devtools/adaptors/adaptor >
```

When writing tests, bear in mind as well for scenarios that could trigger
errors.

```js
describe('create', () => {
  before(() => {
    nock('https://fake.server.com')
      .post('/api/noAccess')
      .reply(404, (uri, requestBody) => {
        return { detail: 'Not found.' };
      });

  it('throws an error for a 404', async () => {
    const state = {
      configuration: {
        baseUrl: 'https://fake.server.com',
        username: 'hello',
        password: 'there',
      },
    };
    const error = await execute(create('api/noAccess', { name: 'taylor' }))(
      state
    ).catch(error => {
      return error;
    });
    expect(error.message).to.eql('Request failed with status code 404');
  });

});
```

## Build tooling

The `build` command accepts a list of build steps as arguments: `ast`, `src`,
`docs` and `dts`. Calling build on an adaptor with no arguments will build
everything.

Each adaptor's build command should simply call `build-adaptor` with the package
name.

You can run `build --help` for more information.

## Migration Guide

Adaptors should be copied/cloned into this repo, with all build, lint and git
artifacts removed and the package.json updated.

This checklist walks you through the process.

First, create a new branch for your work:

```
git checkout -b migrate_<name>
```

Then, copy the adaptor into `packages/<name>` (ignoring the `language-` prefix,
ie, `language-http` -> `http`). You can `cd` into `package` and `git clone`
straight from github if you like.

Next, from the `adaptors` root folder, run the migration script:

```
pnpm migrate <name>
```

For example, `pnpm migrate http`.

Then, from inside your new `packages/<name>`:

- Remove the `.git` directory
- Commit your changes `git commit -am "cloned <name> into monorepo"`
- Delete `package-lock.json`
- Remove `bundledDependencies` from package.json
- Fix index.js (see `index.js` below)
- Run `pnpm install`
- Remove the `docs` and `lib` dirs
- Remove `.prettierrc`
- Remove any references to `babel` (ie, `.babelrc`) and `esdoc` (ie,
  `esdoc.json`)
- Remove the `.gitignore` file (update the top level ignore if neccessary)
- Remove the `Makefile`
- Remove the `.devcontainer`
- Remove the `.tool-versions`
- Remove the all files related to Travis CI (`travis.yml`, `.travis.yml`, ...)
- Update the readme (see the `Readme` below)
- Fix unit tests (see `Tests` below)
- run `git add packages/<name>` from the root folder to allow pnpm to detect
  `<name>` as changed package
- run `pnpm changeset` from the repo root to register a changeset (add a minor
  version bump for the package).
- Commit your changes, including the changeset, and open a pull request against
  `main`.

### index.js

The index.js file should be exactly this:

```
import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
```

The first two lines export the Adaptor object as the default export from the
module, so you can do `import common from '@openfn/common'`

The second line exports every export of Adaptor from the main index, so you can
do `import { fn } from '@openfn/common'`.

### Readme

The readme probably has a section called "Development".

Replace this section with:

```
## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the `Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
```

In addition, you may need to replace any references to `npm` with `pnpm`

### Tests

You'll need to update tests and get them passing.

Instead of importing test files from `lib`, import directly from `src`.

Ie, replace `import Adaptor from '../lib/Adaptor'` becomes
`import Adaptor from '../src/Adaptor'`
