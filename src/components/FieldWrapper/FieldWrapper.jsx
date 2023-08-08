import clsx from "clsx";
import { baseClassNames } from "../../helpers/constants";

const FieldWrapper = ({ label, name, children, className, ...rest }) => (
  <div className={className} {...rest}>
    {label && label.length && (
      <label
        htmlFor={name}
        className={clsx("txt1 block text-sm font-medium leading-6")}
      >
        {label}
      </label>
    )}
    <div className="mt-2">
      {children}
    </div>
  </div>
)

export default FieldWrapper;
