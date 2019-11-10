declare interface FormikValues {
  [field: string]: any;
}
declare type FormikErrors<Values> = {
  [K in keyof Values]?: Values[K] extends any[] ? Values[K][number] extends object ? FormikErrors<Values[K][number]>[] | string | string[] : string | string[] : Values[K] extends object ? FormikErrors<Values[K]> : string;
};
declare type FormikTouched<Values> = {
  [K in keyof Values]?: Values[K] extends any[] ? Values[K][number] extends object ? FormikTouched<Values[K][number]>[] : boolean : Values[K] extends object ? FormikTouched<Values[K]> : boolean;
};
declare interface FormikState<Values> {
  values: Values;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isSubmitting: boolean;
  isValidating: boolean;
  status?: any;
  submitCount: number;
}
declare interface FormikComputedProps<Values> {
  readonly dirty: boolean;
  readonly isValid: boolean;
  readonly initialValues: Values;
  readonly initialErrors: FormikErrors<Values>;
  readonly initialTouched: FormikTouched<Values>;
  readonly initialStatus?: any;
}
declare interface FormikHelpers<Values> {
  setStatus(status?: any): void;
  setErrors(errors: FormikErrors<Values>): void;
  setSubmitting(isSubmitting: boolean): void;
  setTouched(touched: FormikTouched<Values>): void;
  setValues(values: Values): void;
  setFieldValue(field: keyof Values & string, value: any, shouldValidate?: boolean): void;
  setFieldError(field: keyof Values & string, message: string): void;
  setFieldTouched(field: keyof Values & string, isTouched?: boolean, shouldValidate?: boolean): void;
  validateForm(values?: any): Promise<FormikErrors<Values>>;
  validateField(field: string): void;
  resetForm(nextState?: Partial<FormikState<Values>>): void;
  setFormikState(f: FormikState<Values> | ((prevState: FormikState<Values>) => FormikState<Values>), cb?: () => void): void;
}
declare interface FormikHandlers {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  handleReset: (e?: React.SyntheticEvent<any>) => void;
  handleBlur(e: React.FocusEvent<any>): void;
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? ((e: any) => void) : void;
  handleChange(e: React.ChangeEvent<any>): void;
  handleChange<T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : ((e: string | React.ChangeEvent<any>) => void);
  getFieldProps<Value = any>(props: any): [FieldInputProps<Value>, FieldMetaProps<Value>];
}
declare interface FormikSharedConfig<Props = {}> {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  isInitialValid?: boolean | ((props: Props) => boolean);
  enableReinitialize?: boolean;
}
declare interface FormikConfig<Values> extends FormikSharedConfig {
  component?: React.ComponentType<FormikProps<Values>> | React.ReactNode;
  render?: (props: FormikProps<Values>) => React.ReactNode;
  children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
  initialValues: Values;
  initialStatus?: any;
  initialErrors?: FormikErrors<Values>;
  initialTouched?: FormikTouched<Values>;
  onReset?: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
  validationSchema?: any | (() => any);
  validate?: (values: Values) => void | object | Promise<FormikErrors<Values>>;
}
declare type FormikProps<Values> = FormikSharedConfig & FormikState<Values> & FormikHelpers<Values> & FormikHandlers & FormikComputedProps<Values> & FormikRegistration & {
  submitForm: () => Promise<void>;
};
declare interface FormikRegistration {
  registerField(name: string, fns: {
      validate?: FieldValidator;
  }): void;
  unregisterField(name: string): void;
}
declare type FormikContext<Values> = FormikProps<Values> & Pick<FormikConfig<Values>, 'validate' | 'validationSchema'>;
declare interface SharedRenderProps<T> {
  component?: string | React.ComponentType<T | void>;
  render?: (props: T) => React.ReactNode;
  children?: (props: T) => React.ReactNode;
}
declare type GenericFieldHTMLAttributes = JSX.IntrinsicElements['input'] | JSX.IntrinsicElements['select'] | JSX.IntrinsicElements['textarea'];
declare interface FieldMetaProps<Value> {
  value: Value;
  error?: string;
  touched: boolean;
  initialValue?: Value;
  initialTouched: boolean;
  initialError?: string;
}
declare interface FieldInputProps<Value> {
  value: Value;
  name: string;
  multiple?: boolean;
  checked?: boolean;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
}
declare type FieldValidator = (value: any) => string | void | Promise<string | void>;

declare function useFormik<Values extends FormikValues = FormikValues>({ validateOnChange, validateOnBlur, isInitialValid, enableReinitialize, onSubmit, ...rest }: FormikConfig<Values>): {
  initialValues: Values;
  initialErrors: FormikErrors<unknown>;
  initialTouched: FormikTouched<unknown>;
  initialStatus: any;
  handleBlur: (eventOrString: any) => void | ((e: any) => void);
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  handleReset: (e: any) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  resetForm: (nextState?: Partial<FormikState<Values>> | undefined) => void;
  setErrors: (errors: FormikErrors<Values>) => void;
  setFormikState: (stateOrCb: FormikState<Values> | ((state: FormikState<Values>) => FormikState<Values>)) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any;
  setFieldError: (field: string, value: string | undefined) => void;
  setStatus: (status: any) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setTouched: (touched: FormikTouched<Values>) => any;
  setValues: (values: Values) => any;
  submitForm: () => Promise<void>;
  validateForm: (values?: Values) => Promise<FormikErrors<Values>>;
  validateField: (name: string) => Promise<void> | Promise<string | undefined>;
  isValid: boolean;
  dirty: boolean;
  unregisterField: (name: string) => void;
  registerField: (name: string, { validate }: any) => void;
  getFieldProps: ({ name, type, value: valueProp, as: is, multiple, }: any) => [FieldInputProps<any>, FieldMetaProps<any>];
  validateOnBlur: boolean;
  validateOnChange: boolean;
  values: Values;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isSubmitting: boolean;
  isValidating: boolean;
  status?: any;
  submitCount: number;
};
declare function Formik<Values extends FormikValues = FormikValues, ExtraProps = {}>(props: FormikConfig<Values> & ExtraProps): JSX.Element;
declare function yupToFormErrors<Values>(yupError: any): FormikErrors<Values>;
declare function validateYupSchema<T extends FormikValues>(values: T, schema: any, sync?: boolean, context?: any): Promise<Partial<T>>;

