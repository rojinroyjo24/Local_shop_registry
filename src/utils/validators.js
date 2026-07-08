/**
 * Validate an email address format.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { valid: false, message: 'Email is required' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' }
  }
  return { valid: true, message: '' }
}

/**
 * Validate a password.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: 'Password is required' }
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' }
  }
  return { valid: true, message: '' }
}

/**
 * Validate the shop registration form data.
 * @param {object} data
 * @returns {{ valid: boolean, errors: object }}
 */
export function validateShopForm(data) {
  const errors = {}

  if (!data.shop_name || !data.shop_name.trim()) {
    errors.shop_name = 'Shop name is required'
  } else if (data.shop_name.trim().length < 2) {
    errors.shop_name = 'Shop name must be at least 2 characters'
  }

  if (!data.category) {
    errors.category = 'Please select a category'
  }

  if (!data.address) {
    errors.address = 'Please select an address using the autocomplete'
  }

  if (data.latitude === null || data.latitude === undefined || data.longitude === null || data.longitude === undefined) {
    errors.address = 'Please select a valid location from the suggestions'
  }

  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be under 500 characters'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
