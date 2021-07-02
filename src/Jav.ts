import Schema, {
  ValidateCallback,
  ValidateOption,
  Values,
} from '@hanxx/async-validator'
import { AnyFields, AsyncValidateRule, Fields } from './AsyncValidateRule'

class JavSchema<K extends AnyFields> extends Schema {
  static schema<C extends AnyFields>(fields: Fields<C>) {
    return new JavSchema(fields)
  }

  constructor(fields: Fields<K>) {
    const rules = AsyncValidateRule.toRules(fields)
    super(rules)
  }

  validate(
    source: Values,
    option: ValidateOption,
    callback: ValidateCallback,
  ): Promise<K>
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  validate(source: Values, callback: ValidateCallback): Promise<K>
  validate(source: Values): Promise<K>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  validate(source_: Values, o: any = {}, oc: any = () => {}): Promise<K> {
    // eslint-disable-next-line promise/prefer-await-to-then
    return super.validate(source_, o, oc).then((valid) => valid as K)
  }
}

type ProxyJav = typeof JavSchema & Omit<AsyncValidateRule, 'valueOf'>

export const Jav = new Proxy(JavSchema, {
  get(target, propKey: keyof ProxyJav) {
    switch (propKey) {
      case 'schema':
        return JavSchema.schema
      case 'prototype':
      case 'register':
      case 'messages':
      case 'warning':
      case 'validators':
        return Schema[propKey]
      default:
        // eslint-disable-next-line no-case-declarations
        const rule = new AsyncValidateRule()
        return rule[propKey].bind(rule)
    }
  },
  set(target, propKey: keyof ProxyJav, value: any) {
    switch (propKey) {
      case 'messages':
      case 'warning':
        Schema[propKey] = value
        return true
      default:
        return true
    }
  },
}) as ProxyJav
