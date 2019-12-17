import { extend } from 'vee-validate';
import { required, email, length } from 'vee-validate/dist/rules';

// Правила валидации для Vee-Validate
extend('required', { ...required, message: 'Заполните это поле' });
extend('selectRequired', { ...required, message: 'Выберите вариант' });
extend('email', { ...email, message: 'Введите E-mail' });
extend('accept', checked => (checked ? true : 'Вы не приняли условия'));
extend('length', { ...length, message: 'Введены не все цифры' });
