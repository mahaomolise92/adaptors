# @openfn/language-nexmo

## 0.4.1

### Patch Changes

- Updated dependencies [df09270]
  - @openfn/language-common@1.10.3

## 0.4.0

### Minor Changes

- 8591b67: - update nexmo to `v2.9.1``
  - expandReferences on sendSMS

## 0.3.1

### Patch Changes

- Update lock files
- Updated dependencies
  - @openfn/language-common@1.8.1

## 0.3.0

### Minor Changes

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

## 0.2.3

### Patch Changes

- 14f481e: mark execute as private
- Updated dependencies [2b4c61a]
  - @openfn/language-common@1.7.6

## 0.2.2

### Patch Changes

- f7ebd3c: remove sample configuration

## 0.2.1

### Patch Changes

- f2aed32: add examples

## 0.2.0

### Minor Changes

- f0f2495: migrate nexmo
