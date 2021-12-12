import { Validator } from 'fluentvalidation-ts';
import { Unit } from "../entity/Unit";

export class UnitValidator extends Validator<Unit> {
    constructor() {
        super();

        this.ruleFor('unitName')
            .notEmpty()
            .withMessage('Xin vui lòng nhập tên của bạn !');
    }
}
