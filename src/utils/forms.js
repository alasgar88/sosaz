import { Rule } from 'antd/lib/form';

export const FORM_PAGE_COL_WIDTH = 8;
export const REQUIRED_FIELD = 'Məcburi xanadır';
export const REQUIRED_FIELD_EMAIL = 'Zəhmət olmasa emailinizi yazın';
export const REQUIRED_FIELD_PASSWORD = 'Zəhmət olmasa parolunuzu yazın';
export const REQUIRED_FIELD_PASSWORD_CONFIRM =
  'Zəhmət olmasa parolunuzu yenidən yazın';
export const REQUIRED_FIELD_EMAIL_ERROR = 'Zəhmət olmasa email yazın';
export const PLACE_HOLDER_ENDING = 'daxil edin';
export const FORM_SAVE_TEXT = 'Yadda Saxla';
export const FORM_CONFIRM = 'Təsdiq et';
export const FORM_CANCEL = 'İmtina et';
export const FORM_NUMBER_INPUT_MASK = '+000 (00) 000 00 00';
export const FORM_UPLOAD_IMAGE_TEXT = 'Şəkil yüklə';
export const FORM_UPLOAD_ACCEPT = 'image/png, image/jpeg';
export const IMG_CROP_TITLE_TEXT = 'Şəkili redaktə et';

export const REQUIRED_FIELD_FILE = [
  { required: true, message: REQUIRED_FIELD },
];

export const EMAIL_ADDRESS_PLACEHOLDER = `Elektron poçt ${PLACE_HOLDER_ENDING}`;

// export const CENTER_NAME_REQUIRED_FILE = [
//   { min: 3, max: 3, message: 'Mərkəzin qısa adı 3 simvoldan ibarət olmalıdır' },
//   { required: true, message: REQUIRED_FIELD },
// ];

export const REQUIRED_FIELD_RULES = [
  { required: true, message: REQUIRED_FIELD },
  { whitespace: true, message: REQUIRED_FIELD },
];

export const REQUIRED_FIELD_EMAIL_RULES = [
  { type: 'email', message: REQUIRED_FIELD_EMAIL_ERROR, required: true },
];

export const REQUIRED_NUMBER_FIELD_RULES = [
  { required: true, message: REQUIRED_FIELD },
];

export const REQUIRED_INPUT_MASK = [
  {
    required: true,
    pattern: /^\+([0-9]{1,3}) \([0-9]{2}\) [0-9]{3} [0-9]{2} [0-9]{2}$/,
    message: 'Nömrə tam şəkildə daxil edilməlidir',
  },
];

// export const GENDERS = [
//   { key: 0, label: SexMappings[Sex.M], value: Sex.M },
//   { key: 1, label: SexMappings[Sex.F], value: Sex.F },
// ];

// export const PASSPORT_TYPE = [
//   {
//     key: 0,
//     label: PassportTypeMappings[PassportType.Blue],
//     value: PassportType.Blue,
//   },
//   {
//     key: 1,
//     label: PassportTypeMappings[PassportType.Red],
//     value: PassportType.Red,
//   },
// ];

// export const SETTING_USER_OPTIONS_REGISTER = [
//   {
//     key: 0,
//     label: 'Admin',
//     value: '0',
//   },
//   { key: 1, label: 'Moderator', value: '1' },
//   { key: 2, label: 'Usta', value: '2' },
//   { key: 3, label: 'User', value: '3' },
//   { key: 4, label: 'Hüquqi şəxs', value: '4' },
// ];

export const SETTING_USER_OPTIONS = [
  {
    key: 0,
    value: 0,
    label: 'Admin',
  },
  { key: 1, value: '1', label: 'Moderator' },
];
