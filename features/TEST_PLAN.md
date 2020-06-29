# Acceptance Test Plan

## Summary

This document describes the acceptance test level activities on the E-Commerce Site for Libri.

# Scope of the testing

Test analysis identified the following areas that need to be covered by automated acceptance tests:
  * Sign in
  * Sign up
  * Advanced product search
  * Shopping cart management (adding and removing products)
  * Checkout process initiation

Checkout process in its entireity is not in scope for automated testing due to its interworking nature, and needs to be thoroughly covered with manual testing.

# Prerequisites

The E-commerce site needs to be deployed, fully functional, and accessible for the testing crew.

A user needs to be registered with the following credentials:

| Attribute | Value |
| --- | --- |
| Username | `* redacted *` |
| Password | `* redacted *` |

The browser used for testing should not store any user information or state, preferably use Incognito mode.

# Test case definitions

## Sign in feature

### AT-SIGNIN-0001 - Sign in - Success

__Priority__: HIGH

__Requirement Ref__: [REQ-SIGNIN-012]()

#### Test steps

| # | Action | Expected outcome |
| --- | --- | --- |
| 1. | Navigate to the starting page of the E-commerce site | The starting site is rendered, with a popup displaying information on Cookie usage |
| 2. | Accept the cookie usage settings | The popup disappears, the starting site is usable |
| 3. | Click `Belépés` in order to initiate the Sign in process | A form is show for sign in credentials |
| 4. | Input valid Sign in credentials: `* redacted username *` / `* redacted *` ||
| 5. | Submit the form | Signing in succeeds, the option to log out is now displayed |

### AT-SIGNIN-0002 - Sign in - Incorrect password

__Priority__: HIGH

__Requirement Ref__: [REQ-SIGNIN-012]()

#### Test steps

| # | Action | Expected outcome |
| --- | --- | --- |
| 1. | Navigate to the starting page of the E-commerce site | The starting site is rendered, with a popup displaying information on Cookie usage |
| 2. | Accept the cookie usage settings | The popup disappears, the starting site is usable |
| 3. | Click `Belépés` in order to initiate the Sign in process | A form is show for sign in credentials |
| 4. | Input invalid Sign in credentials: `* redacted username *` / `* redacted email *` ||
| 5. | Submit the form | Sign in fails with a message saying: "Érvénytelen" |

## Sign up feature

### AT-SIGNUP-0001 - Sign up - Existing email

__Priority__: MEDIUM

__Requirement Ref__: [REQ-SIGNUP-314]()


#### Test steps

| # | Action | Expected outcome |
| --- | --- | --- |
| 1. | Navigate to the starting page of the E-commerce site | The starting site is rendered, with a popup displaying information on Cookie usage |
| 2. | Accept the cookie usage settings | The popup disappears, the starting site is usable |
| 3. | Click `Regisztráció` in order to initiate the Sign up process | A form is show for sign up details |
| 4. | Input Sign up details: `Test user` / `* redacted email *` / `myInsecurePassword` ||
| 5. | Submit the form | Signup fails with an email validation error saying: "Ilyen e-mail címmel már regisztráltak" |

## Advanced product search feature

...
