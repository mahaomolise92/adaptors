# @openfn/language-ocl

## 1.1.4

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 1.1.3

### Patch Changes

- Updated dependencies [26a303e]
  - @openfn/language-common@1.10.2

## 1.1.2

### Patch Changes

- Updated dependencies [8c32eb3]
  - @openfn/language-common@1.10.1

## 1.1.1

### Patch Changes

- 3f3c0c5: update tests
- Updated dependencies [aad9549]
  - @openfn/language-common@1.10.0

## 1.1.0

### Minor Changes

- 29e335d: remove body in get request

## 1.0.2

### Patch Changes

- Updated dependencies [111807f]
  - @openfn/language-common@1.9.0

## 1.0.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 1.0.0

### Major Changes

- 2c1d603: Remove parameter reassignment to ensure proper functioning inside an
  `each` block; add eslint

  The packages receiving a major bump here exposed functions that didn't work as
  expected inside `each` blocks. Users were previously wrapping these functions
  inside their own custom `fn` blocks, and this change will ensure that they can
  be used inside a standard each.

  See https://github.com/OpenFn/adaptors/issues/275 for more details.

### Patch Changes

- Updated dependencies [2c1d603]
  - @openfn/language-common@1.8.0

## 0.3.0

### Minor Changes

- 63232eb: Add `get()` and `getMappings()` function

## 0.2.6

### Patch Changes

- Updated dependencies [929bca6]
  - @openfn/language-common@1.7.7

## 0.2.5

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.2.4

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.2.3

### Patch Changes

- f2aed32: add examples

## 0.2.2

### Patch Changes

- 6d8de03: change @constructor to @function and remove /\*_ @module Adaptor _/

## 0.2.1

### Patch Changes

- f2a91a4: Update package exports
- Updated dependencies [f2a91a4]
  - @openfn/language-common@1.7.5

## 0.2.0

### Minor Changes

- 5a06d7f: Migrate OCL, update package export

### Patch Changes

- cb5d0ed: Updated to @openfn/simple-ast v0.4.1
- 8566b26: Fix typings
- b3d45ff: Fix CJS export of npm package.
- ecf5d30: remove sinon since it was not being used
- Updated dependencies [8566b26]
- Updated dependencies [b3d45ff]
- Updated dependencies [b5eb665]
- Updated dependencies [ecf5d30]
  - @openfn/language-common@1.7.4
