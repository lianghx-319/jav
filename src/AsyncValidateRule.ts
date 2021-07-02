import { RuleItem, Rules, RuleType } from '@hanxx/async-validator'
import { assertNotExists } from './utils'

export type AnyFields = {
  [key: string]: any
}

export type Fields<K extends AnyFields> = Record<
  keyof K,
  AsyncValidateRule | AsyncValidateRule[]
>

export class AsyncValidateRule {
  static toRules<K extends AnyFields>(fields: Fields<K>) {
    return Object.entries(fields).reduce((rules, [key, value]) => {
      rules[key] = Array.isArray(value)
        ? value.map((v) => v.valueOf())
        : value.valueOf()
      return rules
    }, {} as Rules)
  }

  private readonly rule: RuleItem = {}

  /**
   * get async validate rule
   */
  valueOf() {
    return this.rule
  }

  /**
   * type string
   *
   * Must be of type `string`. This is the default type.
   */
  string() {
    this._createRuleType('string')
    return this
  }

  /**
   * type number
   *
   * Must be of type `number`.
   */
  number() {
    this._createRuleType('number')
    return this
  }

  /**
   * type boolean
   *
   * Must be of type `boolean`.
   */
  boolean() {
    this._createRuleType('boolean')
    return this
  }

  /**
   * type method
   *
   * Must be of type `function`.
   */
  method() {
    this._createRuleType('method')
    return this
  }

  /**
   * type regexp
   *
   * Must be an instance of `RegExp` or a string that does not generate an exception when creating a new `RegExp`.
   */
  regexp() {
    this._createRuleType('regexp')
    return this
  }

  /**
   * type integer
   *
   * Must be of type `number` and an integer.
   */
  integer() {
    this._createRuleType('integer')
    return this
  }

  /**
   * type float
   *
   * Must be of type `number` and a floating point number.
   */
  float() {
    this._createRuleType('float')
    return this
  }

  /**
   * type array
   *
   * Must be an array as determined by `Array.isArray`.
   */
  array(fields?: AsyncValidateRule[]) {
    this._createRuleType('array')
    if (fields) {
      this.required()
      const rules = AsyncValidateRule.toRules(
        fields.reduce((f, item, index) => {
          f[index.toString()] = item
          return f
        }, {} as Fields<AnyFields>),
      )
      this.rule.fields = { ...(this.rule.fields || {}), ...rules } as Record<
        string,
        RuleItem
      >
    }
    return this
  }

  /**
   * type object
   *
   * Must be of type `object` and not `Array.isArray`.
   */
  object<K extends AnyFields>(fields?: Fields<K>) {
    this._createRuleType('object')
    if (fields) {
      this.required()
      const rules = AsyncValidateRule.toRules(fields)
      this.rule.fields = { ...(this.rule.fields || {}), ...rules } as Record<
        string,
        RuleItem
      >
    }
    return this
  }

  /**
   * type enum
   *
   * Value must exist in the `enum`.
   *
   * @param value -  To validate a value from a list of possible values use the `enum` type with a `enum` property listing the valid values for the field
   *
   * Since version 3.0.0 if you want to validate the values `0` or `false` inside `enum` types, you have to include them explicitly.
   */
  enum(value: RuleItem['enum']) {
    this._createRuleType('enum')
    this.rule.enum = value
    return this
  }

  /**
   * type date
   *
   * Value must be valid as determined by `Date`.
   */
  date() {
    this._createRuleType('date')
    return this
  }

  /**
   * type url
   *
   * Must be of type `url`.
   */
  url() {
    this._createRuleType('url')
    return this
  }

  /**
   * type hex
   *
   * Must be of type `hex`.
   */
  hex() {
    this._createRuleType('hex')
    return this
  }

  /**
   * type email
   *
   * Must be of type `email`.
   */
  email() {
    this._createRuleType('email')
    return this
  }

  /**
   * type any
   *
   * Can be any type.
   */
  any() {
    this._createRuleType('any')
    return this
  }

  /**
   * The `required` rule property indicates that the field must exist on the source object being validated.
   */
  required(value = true) {
    this._canOnlyCallOnce(this.rule.required, 'required')
    this.rule.required = value
    return this
  }

  /**
   * The `pattern` rule property indicates a regular expression that the value must match to pass validation.
   */
  pattern(regexp: RuleItem['pattern']) {
    this._canOnlyCallOnce(this.rule.required, 'pattern')
    this.rule.pattern = regexp
    return this
  }

  /**
   * A range is defined using the `min` and `max` properties.
   *
   * For `string` and `array` types comparison is performed against the `length`,
   * for `number` types the number must not be less than `min` nor greater than `max`.
   */
  min(value: RuleItem['min']) {
    this._canOnlyCallOnce(this.rule.min, 'min')
    this.rule.min = value
    return this
  }

  /**
   * A range is defined using the `min` and `max` properties.
   *
   * For `string` and `array` types comparison is performed against the `length`,
   * for `number` types the number must not be less than `min` nor greater than `max`.
   */
  max(value: RuleItem['max']) {
    this._canOnlyCallOnce(this.rule.max, 'max')
    this.rule.max = value
    return this
  }

  /**
   * To validate an exact length of a field specify the `len` property.
   *
   * For `string` and `array` types comparison is performed on the `length` property,
   * for the `number` type this property indicates an exact match for the `number`, ie,
   * it may only be strictly equal to `len`.
   *
   * If the `len` property is combined with the `min` and `max` range properties, `len` takes precedence.
   */
  length(value: RuleItem['len']) {
    this._canOnlyCallOnce(this.rule.len, 'length')
    this.rule.len = value
    return this
  }

  /**
   * It is typical to treat required fields that only contain whitespace as errors.
   * To add an additional test for a string that consists solely of whitespace add a `whitespace` property to a rule with a value of `true`.
   * The rule must be a `string` type.
   *
   * You may wish to sanitize user input instead of testing for whitespace,
   * use `transform` method that would allow you to strip whitespace.
   */
  whitespace() {
    this._canOnlyCallOnce(this.rule.whitespace, 'whitespace')
    if (this.rule.type !== 'string') {
      throw Error(`The rule must be a string type while setting whitespace`)
    }
    this.rule.whitespace = true
    return this
  }

  /**
   * Depending upon your application requirements,
   * you may need i18n support or you may prefer different validation error messages.
   */
  message(value: RuleItem['message']) {
    this._canOnlyCallOnce(this.rule.message, 'message')
    this.rule.message = value
    return this
  }

  /**
   * `suppressWarning`: Boolean, whether to suppress internal warning about invalid value.
   *
   * `first`: Boolean, Invoke `callback` when the first validation rule generates an error,
   * no more validation rules are processed.
   * If your validation involves multiple asynchronous calls (for example, database queries)
   * and you only need the first error use this option.
   *
   * `firstFields`: Boolean|String[],
   * Invoke `callback` when the first validation rule of the specified field generates an error,
   * no more validation rules of the same field are processed. `true` means all fields.
   */
  options(value: RuleItem['options']) {
    this._canOnlyCallOnce(this.rule.options, 'options')
    this.rule.options = value
    return this
  }

  /**
   * The `defaultField` property can be used with the `array` or `object` type
   * for validating all values of the container.
   * It may be an `object` or `array` containing validation rules.
   */
  defaultField(value: AsyncValidateRule) {
    this._canOnlyCallOnce(this.rule.defaultField, 'defaultField')
    this.rule.defaultField = value.valueOf()
    return this
  }

  /**
   * Sometimes it is necessary to transform a value before validation,
   * possibly to coerce the value or to sanitize it in some way.
   * To do this add a `transform` function to the validation rule.
   * The property is transformed prior to validation
   * and re-assigned to the source object to mutate the value of the property in place.
   */
  transform(value: RuleItem['transform']) {
    this._canOnlyCallOnce(this.rule.transform, 'transform')
    this.rule.transform = value
    return this
  }

  /**
   * You can custom validate function for specified field
   */
  validator(value: RuleItem['validator']) {
    this._canOnlyCallOnce(this.rule.validator, 'validator')
    this.rule.validator = value
    return this
  }

  /**
   * You can customize the asynchronous validation function for the specified field
   */
  asyncValidator(value: RuleItem['asyncValidator']) {
    this._canOnlyCallOnce(this.rule.asyncValidator, 'asyncValidator')
    this.rule.asyncValidator = value
    return this
  }

  private _createRuleType(type: RuleType) {
    assertNotExists(
      this.rule.type,
      `Can declare type once, but declare ${type} after ${
        this.rule.type || '[Bug if see that]'
      }`,
    )
    this.rule.type = type
  }

  private _canOnlyCallOnce(value: any, methodName: keyof AsyncValidateRule) {
    assertNotExists(value, `Method: ${methodName} can only call once`)
  }
}
