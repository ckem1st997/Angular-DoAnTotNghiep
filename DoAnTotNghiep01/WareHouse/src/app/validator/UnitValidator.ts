import { Validator } from 'fluentvalidation-ts';
import { Unit } from "../entity/Unit";

export class UnitValidator extends Validator<Unit> {
    constructor() {
        super();

        this.ruleFor('unitName')
            .notEmpty()
            .notNull()
            .withMessage('Xin vui lòng nhập tên của bạn !')
            .minLength(5).withMessage('Độ dài min là 5')
            .maxLength(9).withMessage('Độ dài max là 9');
            this.ruleFor('id')
            .notEmpty()
            .notNull()
            .withMessage('Xin vui lòng nhập id của bạn !');
    }
}
